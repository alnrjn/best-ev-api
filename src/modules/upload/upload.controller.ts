import { FastifyRequest, FastifyReply } from "fastify";
import path from "path";
import fs from "fs/promises";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

export const handleUpload = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const parts = request.files();
  const urls: string[] = [];

  try {
    for await (const part of parts) {
      if (part.file) {
        const buffer = await part.toBuffer();
        if (buffer.length > 10 * 1024 * 1024) {
          throw new Error(`File ${part.filename} exceeds 10MB limit`);
        }

        const timestamp = Date.now();
        const uniqueString = Math.random().toString(36).substring(2, 7);
        const safeFilename = part.filename.replace(/[^a-zA-Z0-9.-]/g, "_");
        const filename = `${timestamp}_${uniqueString}_${safeFilename}`;
        const filepath = path.join(UPLOADS_DIR, filename);

        await fs.writeFile(filepath, buffer);
        urls.push(`/api/v1/uploads/${filename}`);
      }
    }

    if (urls.length === 1) {
      return { url: urls[0] };
    }
    return { urls };
  } catch (error: any) {
    request.log.error(error);
    return reply.status(500).send({ error: error.message || "Upload failed" });
  }
};
