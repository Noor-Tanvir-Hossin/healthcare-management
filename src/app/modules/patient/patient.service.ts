import { Patient, Prisma } from "@prisma/client";
import { paginationHelpar } from "../../../helpars/paginationHelpar";
import { IPaginationOptions } from "../../interface/pagination";
import { patientSearchableFields } from "./patient.constant";
import { IPatientFilterRequest, IPatientUpdate } from "./patient.interface";
import prisma from "../../../shared/prisma";

const getAllPatientFromDB = async (
    filters: IPatientFilterRequest,
    options: IPaginationOptions,
  ) => {
    const { limit, page, skip } = paginationHelpar.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;
  
    const andConditions = [];
  
    if (searchTerm) {
      andConditions.push({
        OR: patientSearchableFields.map(field => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      });
    }
  
    if (Object.keys(filterData).length > 0) {
      andConditions.push({
        AND: Object.keys(filterData).map(key => {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }),
      });
    }
    andConditions.push({
      isDeleted: false,
    });
  
    const whereConditions: Prisma.PatientWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};
  
    const result = await prisma.patient.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy:
        options.sortBy && options.sortOrder
          ? { [options.sortBy]: options.sortOrder }
          : {
            createdAt: 'desc',
          },
      include: {
        medicalReport: true,
        patientHealthData: true,
      }
    });
    const total = await prisma.patient.count({
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

  const getPatientByIdFromDB = async (id: string): Promise<Patient | null> => {
    const result = await prisma.patient.findUnique({
      where: {
        id,
        isDeleted: false,
      },
      include: {
        medicalReport: true,
        patientHealthData: true,
      },
    });
    return result;
  };

const updatePatientIntoDB = async(id:string, payload: Partial<IPatientUpdate> ) : Promise<Patient|null> =>{
  const {patientHealthData, medicalReport, ...patientData} = payload

  const patientInfo = await prisma.patient.findUniqueOrThrow({
    where:{
      id,
      isDeleted:false
    }
  })

  await prisma.$transaction(async(transactionClient) =>{
    await transactionClient.patient.update({
      where:{
        id
      },
      data:patientData,
      include:{
        patientHealthData: true,
        medicalReport: true
      }     
    })

    if(patientHealthData){
      await transactionClient.patientHealthData.upsert({
        where:{
          patientId: patientInfo.id
        },
        update: patientHealthData,
        create: {... patientHealthData, patientId: patientInfo.id}
      })  
    }
    if (medicalReport) {
      await transactionClient.medicalReport.create({
        data: { ...medicalReport, patientId: patientInfo.id }
      })
    }
    

  })
  const responseData = await prisma.patient.findUnique({
    where:{
      id: patientInfo.id
    },
    include:{
      medicalReport: true,
      patientHealthData: true
    }
  })
    return responseData
}

  




  export const PatientService = {
    getAllPatientFromDB,
    getPatientByIdFromDB,
    updatePatientIntoDB
   
  };