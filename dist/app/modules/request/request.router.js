"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// router.post('/booking-applications',auth(UserRole.USER), bookingControllers.createBooking)
// router.get('/booking-requests',auth(UserRole.USER), bookingControllers.getAllBookings)
// router.put('/booking-requests/:bookingId',auth(UserRole.USER), bookingControllers.updateBooking)
exports.requestRoutes = router;
