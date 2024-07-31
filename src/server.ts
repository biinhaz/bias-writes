import fastify from "fastify";
import cors from "@fastify/cors";
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import { userRoutes } from "./view/user-routes";
import dotenv from 'dotenv';

const app = fastify()

dotenv.config();

app.register(cors, {
    origin: '*',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(userRoutes)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
    console.log("Servidor rodando!")
})