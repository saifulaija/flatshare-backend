import { Flat, Image, Prisma } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { flatSearchableFields } from "./flat.constant";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createFlatIntoDB = async (payload: Flat & { image: any }, user: any) => {
  const { image, ...payloadDta } = payload;

  console.log(payloadDta);

  const userData = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  console.log(userData);

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "user not found");
  }

  const flatData = { ...payloadDta, userId: user.userId };

  const result = await prisma.$transaction(async (tx) => {
    const createFlat = await tx.flat.create({
      data: flatData,
    });

    const imageUpload = await tx.image.create({
      data: {
        url: image,
        flatId: createFlat.id,
      },
    });
    return createFlat;
  });

  return result;
};

const getAllFlatsFromDB = async (params: any, options: any) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  console.log(searchTerm);

  const andConditions: Prisma.FlatWhereInput[] = [];

  //for search
  if (params.searchTerm) {
    andConditions.push({
      OR: flatSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  //for exact field match filter

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  // console.dir(andConditions, { depth: "infinity" });
  andConditions.push({ isDeleted: false });

  const whereConditions: Prisma.FlatWhereInput = { AND: andConditions };
  const result = await prisma.flat.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    include: {
      image: true,
    },
  });

  const total = await prisma.flat.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getAllMyFlatsFromDB = async (params: any, options: any, user: any) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  console.log(searchTerm);

  const andConditions: Prisma.FlatWhereInput[] = [];

  //for search
  if (params.searchTerm) {
    andConditions.push({
      OR: flatSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  //for exact field match filter

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  andConditions.push({ userId: user.userId, isDeleted: false });
  // console.dir(andConditions, { depth: "infinity" });

  const whereConditions: Prisma.FlatWhereInput = { AND: andConditions };
  const result = await prisma.flat.findMany({
    where: whereConditions,
    skip,
    take: limit,

    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "asc",
          },
    include: {
      image: true,
      Request_Flat: true,
    },
  });

  const total = await prisma.flat.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateFlatDataIntoDB = async (flatId: string, payload: Partial<Flat>) => {
  await prisma.flat.findUniqueOrThrow({
    where: {
      id: flatId,
      isDeleted: false,
    },
  });

  const result = await prisma.flat.update({
    where: {
      id: flatId,
    },
    data: payload,
  });
  return result;
};

const getSingleFlat = async (id: string) => {
  const flatData = await prisma.flat.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      image: true,
      Request_Flat: {
        include: {
          booking: true,
        },
      },

      user: {
        include: {
          userProfile: true,
        },
      },
    },
  });

  return flatData;
};

const softDelete = async (id: string) => {
  const isExistFlat = prisma.flat.findUnique({
    where: {
      id,
    },
  });

  if (!isExistFlat) {
    throw new AppError(httpStatus.BAD_REQUEST, "This flat not exist");
  }

  const result = await prisma.flat.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });

  return result;
};

export const flatServices = {
  createFlatIntoDB,
  getAllFlatsFromDB,
  updateFlatDataIntoDB,
  getSingleFlat,
  getAllMyFlatsFromDB,
  softDelete,
};
