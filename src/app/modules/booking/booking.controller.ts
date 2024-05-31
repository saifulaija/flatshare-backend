import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { bookingServices } from "./booking.service";
import { Request, Response } from "express";

const createBooking = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await bookingServices.createBookingIntoDB(req.body, user);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Booking requests submitted successfully",
      data: result,
    });
  }
);

const myBooking = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await bookingServices.myBooking(user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "my booking retrieved successfully",
      data: result,
    });
  }
);

const updateBooking = catchAsync(async (req, res) => {
  const { bookingId } = req.params;
  const result = await bookingServices.updateBookingIntoDB(bookingId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking requests retrieved successfully",
    data: result,
  });
});

export const bookingControllers = {
  createBooking,
  myBooking,
  updateBooking,
};
