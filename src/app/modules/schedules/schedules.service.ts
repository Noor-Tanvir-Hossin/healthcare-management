import { addHours, addMinutes, format } from "date-fns";
import prisma from "./../../../shared/prisma";
import { IFilterRequest } from "./schedules.interface";
import { IPaginationOptions } from "../../interface/pagination";
import { IAuthUser } from "../../interface/common";
import { paginationHelpar } from "../../../helpars/paginationHelpar";
import { Prisma } from "@prisma/client";

const convertDateTime = async (date: Date) => {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + offset);
};

const insertSchedulesIntoDB = async (payload: any) => {
  const { startDate, endDate, startTime, endTime } = payload;

  const intervalTime = 30;
  const schedules = [];

  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0])
        ),
        Number(startTime.split(":")[1])
      )
    );

    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(lastDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0])
        ),
        Number(endTime.split(":")[1])
      )
    );

    while (startTime < endDateTime) {
      const s = await convertDateTime(startDateTime);
      const e = await convertDateTime(addMinutes(startDateTime, intervalTime));

      const scheduleData = {
        startDateTime: s,
        endDateTime: e,
      };

      const existingSchedule = await prisma.schedule.findFirst({
        where: {
          startDateTime: scheduleData.startDateTime,
          endDateTime: scheduleData.endDateTime,
        },
      });

      if (!existingSchedule) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });
        schedules.push(result);
      }
      startDateTime.setMinutes(startDateTime.getMinutes() + intervalTime);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules;
};


const getAllFromDB = async (
  filters: IFilterRequest,
  options: IPaginationOptions,
  user: IAuthUser
) => {
  const { limit, page, skip } = paginationHelpar.calculatePagination(options);
  const { startDate, endDate, ...filterData } = filters;

  const andConditions = [];

  if (startDate && endDate) {
      andConditions.push({
          AND: [
              {
                  startDateTime: {
                      gte: startDate
                  }
              },
              {
                  endDateTime: {
                      lte: endDate
                  }
              }
          ]
      })
  };


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

  const whereConditions: Prisma.ScheduleWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};

  const doctorSchedules = await prisma.doctorSchedules.findMany({
      where: {
          doctor: {
              email: user?.email
          }
      }
  });

  const doctorScheduleIds = doctorSchedules.map(schedule => schedule.scheduleId);
  console.log(doctorScheduleIds)

  const result = await prisma.schedule.findMany({
      where: {
          ...whereConditions,
          id: {
              notIn: doctorScheduleIds
          }
      },
      skip,
      take: limit,
      orderBy:
          options.sortBy && options.sortOrder
              ? { [options.sortBy]: options.sortOrder }
              : {
                  createdAt: 'desc',
              }
  });
  const total = await prisma.schedule.count({
      where: {
          ...whereConditions,
          id: {
              notIn: doctorScheduleIds
          }
      },
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





export const ScheduleService = {
  insertSchedulesIntoDB,
  getAllFromDB
};
