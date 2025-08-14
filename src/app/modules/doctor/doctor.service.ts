import { Doctor, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IDoctorUpdate } from "./doctor.interface";


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


export const DoctorService ={
    updateDoctorIntoDB,
    softDeleteFromDB
}