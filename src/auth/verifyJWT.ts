import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
    const token = request.headers['authorization'];
    if (!token) {
        reply.status(401).send({ error: 'No token provided.' });
        return;
    }

    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    try {
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET_KEY || '') as { userId: string };
        (request as any).userId = decoded.userId;

        reply.setCookie('auth_token', tokenWithoutBearer, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict', 
        });

    } catch (err) {
        reply.status(500).send({ error: 'Failed to authenticate token.' });
        return;
    }
}
