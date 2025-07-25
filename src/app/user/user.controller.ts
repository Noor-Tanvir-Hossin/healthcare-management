import { Request, Response } from "express";
import { userService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
    try {
        const result = await userService.createAdminIntoDB(req.body);

    res.status(201).json({
        success: true,
        message: result.message,
        data: result
    });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.name || "Internal Server Error",
            error:error
        })
    }
}






export const userController = {
    createAdmin,
}