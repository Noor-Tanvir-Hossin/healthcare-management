import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../helpars/catchAsync";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
        const result = await userService.createAdminIntoDB(req);
    sendResponse(res,{
        statusCode:StatusCodes.CREATED,
        success:true,
        message:"Admin created!",
        data:result
    })    
})

const createDoctor = catchAsync(async (req: Request, res: Response) => {
        const result = await userService.createDoctorIntoDB(req);
    sendResponse(res,{
        statusCode:StatusCodes.CREATED,
        success:true,
        message:"Doctor Created Successfully!",
        data:result
    })    
})

const createPatient = catchAsync(async (req: Request, res: Response) => {
        const result = await userService.createPatientIntoDB(req);
    sendResponse(res,{
        statusCode:StatusCodes.CREATED,
        success:true,
        message:"Patient Created Successfully!",
        data:result
    })    
})






export const userController = {
    createAdmin,
    createDoctor,
    createPatient
}