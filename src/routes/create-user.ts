import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function createUser(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/users', {
        schema: {
            body: z.object({
                name: z.string(),
                email: z.string(),
            })
        },
    }, async (request) => {
        const { name, email } = request.body

        const user = await prisma.user.create({
            data: {
                name,
                email,
            }
        })

        return { userId: user.id }
    }
)
}