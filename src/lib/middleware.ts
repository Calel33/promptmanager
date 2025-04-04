import { NextApiRequest, NextApiResponse } from 'next';

interface RateLimitStore {
    [key: string]: {
        count: number;
        resetTime: number;
    };
}

// In-memory store for rate limiting
const rateLimit: RateLimitStore = {};

// Rate limit configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes in milliseconds
const MAX_REQUESTS = 100; // Maximum requests per window

export async function checkRateLimit(req: NextApiRequest): Promise<{ blocked: boolean; remaining: number }> {
    // Get IP address from request
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const key = typeof ip === 'string' ? ip : ip[0];
    const now = Date.now();

    // Clean up expired entries
    if (rateLimit[key] && now > rateLimit[key].resetTime) {
        delete rateLimit[key];
    }

    // Initialize or get rate limit info for this IP
    if (!rateLimit[key]) {
        rateLimit[key] = {
            count: 0,
            resetTime: now + RATE_LIMIT_WINDOW,
        };
    }

    // Increment request count
    rateLimit[key].count++;

    // Check if rate limit is exceeded
    const isBlocked = rateLimit[key].count > MAX_REQUESTS;
    const remaining = Math.max(0, MAX_REQUESTS - rateLimit[key].count);

    return {
        blocked: isBlocked,
        remaining,
    };
}

// Helper function to apply rate limiting to an API route
export async function applyRateLimit(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<boolean> {
    const { blocked, remaining } = await checkRateLimit(req);

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', MAX_REQUESTS.toString());
    res.setHeader('X-RateLimit-Remaining', remaining.toString());
    res.setHeader('X-RateLimit-Reset', Math.ceil(RATE_LIMIT_WINDOW / 1000).toString());

    if (blocked) {
        res.status(429).json({
            error: 'Too many requests, please try again later',
            retryAfter: Math.ceil(RATE_LIMIT_WINDOW / 1000),
        });
        return false;
    }

    return true;
} 