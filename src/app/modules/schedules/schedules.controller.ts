import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../helpars/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ScheduleService } from "./schedules.service";


const insertSchedules=catchAsync(async(req, res)=>{    const result = await ScheduleService.insertSchedulesIntoDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Schedules created successfully",
        data: result
    })
}) 


export const SchedulesController = {
    insertSchedules
   
  };