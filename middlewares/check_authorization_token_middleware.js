import { getDependency } from '../dependency.js';

export default async function checkAuthorizationTokenMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }

        const token = authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : authHeader;

            console.log('AUTH HEADER:', authHeader);
            console.log('TOKEN', token);
        const sessionService = getDependency('sessionService');
        const session = await sessionService.getByToken(token);

        console.log('SESSION', session);

        if (!session) {
            return res.status(401).json({ error: 'Invalid authorization token' });
        }

        req.session = session;
        next();
    } catch (error) {
        next(error);
    }


}