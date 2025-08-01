import { Admin, Prisma, PrismaClient, UserStatus } from "@prisma/client";
import { adminSearchFields } from "./admin.constant";
import { paginationHelpar } from '../../../helpars/paginationHelpar';
import prisma from "../../../shared/prisma";
import { IAdminFilterRequest } from "./admin.interface";
import { IPaginationOptions } from "../../interface/pagination";



const getAllAdminsFromDB = async (params:IAdminFilterRequest, options: IPaginationOptions) => {

    const {searchTerm , ...filterData} = params;
    const {limit, page,skip} = paginationHelpar.calculatePagination(options);
    console.log(options);    
    const andConditions: Prisma.AdminWhereInput[] = [];

    if (params.searchTerm) {
        andConditions.push(
            {
                OR:adminSearchFields.map((field) => ({
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
    andConditions.push({
        isDeleted:false
    })
    


    const whereCondition: Prisma.AdminWhereInput ={AND: andConditions}
    
    const result = await prisma.admin.findMany({

        where: whereCondition,
        skip,
        take:limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        }
    })
    const total = await prisma.admin.count({
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


const getAdminByIdFromDB =async(id:string): Promise<Admin|null>=>{
        const result = await prisma.admin.findUnique({
            where:{
                id,
                isDeleted:false
            }
        })
        return result
}

const updateAdminIntoDB = async(id:string, data: Partial<Admin>):Promise<Admin>=>{
    await prisma.admin.findUniqueOrThrow({
        where:{
            id
        }
    })
    const result = await prisma.admin.update({
        where:{
            id,
            isDeleted:false
        },
        data
    })
    return result    
}

const deleteAdminFromDB = async(id:string):Promise<Admin|null>=>{
    await prisma.admin.findUniqueOrThrow({
        where:{id}
    })
    const result = await prisma.$transaction(async(transactionClient)=>{
        const adminDeletedData = await transactionClient.admin.delete({
            where:{
                id
            }
        })
         await transactionClient.user.delete({
            where:{
                email: adminDeletedData.email
            }
        })
        return adminDeletedData
    })
    return result
    
}

const softDeleteFromDB = async(id:string):Promise<Admin|null>=>{
    console.log(id);
    
    await prisma.admin.findUniqueOrThrow({
        where:{
            id
        }
    })
    const result = await prisma.$transaction(async(transactionClient)=>{
        const admindeletedData = transactionClient.admin.update({
            where:{
                id
            },
            data:{
                isDeleted:true
            }
        });

        transactionClient.user.update({
            where:{
                email:(await admindeletedData).email
            },
            data:{status:UserStatus.DELETED}
        })
        return admindeletedData

        
    })
    return result
}

export const adminService= {
    getAllAdminsFromDB,
    getAdminByIdFromDB,
    updateAdminIntoDB,
    deleteAdminFromDB,
    softDeleteFromDB
}