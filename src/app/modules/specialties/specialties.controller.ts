import { StatusCodes } from "http-status-codes";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../helpars/catchAsync";
import { SpecialtiesService } from "./specialties.service";


const createSpecialties = catchAsync(async (req, res) => {
    const result = await SpecialtiesService.createSpecialtiesIntoDB(req);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Specialties created Successfully",
        data: result
    })
});

const getAll = catchAsync(async (req, res) => {
    const result = await SpecialtiesService.getAllFromDB();

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Specialties data fetched successfully",
        data: result
    })
});

const deleteFromDB  = catchAsync(async (req, res) => {
    const {id} = req.params
    const result = await SpecialtiesService.deleteFromDB(id);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Specialty deleted successfully",
        data: result
    })
});



export const SpecialtiesController = {
    createSpecialties,
    getAll,
    deleteFromDB 
   
};