import {
  Prisma,
  Status,
  User,
  UserProfile,
  UserRole,
  User_Sattus,
} from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";
import { jwtDecode } from "jwt-decode";

import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { userSearchableFields } from "./user.constant";

const createUserIntoDB = async (payload: User & UserProfile) => {
  const hashPassword: string = await bcrypt.hash(payload.password, 12);

  const isExistUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isExistUser) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This email is already registered"
    );
  }

  const userData = {
    userName: payload.userName,
    email: payload.email,
    password: hashPassword,
    role: UserRole.USER,
    profilePhoto: payload.profilePhoto,
  };

  const result = await prisma.$transaction(async (tx) => {
    const userCreate = await tx.user.create({
      data: userData,
    });

    const userProfileCreate = tx.userProfile.create({
      data: {
        userName: payload.userName,
        email: payload.email,
        role: UserRole.USER,
        userId: userCreate.id,
        contactNumber: payload.contactNumber,
        profilePhoto: payload.profilePhoto,
      },
    });

    return userProfileCreate;
  });

  return result;
};

const getUserWithProfileFromDB = async (user: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.userId,
      status: User_Sattus.ACTIVE,
      isDeleted: false,
    },
  });

  if (userData.role === UserRole.USER || userData.role === UserRole.ADMIN) {
    const result = await prisma.userProfile.findUniqueOrThrow({
      where: {
        userId: user?.userId,
      },
    });
    return result;
  }
};

const updateMyProfile = async (authUser: any, payload: any) => {

  console.log(payload)
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: authUser.email,
      status: User_Sattus.ACTIVE,
    },
  });


  if(payload.profilePhoto){
    await prisma.user.update({
      where:{
        id:userData.id
      },
      data:{
        profilePhoto:payload.profilePhoto
      }
    })
  }
  if(payload.userName){
    await prisma.user.update({
      where:{
        id:userData.id
      },
      data:{
        userName:payload.userName
      }
    })
  }
  if(payload.email){
    await prisma.user.update({
      where:{
        id:userData.id
      },
      data:{
        email:payload.email
      }
    })
  }

  console.log(userData, 'payload', payload);

  let profileData;
if(userData.role === UserRole.ADMIN || userData.role === UserRole.USER){
  profileData = await prisma.userProfile.update({
    where:{
    userId:authUser.userId
    },
    data:payload
  })
}

};
// const updateMyProfile = async (authUser: any, payload: any) => {
//   const userData = await prisma.user.findUniqueOrThrow({
//     where: {
//       email: authUser.email,
//       status: User_Sattus.ACTIVE,
//     },
//   });

//   console.log(userData, payload);

//   let profileData;
//   if (userData?.role === UserRole.ADMIN || userData?.role === UserRole.USER) {
//     profileData = await prisma.$transaction(async (tx) => {
//       const updateProfile = await tx.userProfile.update({
//         where: {
//           userId: authUser.userId,
//         },
//         data: payload,
//       });

//       const userDataUpdate = await tx.user.update({
//         where: {
//           id: authUser.userId,
//         },
//         data: {
//           userName: payload.userName,
//           email: payload.email,
//           profilePhoto: payload.profilePhoto,
//         },
//       });

//       return { updateProfile, userDataUpdate };
//     });
//   } else {
//     throw new Error("Invalid user role");
//   }

//   return {
//     ...userData,
//     ...profileData.updateProfile,
//     ...profileData.userDataUpdate,
//   };
// };



const getAllUsers = async (params: any, options: any) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  console.log(searchTerm);

  const andConditions: Prisma.UserWhereInput[] = [];

  //for search
  if (params.searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
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

  const whereConditions: Prisma.UserWhereInput = { AND: andConditions };
  const result = await prisma.user.findMany({
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
  });

  const total = await prisma.user.count({
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



const updateUser = async (userId: string, payload: Partial<User>) => {
  // Find the user
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      id: userId,
    },
  });

  // Check if payload contains a role
  if (payload.role) {
    // If payload contains a role, update the user profile

    await prisma.$transaction(async (tx) => {
      await tx.userProfile.update({
        where: {
          userId: userId,
        },
        data: {
          role: payload.role,
        },
      });

      await tx.user.update({
        where: {
          id: userId,
        },
        data: {
          role: payload.role,
        },
      });
    });
  } else {
    // If payload does not contain a role, update the user directly
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: payload,
    });
  }

  // Find and return the updated user object
  const updatedUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return updatedUser;

  console.log(updateUser);
};

export default updateMyProfile;
export const userServices = {
  createUserIntoDB,
  getUserWithProfileFromDB,
  updateMyProfile,
  getAllUsers,
  updateUser,
};
