import { Router } from "express";
import { adminController } from "./admin.controller";


const router = Router()

router.get('/',adminController.getAllAdmins);
router.get('/:id',adminController.getAdminById);
router.patch('/:id',adminController.updateAdmin );




export const adminRoutes = router;              