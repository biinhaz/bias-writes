import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { createUser, loginUser } from "../model/user";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";

const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(5),
});

const loginUserSchema = z.object({
    email: z.string(),
    password: z.string().min(5)
})

export async function createUserHandler(request: FastifyRequest) {
    const { name, email, password } = createUserSchema.parse(request.body);

    const passwordHash = await hash(password, 8)

    const user = await createUser({ name, email, password: passwordHash });

    return ({ 
        userId: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt
    });
}

export async function loginUserHandler(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = loginUserSchema.parse(request.body)

    const { user, passwordMatches } = await loginUser(email, password)

    if (!user) {
        reply.status(401).send({ error: "User not found." })
        return
    }

    if (!passwordMatches) {
        reply.status(401).send({ error: "Password incorrect." })
        return
    }

    const secretKey = process.env.JWT_SECRET_KEY
    if (!secretKey) {
        reply.status(500).send({ error: "Server configuration error." });
        return;
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" })

    reply.setCookie('auth_token', token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    })

    return ({
        userId: user.id,
        email: user.email,
        token
    })
}