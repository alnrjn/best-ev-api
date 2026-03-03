import { FastifyInstance } from "fastify";
import * as authController from "./auth.controller";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/login", authController.login);
}
