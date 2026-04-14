import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../helpars/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IAuthUser } from "../../interface/common";
import { AppointmentService } from "./appoinment.service";

const createAppointment=catchAsync(async(req , res)=>{    

    const user = req.user;
    const {id} = req.params

    const result = await AppointmentService.createAppointment( user as IAuthUser, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Appointment booked successfully!",
        data: result
    })
})

export const AppointmentController = {
    createAppointment,
    
}