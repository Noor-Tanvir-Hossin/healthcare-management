import { Router } from "express";
import { adminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidationSchema } from "./admin.validation";


const router = Router()

router.get('/',adminController.getAllAdmins);
router.get('/:id',adminController.getAdminById);
router.patch('/:id',validateRequest(adminValidationSchema.update),adminController.updateAdmin );
router.delete('/:id',adminController.deleteAdmin );
router.delete('/soft/:id',adminController.softDeleteAdmin );




export const adminRoutes = router;              