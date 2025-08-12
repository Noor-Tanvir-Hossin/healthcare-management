import { NextFunction, Request, Response, Router } from "express";

import { fileUploader } from "../../../helpars/fileUploader";
import { SpecialtiesController } from "./specialties.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";


const router = Router()

router.get(
    '/',
    SpecialtiesController.getAll
);

router.post('/',fileUploader.upload.single('file'),
(req:Request, res:Response, next:NextFunction)=>{
    req.body = JSON.parse(req.body.data)
    return SpecialtiesController.createSpecialties(req, res,next)
})

router.delete(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    SpecialtiesController.deleteFromDB
);

export const specialtiesRoutes = router