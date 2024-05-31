import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userServices } from "../user/user.service";
import { flatServices } from "./flat.service";
import { flatFilterableFields } from "./flat.constant";


import pick from "../../../shared/pick";
import { Request, Response } from "express";


const createFlat = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;

    console.log(user, req.body);
    const result = await flatServices.createFlatIntoDB(req.body, user);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Flat added successfully",
      data: result,
    });
  }
);

const getAllFlats = catchAsync(async (req, res) => {
  const filters = pick(req.query, flatFilterableFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  console.log(options);
  const result = await flatServices.getAllFlatsFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Flats retrieved successfully",

    data: result,
  });
});
const getAllMyFlats = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;

    const filters = pick(req.query, flatFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    console.log(options);
    const result = await flatServices.getAllMyFlatsFromDB(
      filters,
      options,
      user
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My flats retrieved successfully",

      data: result,
    });
  }
);

const updateFlatData = catchAsync(async (req, res) => {
  const { flatId } = req.params;
 
  const result = await flatServices.updateFlatDataIntoDB(flatId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Flat information updated successfully",
    data: result,
  });
});

const getSingleFlat = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await flatServices.getSingleFlat(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single flat retried  successfully",
    data: result,
  });
});
const softDelete = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await flatServices.softDelete(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete flat  successfully",
    data: result,
  });
});

export const flatControllers = {
  createFlat,
  getAllFlats,
  updateFlatData,
  getSingleFlat,
  getAllMyFlats,
  softDelete
};
