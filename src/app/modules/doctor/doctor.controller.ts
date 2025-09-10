import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../helpars/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DoctorService } from "./doctor.service";
import pick from "../../../shared/pick";
import { doctorFilterableFields } from "./doctor.constants";

const getAllFromDB =catchAsync(async(req, res) =>{
    const filters = pick(req.query, doctorFilterableFields);

    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await DoctorService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Doctors retrieve successfully!",
        meta: result.meta,
        data: result.data
    })
})

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
    getAllFromDB,
    getById,
    updateDoctor,
    softDelete,
    deleteDoctor    
}