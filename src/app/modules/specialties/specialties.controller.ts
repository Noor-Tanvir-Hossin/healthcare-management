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



export const SpecialistController = {
    createSpecialties
   
};