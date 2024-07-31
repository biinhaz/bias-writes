import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { createPost } from "../model/posts";

const createPostsSchema = z.object({
    title: z.string(),
    description: z.string(),
})

export async function createPostsHandler(request: FastifyRequest, reply: FastifyReply) {
    const { title, description } = createPostsSchema.parse(request.body)

    const user_id = (request as any).userId

    if (!user_id) {
        reply.status(401).send({ error: 'User not authenticated.' })
        return
    }

    const posts = await createPost({ title, description, user_id })

    return ({ postId: posts.id })

}