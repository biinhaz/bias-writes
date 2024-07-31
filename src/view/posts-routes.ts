import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { createPostsHandler } from "../controller/posts-controller";
import { verifyJWT } from "../auth/verifyJWT";

export async function postsRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/posts', { preHandler: verifyJWT }, createPostsHandler);
}