import { NextFunction, Request, Response, Router } from "express";
import { SpecialistController } from "./specialties.controller";
import { fileUploader } from "../../../helpars/fileUploader";


const router = Router()

router.post('/',fileUploader.upload.single('file'),
(req:Request, res:Response, next:NextFunction)=>{
    req.body = JSON.parse(req.body.data)
    return SpecialistController.createSpecialties(req, res,next)
})

export const specialtiesRoutes = router