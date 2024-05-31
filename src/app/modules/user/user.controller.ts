import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userServices } from "./user.service";
import { Request, Response } from "express";
import { userFilterableFields } from "./user.constant";
import pick from "../../../shared/pick";

const createUser= catchAsync(async (req, res) => {
    const result = await userServices.createUserIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'user regestered  succesfully',
      data: result,
    });
  });
const getUserWithProfile= catchAsync(async (req: Request & { user?: any }, res: Response) => {
const user=req.user


  const result = await userServices.getUserWithProfileFromDB(user);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message:  "User profile retrieved successfully",
      data: result,
    });
  });


const updateUserWithProfile= catchAsync(async (req: Request & { user?: any }, res: Response) => {
const user = req.user

  const result = await userServices.updateMyProfile(user,req.body);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK ,
      message: "User profile updated successfully",
      data: result,
    });
  });

  // const getAllUsers= catchAsync(async (req, res) => {
  //   const result = await userServices.getAllUsers();
  
  //   sendResponse(res, {
  //     statusCode: 201,
  //     success: true,
  //     message: 'Retrieved all user  successfully',
  //     data: result,
  //   });
  // });


  const getAllUsers = catchAsync(async (req, res) => {
    const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    console.log(options);
    const result = await userServices.getAllUsers(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "user retrieved successfully",
  
      data: result,
    });
  });
  const updateUser= catchAsync(async (req, res) => {
    const {userId}=req.params
    const result = await userServices.updateUser(userId,req.body);
  
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'user updated successfully',
      data: result,
    });
  });

export const userControllers={
    createUser,getUserWithProfile,updateUserWithProfile,getAllUsers,updateUser
}