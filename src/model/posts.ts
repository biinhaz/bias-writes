import { prisma } from "../lib/prisma";

export interface Posts {
    id?: number;
    title: string;
    description: string;
    user_id: string;
}

export async function createPost(data: Omit<Posts, 'id'>) {
    const posts = await prisma.post.create({
        data
    });

    return posts;

}