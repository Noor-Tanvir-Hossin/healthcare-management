import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../helpars/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DoctorService } from "./doctor.service";

const getById = catchAsync(async (req, res) => {

    const {id} = req.params

    const result = await DoctorService.getByIdFromDB(id)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Doctor retrieve successfully!",
        data: result
    })
});
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

const softDelete = catchAsync(async (req, res) => {

    const {id} = req.params

    const result = await DoctorService.softDeleteFromDB(id)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Doctor soft deleted successfully!",
        data: result
    })
});

const deleteDoctor = catchAsync(async (req, res) => {

    const {id} = req.params

    const result = await DoctorService.deleteDoctorFromDB(id)

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Doctor deleted successfully!",
        data: result
    })
});


export const DoctorController = {
    getById,
    updateDoctor,
    softDelete,
    deleteDoctor    
}