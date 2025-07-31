import { Request, Response } from "express";
import { adminService } from "./admin.service";
import { log } from "console";
import { adminFilterableFields } from "./admin.constant";
import catchAsync from "../../helpars/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
// import pick from "../../shared/pick";

const pick =<T extends Record<string, unknown>,K extends keyof T >(obj:T, keys:K[])=>{
    const finalObject: Partial<T> = {};
    for(const key of keys){
        if(obj && Object.hasOwnProperty.call(obj,key)){
            finalObject[key] = obj[key];
        }
    }
    return finalObject
}


const getAllAdmins = async (req:Request, res:Response) => {
    try {
        const filters = pick(req.query, adminFilterableFields);
        const options = pick(req.query,['page', 'limit', 'sortBy', 'sortOrder']);        
        const result = await adminService.getAllAdminsFromDB(filters, options);
    res.status(200).json({
        success: true,
        message: "Admins fetched successfully",
        meta: result.meta,
        data: result.data
    })
    } catch (error) {
        res.status(500).json({
            success: false,
            message:  "Internal Server Error",
            error:error
        })
    }
}
const getAdminById = async(req: Request, res:Response)=>{
    try {
        const result = await adminService.getAdminByIdFromDB(req.params.id);


        res.status(200).json({
            success: true,
            message: "Admin fetched successfully",
            data: result
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:  "Internal Server Error",
            error:error
        })
    }
}

const updateAdmin = async(req: Request, res:Response)=>{
    try {
        const {id}=req.params
        const result = await adminService.updateAdminIntoDB(id, req.body);


        res.status(200).json({
            success: true,
            message: "Admin updated successfully",
            data: result
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:  "Internal Server Error",
            error:error
        })
    }
}
    
const deleteAdmin = async(req: Request, res:Response)=>{
    try {
        const {id}=req.params
        const result = await adminService.deleteAdminFromDB(id);


        res.status(200).json({
            success: true,
            message: "Admin deleted successfully",
            data: result
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:  "Internal Server Error",
            error:error
        })
    }
}

const softDeleteAdmin = async(req: Request, res:Response)=>{
    try {
        const {id}=req.params
        const result = await adminService.softDeleteFromDB(id);


        res.status(200).json({
            success: true,
            message: "Admin deleted successfully",
            data: result
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:  "Internal Server Error",
            error:error
        })
    }
}
    

export const adminController = {
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
    softDeleteAdmin
}