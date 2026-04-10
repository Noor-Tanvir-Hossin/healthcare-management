import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../helpars/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IAuthUser } from "../../interface/common";
import { DoctorScheduleService } from "./doctorSchedule.service";

const insertIntoDB=catchAsync(async(req , res)=>{    

    const user = req.user;

    const result = await DoctorScheduleService.insertIntoDB(user as IAuthUser, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Doctor Schedule created successfully!",
        data: result
    })
}) 


export const DoctorScheduleController = {
    insertIntoDB
  };