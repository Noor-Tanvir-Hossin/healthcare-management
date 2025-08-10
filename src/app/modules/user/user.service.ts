import { Admin, Doctor, Patient, Prisma, PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from 'bcrypt'
import prisma from "../../../shared/prisma";
import { fileUploader } from "../../../helpars/fileUploader";
import { IFile } from "../../interface/file";
import { Request } from "express";
import { IPaginationOptions } from "../../interface/pagination";
import { paginationHelpar } from "../../../helpars/paginationHelpar";


const createAdminIntoDB = async(req:Request): Promise<Admin>=>{
        const file : IFile = req.file as IFile;
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

const createDoctorIntoDB = async(req:Request): Promise<Doctor>=>{
        const file  = req.file as IFile;
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


const createPatientIntoDB = async (req: Request): Promise<Patient> => {
    const file = req.file as IFile;

    if (file) {
        const uploadedProfileImage = await fileUploader.uploadToCloudinary(file);
        req.body.patient.profilePhoto = uploadedProfileImage?.secure_url;
    }

    const hashedPassword: string = await bcrypt.hash(req.body.password, 12)

    const userData = {
        email: req.body.patient.email,
        password: hashedPassword,
        role: UserRole.PATIENT
    }

    const result = await prisma.$transaction(async (transactionClient) => {
        await transactionClient.user.create({
            data: userData
        });

        const createdPatientData = await transactionClient.patient.create({
            data: req.body.patient
        });

        return createdPatientData;
    });

    return result;
};



export const userService = {
    createAdminIntoDB,
    createDoctorIntoDB,
    createPatientIntoDB
};