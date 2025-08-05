import { Router } from "express";
import { adminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchema } from "./admin.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";


const router = Router()

router.get('/',
 auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),adminController.getAllAdmins);

router.get('/:id',
auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),adminController.getAdminById);

router.patch('/:id',
auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),validateRequest(adminValidationSchema.update),adminController.updateAdmin );

router.delete('/:id',
auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),adminController.deleteAdmin );

router.delete('/soft/:id',auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),adminController.softDeleteAdmin );




export const adminRoutes = router;              