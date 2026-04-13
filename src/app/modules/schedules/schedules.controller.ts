import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../helpars/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ScheduleService } from "./schedules.service";
import pick from "../../../shared/pick";
import { IAuthUser } from "../../interface/common";


const insertSchedules=catchAsync(async(req, res)=>{    const result = await ScheduleService.insertSchedulesIntoDB(req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Schedules created successfully",
        data: result
    })
}) 

const getAllFromDB=catchAsync(async(req , res)=>{
    
    const filters = pick(req.query, ['startDate', 'endDate']);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const user = req.user;

    const result = await ScheduleService.getAllFromDB(filters, options, user as IAuthUser);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Schedules retrived successfully",
        data: result
    })
}) 

const getByIdFromDB=catchAsync(async(req, res)=>{  
    const { id } = req.params;
    const result = await ScheduleService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Schedules retrived successfully",
        data: result
    })
})

const deleteFromDB=catchAsync(async(req, res)=>{ 
    const { id } = req.params;
    const result = await ScheduleService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Schedules deleted successfully",
        data: result
    })
})


export const SchedulesController = {
    insertSchedules,
    getAllFromDB,
    getByIdFromDB,
    deleteFromDB
   
  };