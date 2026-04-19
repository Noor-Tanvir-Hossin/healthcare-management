import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../helpars/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IAuthUser } from "../../interface/common";
import { PrescriptionService } from "./prescription.service";
import pick from "../../../shared/pick";
import { prescriptionFilterableFields } from "./prescription.constants";


const insertIntoDB=catchAsync(async(req , res)=>{    

    const user = req.user;
    const result = await PrescriptionService.insertIntoDB( user as IAuthUser, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Prescription created successfully!",
        data: result
    })
})


const patientPrescription=catchAsync(async(req , res)=>{
    const user = req.user;
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    const result = await PrescriptionService.patientPrescription(user as IAuthUser, options);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Patient prescription retrieved successfully!",
        meta: result.meta,
        data: result.data
    })
})


const getAllFromDB =catchAsync(async(req , res)=>{
    const filters = pick(req.query, prescriptionFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    const result = await PrescriptionService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Prescriptions retrieved successfully!",
        meta: result.meta,
        data: result.data
    })
})





export const PrescriptionController = {
    insertIntoDB,
    patientPrescription,
    getAllFromDB
};