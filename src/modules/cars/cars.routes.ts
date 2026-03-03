import { FastifyInstance } from "fastify";
import * as carsController from "./cars.controller";
import { authenticate } from "../../middleware/auth";

export default async function carRoutes(fastify: FastifyInstance) {
  // Public
  fastify.get("/cars", carsController.getCars);
  fastify.get("/cars/:slug", carsController.getCarBySlug);

  // Admin
  fastify.get(
    "/admin/cars",
    { preHandler: [authenticate] },
    carsController.getAdminCars,
  );
  fastify.get(
    "/admin/cars/:id",
    { preHandler: [authenticate] },
    carsController.getAdminCarById,
  );
  fastify.post(
    "/admin/cars",
    { preHandler: [authenticate] },
    carsController.createAdminCar,
  );
  fastify.put(
    "/admin/cars/:id",
    { preHandler: [authenticate] },
    carsController.updateAdminCar,
  );
  fastify.delete(
    "/admin/cars/:id",
    { preHandler: [authenticate] },
    carsController.deleteAdminCar,
  );
}
