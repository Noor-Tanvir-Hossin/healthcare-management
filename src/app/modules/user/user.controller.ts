import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../helpars/catchAsync";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";

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


const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = await userService.getAllUserFromDB(filters, options);
  
    if (!result.data.length) {
      sendResponse(res, {
          statusCode: StatusCodes.NOT_FOUND,
          success: false,
          message: "user not found",
          data: null,
        });
    }
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User data fatched!",
      meta: result.meta,
      data: result.data,
    });
  });


const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await userService.changeProfileStatus(id, req.body);
    
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User profile status changed",
      data: result,
    });
  });








export const userController = {
    createAdmin,
    createDoctor,
    createPatient,
    getAllUser,
    changeProfileStatus,
    
}