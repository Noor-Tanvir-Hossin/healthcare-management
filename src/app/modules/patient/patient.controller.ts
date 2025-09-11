import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../helpars/catchAsync";
import pick from "../../../shared/pick";
import { patientFilterableFields } from "./patient.constant";
import { PatientService } from "./patient.service";
import sendResponse from "../../../shared/sendResponse";

const getAllPatient =catchAsync(async(req, res)=>{
    const filters = pick(req.query, patientFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  
    const result = await PatientService.getAllPatientFromDB(filters, options);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Patient retrieval successfully",
        meta: result.meta,
        data: result.data
    })
})
const getPatientById=catchAsync(async(req, res)=>{
    
    const {id} = req.params
    const result = await PatientService.getPatientByIdFromDB(id);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Patient retrieval successfully",
        data: result
    })
})




export const PatientController = {
    getAllPatient,
    getPatientById
  };