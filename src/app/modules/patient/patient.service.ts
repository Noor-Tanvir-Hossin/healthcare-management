import { Prisma } from "@prisma/client";
import { paginationHelpar } from "../../../helpars/paginationHelpar";
import { IPaginationOptions } from "../../interface/pagination";
import { patientSearchableFields } from "./patient.constant";
import { IPatientFilterRequest } from "./patient.interface";
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
        MedicalReport: true,
        PatientHealthData: true,
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




  export const PatientService = {
    getAllPatientFromDB,
   
  };