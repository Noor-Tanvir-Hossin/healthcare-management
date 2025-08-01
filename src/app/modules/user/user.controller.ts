import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../helpars/catchAsync";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
        const result = await userService.createAdminIntoDB(req.body);
    sendResponse(res,{
        statusCode:StatusCodes.CREATED,
        success:true,
        message: result.message ||"Admin created!",
        data:result
    })    
})






export const userController = {
    createAdmin,
}