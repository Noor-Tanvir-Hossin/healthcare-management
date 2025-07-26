import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "http";
import { StatusCodes } from 'http-status-codes';

const globalErrorHandlers = (err:any, req:Request, res:Response, next:NextFunction) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: {
            name: err.name,
            message: err.message,
            stack: err.stack
        }
    });
}
export default globalErrorHandlers;