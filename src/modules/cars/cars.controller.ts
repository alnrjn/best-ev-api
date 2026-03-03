import { FastifyRequest, FastifyReply } from "fastify";
import * as carsService from "./cars.service";

export const getCars = async (request: FastifyRequest, reply: FastifyReply) => {
  const { search, category, page = "1", limit = "10" } = request.query as any;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  try {
    const result = await carsService.findCars(
      search,
      category,
      pageNum,
      limitNum,
    );
    return result;
  } catch (err) {
    request.log.error(err);
    return reply.status(500).send({ message: "Internal server error" });
  }
};

export const getCarBySlug = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { slug } = request.params as any;
  try {
    const car = await carsService.findCarBySlug(slug);
    if (!car) return reply.status(404).send({ message: "Car not found" });
    return car;
  } catch (err) {
    request.log.error(err);
    return reply.status(500).send({ message: "Internal server error" });
  }
};

export const getAdminCars = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const cars = await carsService.findAllCarsAdmin();
    return cars;
  } catch (error) {
    return reply.status(500).send({ message: "Internal server error" });
  }
};

export const getAdminCarById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as any;
  try {
    const car = await carsService.findCarByIdAdmin(parseInt(id, 10));
    if (!car) return reply.status(404).send({ message: "Car not found" });
    return car;
  } catch (error) {
    return reply.status(500).send({ message: "Internal server error" });
  }
};

export const createAdminCar = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const json = request.body as any;
  if (!json.name || !json.slug || !json.basePrice) {
    return reply.status(400).send({ message: "Missing required fields" });
  }

  const exist = await carsService.checkCarSlugExists(json.slug);
  if (exist) {
    return reply.status(409).send({ message: "Slug must be unique" });
  }

  try {
    const car = await carsService.createCar(json);
    return reply.status(201).send(car);
  } catch (error: any) {
    return reply
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
};

export const updateAdminCar = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as any;
  const json = request.body as any;

  try {
    const car = await carsService.updateCar(parseInt(id, 10), json);
    return car;
  } catch (error) {
    return reply.status(500).send({ message: "Internal server error" });
  }
};

export const deleteAdminCar = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { id } = request.params as any;
  try {
    await carsService.deleteCar(parseInt(id, 10));
    return { message: "Deleted successfully" };
  } catch (error) {
    return reply.status(500).send({ message: "Internal server error" });
  }
};
