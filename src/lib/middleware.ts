import { NextApiRequest, NextApiResponse } from 'next';
import rateLimit from 'express-rate-limit';

export type NextApiResponseWithRateLimit = NextApiResponse & {
    status: (statusCode: number) => NextApiResponseWithRateLimit;
};

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests, please try again later.' },
    legacyHeaders: false,
    standardHeaders: true,
});

export function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponseWithRateLimit,
    fn: Function
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export async function applyRateLimit(
    req: NextApiRequest,
    res: NextApiResponseWithRateLimit
) {
    try {
        await runMiddleware(req, res, rateLimiter);
    } catch (error) {
        console.error('Rate limit error:', error);
        throw error;
    }
} 