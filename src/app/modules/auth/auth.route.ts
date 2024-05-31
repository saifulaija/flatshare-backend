import express from 'express';
import { authController } from './auth.controller';

import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post('/login', authController.loginUser);
router.post('/refresh-token', authController.refreshToken);
router.post(
   '/change-password',
   auth(
      UserRole.ADMIN,
      UserRole.USER,
     
   ),
   authController.changePassword
);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

export const authRoutes = router;
