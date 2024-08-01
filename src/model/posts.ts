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

export async function getPosts() {
    const posts = await prisma.post.findMany({
        select: {
            title: true,
            description: true,
            createdAt: true,
        }
    })

    return posts
    
}