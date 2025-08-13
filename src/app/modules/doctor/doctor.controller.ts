import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../helpars/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DoctorService } from "./doctor.service";

const updateDoctor = catchAsync(async (req, res) => {

    const {id} = req.params

    const result = await DoctorService.updateDoctorIntoDB(id, req.body)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Doctor data updated!",
        data: result
    })
});


export const DoctorController = {
    updateDoctor,
    
}