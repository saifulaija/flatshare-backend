"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post('/create-booking', (0, auth_1.default)(client_1.UserRole.USER), booking_controller_1.bookingControllers.createBooking);
router.get('/my-bookings', (0, auth_1.default)(client_1.UserRole.USER), booking_controller_1.bookingControllers.myBooking);
router.put('/booking-requests/:bookingId', (0, auth_1.default)(client_1.UserRole.USER), booking_controller_1.bookingControllers.updateBooking);
exports.bookingRoutes = router;
