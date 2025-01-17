import fastify from "fastify";
import cors from "@fastify/cors";
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import { userRoutes } from "./view/user-routes";
import dotenv from 'dotenv';
import { postsRoutes } from "./view/posts-routes";
import fastifyCookie from "@fastify/cookie";

const app = fastify()

app.register(fastifyCookie, {
    secret: process.env.SECRET_COOKIE || 'supersecret',
    parseOptions: {}
    });

dotenv.config();

app.register(cors, {
    origin: '*',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(userRoutes)
app.register(postsRoutes)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
    console.log("Servidor rodando!")
})