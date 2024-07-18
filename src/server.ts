import fastify from "fastify";
import cors from "@fastify/cors";
import { createUser } from "./routes/create-user";
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";

const app = fastify()

app.register(cors, {
    origin: '*',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createUser)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
    console.log("Servidor rodando!")
})