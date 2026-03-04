import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import path from "path";
import fs from "fs/promises";

import carRoutes from "./modules/cars/cars.routes";
import authRoutes from "./modules/auth/auth.routes";
import uploadRoutes from "./modules/upload/upload.routes";

const buildApp = async () => {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: "*", // allow NextJS
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  await app.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  });

  const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

  await app.register(fastifyStatic, {
    root: UPLOADS_DIR,
    prefix: "/api/v1/uploads/",
  });

  const ensureUploadsDir = async () => {
    try {
      await fs.access(UPLOADS_DIR);
    } catch {
      await fs.mkdir(UPLOADS_DIR, { recursive: true });
    }
  };
  await ensureUploadsDir();

  app.register(
    async function (apiRouter) {
      apiRouter.register(carRoutes);
      apiRouter.register(authRoutes);
      apiRouter.register(uploadRoutes);
    },
    { prefix: "/api/v1" },
  );

  return app;
};

export default buildApp;
