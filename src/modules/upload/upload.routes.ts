import { FastifyInstance } from "fastify";
import * as uploadController from "./upload.controller";

export default async function uploadRoutes(fastify: FastifyInstance) {
  fastify.post("/upload", uploadController.handleUpload);
}
