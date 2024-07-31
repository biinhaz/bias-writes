import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import jwt from 'jsonwebtoken';

export function verifyJWT(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
    const token = request.headers['authorization'];
    if (!token) {
        reply.status(401).send({ auth: false, message: 'No token provided.' });
        return;
    }
    
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET_KEY || '', (err, decoded) => {
        if (err) {
            reply.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            return;
        }
        
        (request as any).userId = (decoded as any).id;
        done();
    });
}
