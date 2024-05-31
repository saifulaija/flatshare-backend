import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

import { Request, Response } from "express";
import { requestServices } from "./request.service";

const createRequest = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user
    const result = await requestServices.createRequestFlatIntoDB({ payload: req.body, user });
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Request submitted successfully",
      data: result,
    });
  }
);



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

export const bookingControllers = {
  createRequest,
  // getAllBookings,
  // updateBooking,
};
