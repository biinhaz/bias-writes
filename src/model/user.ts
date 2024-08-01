import { compare } from "bcrypt";
import { prisma } from "../lib/prisma";

export interface User {
    id?: string;
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

export async function loginUser(email: string, password: string) { 
    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (!user) {
        return { user: null, passwordMatches: false };
    }

    const passwordMatches = await compare(password, user.password);

    return { user, passwordMatches };
}

export async function getUsers() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        }
    })

    return users
    
}