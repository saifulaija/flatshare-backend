"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRoutes = void 0;
const express_1 = __importDefault(require("express"));
const image_controller_1 = require("./image.controller");
const router = express_1.default.Router();
router.post("/create-image", 
//  authGuard(UserRole.USER),
image_controller_1.imageControllers.createImage);
// router.get('/flats', flatControllers.getAllFlats
// );
// router.put('/flats/:flatId',authGuard(UserRole.USER), flatControllers.updateFlatData)
exports.imageRoutes = router;
