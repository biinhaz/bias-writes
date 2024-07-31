import { FastifyRequest } from "fastify";
import z from "zod";
import { createPost } from "../model/posts";

const createPostsSchema = z.object({
    title: z.string(),
    description: z.string(),
    user_id: z.string()
})

export async function createPostsHandler(request: FastifyRequest) {
    const { title, description, user_id } = createPostsSchema.parse(request.body)

    const posts = await createPost({ title, description, user_id });

    return ({ postId: posts.id });

}