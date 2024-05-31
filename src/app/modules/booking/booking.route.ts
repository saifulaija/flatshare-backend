import express from 'express'

import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import { bookingControllers } from './booking.controller'
const router = express.Router()

router.post('/create-booking',auth(UserRole.USER), bookingControllers.createBooking)
router.get('/my-bookings',auth(UserRole.USER), bookingControllers.myBooking)
router.put('/booking-requests/:bookingId',auth(UserRole.USER), bookingControllers.updateBooking)


export const bookingRoutes=router