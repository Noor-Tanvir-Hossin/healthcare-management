import { Admin, Doctor, Patient, Prisma, PrismaClient, UserRole, UserStatus } from "@prisma/client";
import * as bcrypt from 'bcrypt'
import prisma from "../../../shared/prisma";
import { fileUploader } from "../../../helpars/fileUploader";
import { IFile } from "../../interface/file";
import { Request } from "express";
import { IPaginationOptions } from "../../interface/pagination";
import { paginationHelpar } from "../../../helpars/paginationHelpar";
import { useSearchableFields } from "./user.constant";


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

const getAllUserFromDB = async (params:any, options: IPaginationOptions) => {

    const {searchTerm , ...filterData} = params;
    const {limit, page,skip} = paginationHelpar.calculatePagination(options);   
    const andConditions: Prisma.UserWhereInput[] = [];

    if (params.searchTerm) {
        andConditions.push(
            {
                OR:useSearchableFields.map((field) => ({
                    [field]: {
                        contains: params.searchTerm,
                        mode: 'insensitive'
                    }
                }))
            }
        )
    }

    if(Object.keys(filterData).length > 0){
        andConditions.push({
            AND: (Object.keys(filterData) as (keyof typeof filterData)[]).map((key)=>({
                [key]: filterData[key]
            }))
        })
    }

    // console.dir(andConditions, {depth: Infinity}); 


    const whereCondition: Prisma.UserWhereInput = andConditions.length>0 ? {AND: andConditions} : {}
    
    const result = await prisma.user.findMany({

        where: whereCondition,
        skip,
        take:limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        },
        select:{
            id:true,
            email:true,
            role:true,
            needPasswordChange:true,
            status:true,
            createdAt:true,
            updatedAt:true,
            admin:true,
            patient:true,
            doctor:true
        }
        ,
        // include:{
        //     admin:true,
        //     patient:true,
        //     doctor:true
        // }
    })
    const total = await prisma.user.count({
        where: whereCondition
    })
    return {
        meta:{
            page,
            limit,
            total
        },
        data:  result};
}

const changeProfileStatus = async (id: string, status: UserRole) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    });

    const updateUserStatus = await prisma.user.update({
        where: {
            id
        },
        data: status
    });

    return updateUserStatus;
};

const getMyProfileFromDB = async(user:any)=>{
    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user?.email,
            status: UserStatus.ACTIVE
        },
        select: {
            id: true,
            email: true,
            needPasswordChange: true,
            role: true,
            status: true
        }
    });

    let profileInfo;

    if (userInfo.role === UserRole.SUPER_ADMIN) {
        profileInfo = await prisma.admin.findUnique({
            where: {
                email: userInfo.email
            }
        })
    }
    else if (userInfo.role === UserRole.ADMIN) {
        profileInfo = await prisma.admin.findUnique({
            where: {
                email: userInfo.email
            }
        })
    }
    else if (userInfo.role === UserRole.DOCTOR) {
        profileInfo = await prisma.doctor.findUnique({
            where: {
                email: userInfo.email
            }
        })
    }
    else if (userInfo.role === UserRole.PATIENT) {
        profileInfo = await prisma.patient.findUnique({
            where: {
                email: userInfo.email
            }
        })
    }

    return { ...userInfo, ...profileInfo };
}



export const userService = {
    createAdminIntoDB,
    createDoctorIntoDB,
    createPatientIntoDB,
    getAllUserFromDB,
    changeProfileStatus,
    getMyProfileFromDB
};