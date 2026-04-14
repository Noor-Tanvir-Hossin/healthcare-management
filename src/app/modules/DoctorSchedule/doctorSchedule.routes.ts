import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import { DoctorScheduleValidation } from "./doctorSchedule.validation";

const router = Router();

router.post(
    '/',
    auth(UserRole.DOCTOR),
    validateRequest(DoctorScheduleValidation.create),
    DoctorScheduleController.insertIntoDB
);

router.get(
    '/my-schedule',
    auth(UserRole.DOCTOR),
    DoctorScheduleController.getMySchedule
)

router.delete(
    '/:id',
    auth(UserRole.DOCTOR),
    DoctorScheduleController.deleteFromDB
);

router.get(
    '/',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
    DoctorScheduleController.getAllFromDB
);



export const DoctorSchedulesRoutes = router;