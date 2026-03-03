import prisma from "../../plugins/prisma";

export const findCars = async (
  search?: string,
  category?: string,
  page: number = 1,
  limit: number = 10,
) => {
  const skip = (page - 1) * limit;
  const whereClause: any = { isActive: true, isDeleted: false };

  if (search) {
    whereClause.OR = [
      { name: { contains: search } },
      { description: { contains: search } },
    ];
  }

  if (category) {
    whereClause.category = category;
  }

  const [cars, totalCount] = await Promise.all([
    prisma.car.findMany({
      where: whereClause,
      include: { variants: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.car.count({ where: whereClause }),
  ]);

  return {
    data: cars,
    pagination: {
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
    },
  };
};

export const findCarBySlug = async (slug: string) => {
  return prisma.car.findUnique({
    where: { slug, isActive: true, isDeleted: false },
    include: { variants: true },
  });
};

export const findAllCarsAdmin = async () => {
  return prisma.car.findMany({
    where: { isDeleted: false },
    orderBy: { createdAt: "desc" },
    include: { variants: true },
  });
};

export const findCarByIdAdmin = async (id: number) => {
  return prisma.car.findUnique({
    where: { id, isDeleted: false },
    include: { variants: true },
  });
};

export const createCar = async (data: any) => {
  return prisma.car.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description || "",
      basePrice: parseFloat(data.basePrice) || 0,
      category: data.category || "",
      range: parseInt(data.range) || 0,
      topSpeed: parseInt(data.topSpeed) || 0,
      acceleration: parseFloat(data.acceleration) || 0,
      variants: { create: data.variants || [] },
    },
  });
};

export const updateCar = async (id: number, data: any) => {
  return prisma.car.update({
    where: { id },
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      basePrice: parseFloat(data.basePrice) || 0,
      category: data.category || "Sedan",
      range: parseInt(data.range) || 0,
      topSpeed: parseInt(data.topSpeed) || 0,
      acceleration: parseFloat(data.acceleration) || 0,
      variants: {
        deleteMany: {},
        create: data.variants || [],
      },
    },
  });
};

export const deleteCar = async (id: number) => {
  return prisma.car.update({ where: { id }, data: { isDeleted: true } });
};

export const checkCarSlugExists = async (slug: string) => {
  const car = await prisma.car.findUnique({ where: { slug } });
  return !!car;
};
