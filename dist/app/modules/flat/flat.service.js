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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const flat_constant_1 = require("./flat.constant");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createFlatIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { image } = payload, payloadDta = __rest(payload, ["image"]);
    console.log(payloadDta);
    const userData = yield prisma_1.default.user.findUnique({
        where: {
            email: user.email,
        },
    });
    console.log(userData);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "user not found");
    }
    const flatData = Object.assign(Object.assign({}, payloadDta), { userId: user.userId });
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const createFlat = yield tx.flat.create({
            data: flatData,
        });
        const imageUpload = yield tx.image.create({
            data: {
                url: image,
                flatId: createFlat.id,
            },
        });
        return createFlat;
    }));
    return result;
});
const getAllFlatsFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    console.log(searchTerm);
    const andConditions = [];
    //for search
    if (params.searchTerm) {
        andConditions.push({
            OR: flat_constant_1.flatSearchableFields.map((field) => ({
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
    const whereConditions = { AND: andConditions };
    const result = yield prisma_1.default.flat.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
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
    const total = yield prisma_1.default.flat.count({
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
});
const getAllMyFlatsFromDB = (params, options, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    console.log(searchTerm);
    const andConditions = [];
    //for search
    if (params.searchTerm) {
        andConditions.push({
            OR: flat_constant_1.flatSearchableFields.map((field) => ({
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
    const whereConditions = { AND: andConditions };
    const result = yield prisma_1.default.flat.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
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
    const total = yield prisma_1.default.flat.count({
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
});
const updateFlatDataIntoDB = (flatId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.flat.findUniqueOrThrow({
        where: {
            id: flatId,
            isDeleted: false,
        },
    });
    const result = yield prisma_1.default.flat.update({
        where: {
            id: flatId,
        },
        data: payload,
    });
    return result;
});
const getSingleFlat = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const flatData = yield prisma_1.default.flat.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            image: true,
            user: {
                include: {
                    userProfile: true,
                },
            },
        },
    });
    return flatData;
});
const softDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExistFlat = prisma_1.default.flat.findUnique({
        where: {
            id,
        },
    });
    if (!isExistFlat) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This flat not exist");
    }
    const result = yield prisma_1.default.flat.update({
        where: {
            id,
        },
        data: {
            isDeleted: true,
        },
    });
    return result;
});
exports.flatServices = {
    createFlatIntoDB,
    getAllFlatsFromDB,
    updateFlatDataIntoDB,
    getSingleFlat,
    getAllMyFlatsFromDB,
    softDelete,
};
