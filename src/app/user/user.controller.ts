import { Request, Response } from "express";
import { userService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
    const result = await userService.createAdminIntoDB(req.body);

    res.status(201).json({
        success: true,
        message: result.message,
        data: result
    });
}






export const userController = {
    createAdmin,
}