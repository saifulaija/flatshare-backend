"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.patch('/update-user/:userId', user_controller_1.userControllers.updateUser);
router.get('/', (0, auth_1.default)(client_1.UserRole.ADMIN), user_controller_1.userControllers.getAllUsers);
router.post('/register', user_controller_1.userControllers.createUser);
router.get("/profile", (0, auth_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), user_controller_1.userControllers.getUserWithProfile);
router.patch("/update-profile", (0, auth_1.default)(client_1.UserRole.USER, client_1.UserRole.ADMIN), user_controller_1.userControllers.updateUserWithProfile);
exports.userRoutes = router;
