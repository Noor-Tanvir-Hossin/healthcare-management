import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchFields } from "./admin.constant";

const prisma = new PrismaClient();

const getAllAdminsFromDB = async (params:any, options: any) => {

    const {searchTerm , ...filterData} = params;
    const {limit, page} = options
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
        skip: (Number(page) - 1) * limit,
        take: Number(limit),
        orderBy:{
            name: options.sortOrder === 'asc' ? 'asc' : 'desc'
        }
    })
    return result;
}

export const adminService= {
    getAllAdminsFromDB
}