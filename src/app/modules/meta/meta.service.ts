import httpStatus from "http-status";

import { UserRole, User_Sattus } from "@prisma/client";

import prisma from "../../../shared/prisma";

const fetchDashboardMetadata = async (user: any) => {
  console.log(user,'usr---------')
  let metadata;
  switch (user.role) {
    case UserRole.ADMIN:
        metadata = await getAdminDashboardMetadata();
      break;
    case UserRole.USER:
      metadata = await getUserDashboardMetadata(user);
      break;

    default:
      throw new Error("Invalid user role");
  }

  return metadata;
};

const getAdminDashboardMetadata = async () => {

  const totalUsers=await prisma.user.count();
  const totalActiveUsers=await prisma.user.count({
    where:{
      status:User_Sattus.ACTIVE
    }
  })
  const totalDeActiveUsers=await prisma.user.count({
    where:{
      status:User_Sattus.DEACTIVE
    }
  })

  const totalFlats=await prisma.flat.count();
  const totalRequestFlats=await prisma.booking.count();


  // const barChartData = await getBarChartData();
//   const pieChartData = await getPieChartData();




  return {totalUsers,totalActiveUsers,totalDeActiveUsers,totalFlats,totalRequestFlats };
};
const getUserDashboardMetadata = async (user: any) => {
  const sharedFlatCount = await prisma.flat.count({
    where: {
      userId: user?.userId,
    },
  });
  const sharedFlatAvailableCount = await prisma.flat.count({
    where: {
      userId: user?.userId,
      availability: true,
    },
  });
  const sharedFlatNoAvailableCount = await prisma.flat.count({
    where: {
      userId: user?.userId,
      availability: false,
    },
  });

  const bookedFlatCount = await prisma.booking.count({
    where: {
      userId: user?.userId,
    },
  });
  const RequestFlatCount = await prisma.flat.findMany({
    where: {
      userId: user?.userId,
    },
    include:{
        Request_Flat:true
    }
  });

  // const barChartData = await getBarChartData();
  //   const pieChartData = await getPieChartData();

  return {
    // barChartData,
    sharedFlatAvailableCount,
    sharedFlatCount,
    sharedFlatNoAvailableCount,
    bookedFlatCount,
    RequestFlatCount
  };
};

// const getBarChartData = async () => {
//   const appointmentCountByMonth: { month: Date; count: bigint }[] =
//     await prisma.$queryRaw`
//         SELECT DATE_TRUNC('day', "createdAt") AS day,
//                COUNT(*) AS count
//         FROM "flats"
//         GROUP BY day
//         ORDER BY day ASC
//     `;

//   const formattedMetadata = appointmentCountByMonth.map(({ day, count }:{dat:Date,cout:str}) => ({
//     day,
//     count: Number(count), // Convert BigInt to integer
//   }));
//   return formattedMetadata;
// };

// const getPieChartData = async () => {
//   const appointmentStatusDistribution = await prisma.blog.groupBy({
//     by: ["id"],
//     _count: { id: true },
//   });

//   const formattedData = appointmentStatusDistribution.map(
//     ({ id, _count }) => ({
//       id,
//       count: Number(_count.id), // Convert BigInt to integer
//     })
//   );

//   return formattedData;
// };

export const metaServices = {
  fetchDashboardMetadata,
};
