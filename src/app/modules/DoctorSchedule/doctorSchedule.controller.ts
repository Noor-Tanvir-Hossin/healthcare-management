import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../helpars/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IAuthUser } from "../../interface/common";
import { DoctorScheduleService } from "./doctorSchedule.service";
import { scheduleFilterableFields } from "./doctorSchedule.constants";

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

const getMySchedule =catchAsync(async(req, res) =>{
    const filters = pick(req.query, ['startDate', 'endDate', 'isBooked']);

    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await DoctorScheduleService.getMySchedule(filters, options, req.user as IAuthUser);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "My Schedule fetched successfully!",
        data: result
    })
})


const deleteFromDB=catchAsync(async(req , res)=>{    

    const user = req.user;
    const {id} = req.params

    const result = await DoctorScheduleService.deleteFromDB(id , user as IAuthUser);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Doctor Schedule deleted successfully!",
        data: result
    })
}) 


const getAllFromDB =catchAsync(async(req, res) =>{
    const filters = pick(req.query, scheduleFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await DoctorScheduleService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Doctor Schedule retrieval successfully!",
        data: result
    })
})






export const DoctorScheduleController = {
    insertIntoDB,
    getMySchedule,
    deleteFromDB,
    getAllFromDB
  };