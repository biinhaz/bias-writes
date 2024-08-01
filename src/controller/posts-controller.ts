import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { createPost, getPosts } from "../model/posts";

const postsSchema = z.object({
    title: z.string(),
    description: z.string(),
})

export async function createPostsHandler(request: FastifyRequest, reply: FastifyReply) {
    const { title, description } = postsSchema.parse(request.body)

    const user_id = (request as any).userId

    if (!user_id) {
        reply.status(401).send({ error: 'User not authenticated.' })
        return
    }

    const posts = await createPost({ title, description, user_id })

    return ({ postId: posts.id })

}

export async function getPostsHandler(request: FastifyRequest) {

    const posts = getPosts()

    return posts;
    
}