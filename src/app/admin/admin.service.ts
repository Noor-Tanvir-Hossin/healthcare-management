import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchFields } from "./admin.constant";
import { paginationHelpar } from './../../helpars/paginationHelpar';
import prisma from "../../shared/prisma";



const getAllAdminsFromDB = async (params:any, options: any) => {

    const {searchTerm , ...filterData} = params;
    const {limit, page,skip,sortOrder,sortBy} = paginationHelpar.calculatePagination(options);
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
            AND: Object.keys(filterData).map((key)=>({
                [key]: filterData[key]
            }))
        })
    }

    console.dir(andConditions, {depth: Infinity});
    


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

export const adminService= {
    getAllAdminsFromDB
}