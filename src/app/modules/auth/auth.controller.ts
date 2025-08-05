import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../helpars/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthServices } from "./auth.service";


const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);

    const { refreshToken } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true
    });

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Logged in successfully!",
        data: {
            accessToken: result.accessToken,
            needPasswordChange: result.needPasswordChange
        }
    })
});
const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;

    const result = await AuthServices.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Access token genereated successfully!",
        data: result
    })
});

const changePassword = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    console.log(req.user, req.body);
    const user = req.user
    const payload = req.body

    await AuthServices.changePassword(user, payload);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Password changed successfully!",
        data: null
    })
});


export const AuthController = {
    loginUser,
    refreshToken,
    changePassword
   
};