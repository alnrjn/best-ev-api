import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || "fallback_secret";

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.code(401).send({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    (request as any).user = decoded;
  } catch (err) {
    return reply.code(401).send({ message: "Unauthorized" });
  }
};
