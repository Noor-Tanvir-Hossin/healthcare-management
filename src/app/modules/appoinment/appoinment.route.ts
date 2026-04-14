import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { AppointmentValidation } from "./appoinment.validation";
import { AppointmentController } from "./appoinment.controller";

const router = Router();

router.post(
    '/',
    auth(UserRole.PATIENT),
    validateRequest(AppointmentValidation.createAppointment),
    AppointmentController.createAppointment
);


export const AppointmentRoutes = router;