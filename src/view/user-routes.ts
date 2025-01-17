import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createUserHandler, getUsersHandler, loginUserHandler } from "../controller/user-controller";

export async function userRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/users', createUserHandler);
    app.withTypeProvider<ZodTypeProvider>().get('/users', getUsersHandler);
    app.withTypeProvider<ZodTypeProvider>().post('/login', loginUserHandler);
}
