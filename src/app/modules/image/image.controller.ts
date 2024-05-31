import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { imageServices } from "./image.service";


const createImage = catchAsync(async (req, res) => {
  const result = await imageServices.createImage(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Image added successfully",
    data: result,
  });
});

export const imageControllers = {
  createImage,
};
