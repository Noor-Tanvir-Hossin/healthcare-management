import { Request, Response } from "express";
import { adminService } from "./admin.service";
import { log } from "console";
import { adminFilterableFields } from "./admin.constant";
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

export const adminController = {
    getAllAdmins
}