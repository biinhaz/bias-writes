import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createPostsHandler, getPostsHandler } from "../controller/posts-controller";
import { verifyJWT } from "../auth/verifyJWT";

export async function postsRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/posts', { preHandler: verifyJWT }, createPostsHandler);
    app.withTypeProvider<ZodTypeProvider>().get('/posts', { preHandler: verifyJWT }, getPostsHandler);
}