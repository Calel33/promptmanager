import { NextApiRequest, NextApiResponse } from 'next';
import { verifyAuth } from '../../lib/supabaseAdmin';
import { applyRateLimit } from '../../lib/middleware';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Apply rate limiting
    const rateLimitPassed = await applyRateLimit(req, res);
    if (!rateLimitPassed) {
        return; // Response already sent by applyRateLimit
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get the session token from the request headers
        const token = req.headers.authorization?.split('Bearer ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // Verify the token using our helper function
        const { user, error } = await verifyAuth(token);
        
        if (error || !user) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        // Return the validated user information
        return res.status(200).json({ 
            valid: true, 
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error validating request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
} 