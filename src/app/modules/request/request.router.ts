import express from 'express'

import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
const router = express.Router()

// router.post('/booking-applications',auth(UserRole.USER), bookingControllers.createBooking)
// router.get('/booking-requests',auth(UserRole.USER), bookingControllers.getAllBookings)
// router.put('/booking-requests/:bookingId',auth(UserRole.USER), bookingControllers.updateBooking)


export const requestRoutes=router