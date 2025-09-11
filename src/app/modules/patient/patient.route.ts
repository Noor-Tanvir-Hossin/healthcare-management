import { Router } from "express";
import { PatientController } from "./patient.controller";

const router = Router();

router.get('/',PatientController.getAllPatient)

export const PatientRoutes = router;