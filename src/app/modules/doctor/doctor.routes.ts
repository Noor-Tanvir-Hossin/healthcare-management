import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { DoctorController } from "./doctor.controller";
import { DoctorValidation } from "./doctor.validation";


const router = Router();


router.get('/:id', DoctorController.getById);

router.patch(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
    validateRequest(DoctorValidation.update),
    DoctorController.updateDoctor
);

router.delete(
    '/soft/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    DoctorController.softDelete);

router.delete(
        '/:id',
        auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
        DoctorController.deleteDoctor
    );

export const DoctorRoutes = router