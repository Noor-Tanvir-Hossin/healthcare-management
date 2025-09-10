import { Doctor, Prisma, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IDoctorFilterRequest, IDoctorUpdate } from "./doctor.interface";
import { IPaginationOptions } from "../../interface/pagination";
import { paginationHelpar } from "../../../helpars/paginationHelpar";
import { doctorSearchableFields } from "./doctor.constants";



const getAllFromDB = async (
    filters: IDoctorFilterRequest,
    options: IPaginationOptions,
) => {
    const { limit, page, skip } = paginationHelpar.calculatePagination(options);
    const { searchTerm, specialties, ...filterData } = filters;

    const andConditions: Prisma.DoctorWhereInput[] = [];

    if (searchTerm) {
        andConditions.push({
            OR: doctorSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    };

    // doctor > doctorSpecialties > specialties -> title

    if (specialties && specialties.length > 0) {
        andConditions.push({
            doctorSpecialties: {
                some: {
                    specialities: {
                        title: {
                            contains: specialties,
                            mode: 'insensitive'
                        }
                    }
                }
            }
        })
    };


    if (Object.keys(filterData).length > 0) {
        const filterConditions = Object.keys(filterData).map(key => ({
            [key]: {
                equals: (filterData as any)[key],
            },
        }));
        andConditions.push(...filterConditions);
    }

    andConditions.push({
        isDeleted: false,
    });

    const whereConditions: Prisma.DoctorWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.doctor.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : { averageRating: 'desc' },
        include: {
            doctorSpecialties: {
                include: {
                    specialities: true
                }
            },
        },
    });

    const total = await prisma.doctor.count({
        where: whereConditions,
    });

    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
};




const getByIdFromDB = async (id: string): Promise<Doctor | null> => {
    const result = await prisma.doctor.findUnique({
        where: {
            id,
            isDeleted: false,
        },
        include: {
            doctorSpecialties: {
                include: {
                    specialities: true
                }
            }
        }
    });
    return result; 
};


const updateDoctorIntoDB = async(id:string, payload: IDoctorUpdate)=>{
    const {specialties, ...doctorData}= payload
    console.log("spc", specialties);
    console.log("Dd", doctorData);
    
    const doctorInfo = await prisma.doctor.findUniqueOrThrow({
        where:{
            id
        }
    })
    
    await prisma.$transaction(async(transactionClient)=>{
       await transactionClient.doctor.update({
            where:{
                id
            },
            data:doctorData
        })

        if(specialties && specialties.length > 0){
            const deleteSpecialtiesId = specialties.filter(specialty => specialty.isDeleted)
            for(const specialty of deleteSpecialtiesId){
                await transactionClient.doctorSpecialties.deleteMany({
                    where:{
                        doctorId:doctorInfo.id,
                        specialitiesId:specialty.specialtiesId
                    }
                })
            }

            const createSpecialties = specialties.filter(specialty => !specialty.isDeleted)
            for(const specialty of createSpecialties){
                await transactionClient.doctorSpecialties.create({
                    data:{
                        doctorId: doctorInfo.id,
                        specialitiesId:specialty.specialtiesId
                    }
                })
            }
        }

        
    })

    const result = await prisma.doctor.findUniqueOrThrow({
        where:{
            id:doctorInfo.id
        },
        include:{
            doctorSpecialties:{
                include:{
                    specialities:true
                }
            }
        }
    })
    return result
    
}

const softDeleteFromDB = async (id: string): Promise<Doctor> => {
    return await prisma.$transaction(async transactionClient => {
        const deleteDoctor = await transactionClient.doctor.update({
            where: { id },
            data: {
                isDeleted: true,
            },
        });

        await transactionClient.user.update({
            where: {
                email: deleteDoctor.email,
            },
            data: {
                status: UserStatus.DELETED,
            },
        });

        return deleteDoctor;
    });
};

const deleteDoctorFromDB = async (id: string): Promise<Doctor> => {
    return await prisma.$transaction(async transactionClient => {
        const deleteDoctor = await transactionClient.doctor.delete({
            where: {
                id,
            },
        });

        await transactionClient.user.delete({
            where: {
                email: deleteDoctor.email,
            },
        });

        return deleteDoctor;
    });
};


export const DoctorService ={
    getAllFromDB,
    getByIdFromDB,
    updateDoctorIntoDB,
    softDeleteFromDB,
    deleteDoctorFromDB
}