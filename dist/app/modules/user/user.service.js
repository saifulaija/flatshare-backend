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
exports.userServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_constant_1 = require("./user.constant");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const hashPassword = yield bcrypt_1.default.hash(payload.password, 12);
    const isExistUser = yield prisma_1.default.user.findUnique({
        where: {
            email: payload.email,
        },
    });
    if (isExistUser) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This email is already registered");
    }
    const userData = {
        userName: payload.userName,
        email: payload.email,
        password: hashPassword,
        role: client_1.UserRole.USER,
        profilePhoto: payload.profilePhoto,
    };
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const userCreate = yield tx.user.create({
            data: userData,
        });
        const userProfileCreate = tx.userProfile.create({
            data: {
                userName: payload.userName,
                email: payload.email,
                role: client_1.UserRole.USER,
                userId: userCreate.id,
                contactNumber: payload.contactNumber,
                profilePhoto: payload.profilePhoto,
            },
        });
        return userProfileCreate;
    }));
    return result;
});
const getUserWithProfileFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user.userId,
            status: client_1.User_Sattus.ACTIVE,
            isDeleted: false,
        },
    });
    if (userData.role === client_1.UserRole.USER || userData.role === client_1.UserRole.ADMIN) {
        const result = yield prisma_1.default.userProfile.findUniqueOrThrow({
            where: {
                userId: user === null || user === void 0 ? void 0 : user.userId,
            },
        });
        return result;
    }
});
const updateMyProfile = (authUser, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: authUser.email,
            status: client_1.User_Sattus.ACTIVE,
        },
    });
    console.log(userData, payload);
    let profileData;
    if ((userData === null || userData === void 0 ? void 0 : userData.role) === client_1.UserRole.ADMIN || (userData === null || userData === void 0 ? void 0 : userData.role) === client_1.UserRole.USER) {
        profileData = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const updateProfile = yield tx.userProfile.update({
                where: {
                    userId: authUser.userId,
                },
                data: payload,
            });
            const userDataUpdate = yield tx.user.update({
                where: {
                    id: authUser.userId,
                },
                data: {
                    userName: payload.userName,
                    email: payload.email,
                    profilePhoto: payload.profilePhoto,
                },
            });
            return { updateProfile, userDataUpdate };
        }));
    }
    else {
        throw new Error("Invalid user role");
    }
    return Object.assign(Object.assign(Object.assign({}, userData), profileData.updateProfile), profileData.userDataUpdate);
});
const getAllUsers = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    console.log(searchTerm);
    const andConditions = [];
    //for search
    if (params.searchTerm) {
        andConditions.push({
            OR: user_constant_1.userSearchableFields.map((field) => ({
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
    const result = yield prisma_1.default.user.findMany({
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
    });
    const total = yield prisma_1.default.user.count({
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
const updateUser = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the user
    const userData = yield prisma_1.default.user.findFirstOrThrow({
        where: {
            id: userId,
        },
    });
    // Check if payload contains a role
    if (payload.role) {
        // If payload contains a role, update the user profile
        yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            yield tx.userProfile.update({
                where: {
                    userId: userId,
                },
                data: {
                    role: payload.role,
                },
            });
            yield tx.user.update({
                where: {
                    id: userId,
                },
                data: {
                    role: payload.role,
                },
            });
        }));
    }
    else {
        // If payload does not contain a role, update the user directly
        yield prisma_1.default.user.update({
            where: {
                id: userId,
            },
            data: payload,
        });
    }
    // Find and return the updated user object
    const updatedUser = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    return updatedUser;
    console.log(updateUser);
});
exports.default = updateMyProfile;
exports.userServices = {
    createUserIntoDB,
    getUserWithProfileFromDB,
    updateMyProfile,
    getAllUsers,
    updateUser,
};
