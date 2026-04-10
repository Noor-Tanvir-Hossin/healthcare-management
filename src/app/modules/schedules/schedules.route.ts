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

router.post('/',
auth(UserRole.SUPER_ADMIN, UserRole.ADMIN)
, SchedulesController.insertSchedules)



export const SchedulesRoutes = router;