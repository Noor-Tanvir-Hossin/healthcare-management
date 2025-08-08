import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from 'bcrypt'
import prisma from "../../../shared/prisma";
import { fileUploader } from "../../../helpars/fileUploader";
import { IFile } from "../../interface/file";


const createAdminIntoDB = async(req:any)=>{
        const file : IFile = req.file;
        if(file){
            const uploadToCloudinary= await fileUploader.uploadToCloudinary(file)
            req.body.admin.profilePhoto = uploadToCloudinary?.secure_url }


    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData ={
        email:req.body.admin.email,
        password:hashedPassword,
        role: UserRole.ADMIN      
    }    

    const result = await prisma.$transaction(async (transactionClient): Promise<any> => {
       await transactionClient.user.create({
            data: userData
        })
        const createAdmin = await transactionClient.admin.create({
            data : req.body.admin
        })
        return createAdmin;
    })

    return result
}

const createDoctorIntoDB = async(req:any)=>{
        const file : IFile = req.file;
        if(file){
            const uploadToCloudinary= await fileUploader.uploadToCloudinary(file)
            req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url }


    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData ={
        email:req.body.doctor.email,
        password:hashedPassword,
        role: UserRole.DOCTOR      
    }    

    const result = await prisma.$transaction(async (transactionClient): Promise<any> => {
       await transactionClient.user.create({
            data: userData
        })
        const createDoctor = await transactionClient.doctor.create({
            data : req.body.doctor
        })
        return createDoctor;
    })
    return result
}

export const userService = {
    createAdminIntoDB,
    createDoctorIntoDB
};