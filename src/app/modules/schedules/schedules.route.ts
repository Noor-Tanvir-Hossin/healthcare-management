import { Router } from "express";
import { SchedulesController } from "./schedules.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.get(
    '/',
    auth(UserRole.DOCTOR),
    SchedulesController.getAllFromDB
);

router.get(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
    SchedulesController.getByIdFromDB
);







router.delete(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    SchedulesController.deleteFromDB
);

export const SchedulesRoutes = router;