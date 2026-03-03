import { FastifyRequest, FastifyReply } from "fastify";
import * as authService from "./auth.service";

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = request.body as any;
  if (!email || !password) {
    return reply.status(400).send({ message: "Invalid credentials" });
  }

  const result = await authService.loginUser(email, password);
  if (!result) {
    return reply.status(401).send({ message: "Invalid credentials" });
  }

  return result;
};
