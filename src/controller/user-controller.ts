import { FastifyRequest } from "fastify";
import { z } from "zod";
import { createUser } from "../model/user";

const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(5),
});

export async function createUserHandler(request: FastifyRequest) {
    const { name, email, password } = createUserSchema.parse(request.body);

    const user = await createUser({ name, email, password });

    return ({ userId: user.id });
}