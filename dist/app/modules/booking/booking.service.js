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
exports.bookingServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createBookingIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const flatData = yield prisma_1.default.flat.findUniqueOrThrow({
        where: {
            id: payload.flatId,
        },
    });
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const createBooking = yield tx.booking.create({
            data: {
                flatId: payload.flatId,
                userId: user.userId,
            },
        });
        const createRequestFlat = yield tx.request_Flat.create({
            data: {
                userName: payload.userName,
                email: payload.email,
                profession: payload.profession,
                contactNumber: payload.contactNumber,
                address: payload.address,
                additionalInformation: payload.additionalInformation,
                termsAndCondition: payload.termsAndCondition,
                flattId: payload.flatId,
            },
        });
        return createBooking;
    }));
    return result;
});
const myBooking = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findMany({
        where: {
            userId: user.userId,
        },
        include: {
            flat: {
                include: {
                    image: true
                }
            }
        },
    });
    return result;
});
const updateBookingIntoDB = (bookingId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ bookingId });
    const result = yield prisma_1.default.booking.update({
        where: {
            id: bookingId,
        },
        data: payload,
    });
    return result;
});
exports.bookingServices = {
    createBookingIntoDB,
    myBooking,
    updateBookingIntoDB,
};
