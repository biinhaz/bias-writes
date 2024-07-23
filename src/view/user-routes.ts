import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createUserHandler } from "../controller/user-controller";

export async function userRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/users', createUserHandler);
}
