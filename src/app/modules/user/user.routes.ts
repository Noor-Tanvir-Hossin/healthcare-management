import express from 'express'
import { userController } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/create-admin', auth("ADMIN") , userController.createAdmin);

export const userRoutes = router;