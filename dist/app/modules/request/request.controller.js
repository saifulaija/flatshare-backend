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
exports.bookingControllers = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const request_service_1 = require("./request.service");
const createRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield request_service_1.requestServices.createRequestFlatIntoDB({ payload: req.body, user });
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Request submitted successfully",
        data: result,
    });
}));
// const getAllBookings = catchAsync(async (req, res) => {
//   const result = await bookingServices.getAllBookingsFromDB();
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Booking requests retrieved successfully",
//     data: result,
//   });
// });
// const updateBooking = catchAsync(async (req, res) => {
//   const { bookingId } = req.params;
//   const result = await bookingServices.updateBookingIntoDB(bookingId, req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Booking requests retrieved successfully",
//     data: result,
//   });
// });
exports.bookingControllers = {
    createRequest,
    // getAllBookings,
    // updateBooking,
};
