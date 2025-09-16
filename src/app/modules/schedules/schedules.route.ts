import { Router } from "express";
import { SchedulesController } from "./schedules.controller";

const router = Router();

router.post('/', SchedulesController.insertSchedules)



export const SchedulesRoutes = router;