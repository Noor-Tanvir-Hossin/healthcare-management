import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../helpars/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IAuthUser } from "../../interface/common";
import { AppointmentService } from "./appoinment.service";
import pick from "../../../shared/pick";
import { get } from "http";
import { appointmentFilterableFields } from "./appoinment.constants";

const createAppointment=catchAsync(async(req , res)=>{    

    const user = req.user;
    const result = await AppointmentService.createAppointment( user as IAuthUser, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Appointment booked successfully!",
        data: result
    })
})
const getMyAppointment=catchAsync(async(req , res)=>{    

    const user = req.user;
    const filters = pick(req.query, ['status', 'paymentStatus']);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await AppointmentService.getMyAppointment( user as IAuthUser, filters, options);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'My Appointment retrive successfully',
        data: result
    })
})
const getAllFromDB=catchAsync(async(req , res)=>{    

    const filters = pick(req.query, appointmentFilterableFields)
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await AppointmentService.getAllFromDB( filters, options);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Appointment retrival successfully!",
        meta: result.meta,
        data: result.data,
    })
})

const changeAppointmentStatus=catchAsync(async(req , res)=>{    

    const user = req.user;
    const { id } = req.params;
    const { status } = req.body;
    const result = await AppointmentService.changeAppointmentStatus( id, status, user as IAuthUser);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Appointment changed successfully!",
        data: result
    })
})

export const AppointmentController = {
    createAppointment,
    getMyAppointment,
    getAllFromDB,
    changeAppointmentStatus
}