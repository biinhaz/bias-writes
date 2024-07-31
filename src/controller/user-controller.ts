import { FastifyRequest } from "fastify";
import { z } from "zod";
import { createUser } from "../model/user";
import { hash } from "bcrypt";
import { Hash } from "crypto";

const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(5),
});

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