import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../helpars/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IAuthUser } from "../../interface/common";
import { ReviewService } from "./review.service";
import pick from "../../../shared/pick";
import { reviewFilterableFields } from "./review.constants";


const insertIntoDB=catchAsync(async(req , res)=>{    

    const user = req.user;
    const result = await ReviewService.insertIntoDB( user as IAuthUser, req.body);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Review created successfully!",
        data: result
    })
})


const getAllFromDB=catchAsync(async(req , res)=>{    

    const filters = pick(req.query, reviewFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await ReviewService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Reviews retrival successfully!",
        meta: result.meta,
        data: result.data,
    })
})





export const ReviewController = {
    insertIntoDB,
    getAllFromDB
}