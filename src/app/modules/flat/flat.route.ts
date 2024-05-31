import express from "express";
import { flatControllers } from "./flat.controller";

import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();



router.patch(
  "/:flatId",
  auth(UserRole.USER,UserRole.ADMIN),
  flatControllers.updateFlatData
);

router.delete(
  "/soft-delete/:id",
  auth(UserRole.ADMIN, UserRole.USER),
  flatControllers.softDelete
);

router.get(
  "/get-single-flat/:id",

  flatControllers.getSingleFlat
);
router.post("/create-flat", auth(UserRole.USER), flatControllers.createFlat);


router.get(
  "/get-my-flats",
  auth(UserRole.USER, UserRole.ADMIN),
  flatControllers.getAllMyFlats
);
router.get("/", flatControllers.getAllFlats);

export const flatRoutes = router;
