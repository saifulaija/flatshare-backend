import express from 'express';
import { MetaController } from './meta.controller';

import { UserRole } from '@prisma/client';
import auth from '../../middlewares/auth';


const router = express.Router();

// Routes for fetching metadata for the dashboard
router.get(
    '/',
    auth(UserRole.ADMIN,UserRole.USER),
    MetaController.fetchDashboardMetadata
);

export const MetaRoutes = router;