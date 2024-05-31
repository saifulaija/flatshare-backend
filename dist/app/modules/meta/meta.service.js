"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const fetchDashboardMetadata = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user, 'usr---------');
    let metadata;
    switch (user.role) {
        case client_1.UserRole.ADMIN:
            metadata = yield getAdminDashboardMetadata();
            break;
        case client_1.UserRole.USER:
            metadata = yield getUserDashboardMetadata(user);
            break;
        default:
            throw new Error("Invalid user role");
    }
    return metadata;
});
const getAdminDashboardMetadata = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalUsers = yield prisma_1.default.user.count();
    const totalActiveUsers = yield prisma_1.default.user.count({
        where: {
            status: client_1.User_Sattus.ACTIVE
        }
    });
    const totalDeActiveUsers = yield prisma_1.default.user.count({
        where: {
            status: client_1.User_Sattus.DEACTIVE
        }
    });
    const totalFlats = yield prisma_1.default.flat.count();
    const totalRequestFlats = yield prisma_1.default.booking.count();
    // const barChartData = await getBarChartData();
    //   const pieChartData = await getPieChartData();
    return { totalUsers, totalActiveUsers, totalDeActiveUsers, totalFlats, totalRequestFlats };
});
const getUserDashboardMetadata = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const sharedFlatCount = yield prisma_1.default.flat.count({
        where: {
            userId: user === null || user === void 0 ? void 0 : user.userId,
        },
    });
    const sharedFlatAvailableCount = yield prisma_1.default.flat.count({
        where: {
            userId: user === null || user === void 0 ? void 0 : user.userId,
            availability: true,
        },
    });
    const sharedFlatNoAvailableCount = yield prisma_1.default.flat.count({
        where: {
            userId: user === null || user === void 0 ? void 0 : user.userId,
            availability: false,
        },
    });
    const bookedFlatCount = yield prisma_1.default.booking.count({
        where: {
            userId: user === null || user === void 0 ? void 0 : user.userId,
        },
    });
    const RequestFlatCount = yield prisma_1.default.flat.findMany({
        where: {
            userId: user === null || user === void 0 ? void 0 : user.userId,
        },
        include: {
            Request_Flat: true
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
});
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
exports.metaServices = {
    fetchDashboardMetadata,
};
