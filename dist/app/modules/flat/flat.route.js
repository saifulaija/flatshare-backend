"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatRoutes = void 0;
const express_1 = __importDefault(require("express"));
const flat_controller_1 = require("./flat.controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.patch("/:flatId", (0, auth_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), flat_controller_1.flatControllers.updateFlatData);
router.delete("/soft-delete/:id", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), flat_controller_1.flatControllers.softDelete);
router.get("/get-single-flat/:id", flat_controller_1.flatControllers.getSingleFlat);
router.post("/create-flat", (0, auth_1.default)(client_1.UserRole.USER), flat_controller_1.flatControllers.createFlat);
router.get("/get-my-flats", (0, auth_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), flat_controller_1.flatControllers.getAllMyFlats);
router.get("/", flat_controller_1.flatControllers.getAllFlats);
exports.flatRoutes = router;
