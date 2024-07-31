import { prisma } from "../lib/prisma";

export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
}

export async function createUser(data: Omit<User, 'id'>) {
    const user = await prisma.user.create({
        data
    });
    
    return user;
}