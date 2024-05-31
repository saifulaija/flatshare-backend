import express, { NextFunction, Request, Response } from "express";
import { userControllers } from "./user.controller";


import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";





const router = express.Router();


router.patch('/update-user/:userId',userControllers.updateUser)

router.get('/', auth(UserRole.ADMIN),userControllers.getAllUsers)

router.post('/register', userControllers.createUser)

router.get("/profile", auth(UserRole.USER,UserRole.ADMIN), userControllers.getUserWithProfile);
router.patch(
  "/update-profile",
  auth(UserRole.USER,UserRole.ADMIN),
  userControllers.updateUserWithProfile
);



export const userRoutes = router;
