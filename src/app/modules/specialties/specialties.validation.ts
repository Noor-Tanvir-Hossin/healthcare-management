import { z } from "zod";

const create = z.object({
    title: z.string().min(1, "Title is required!")
  });

export const SpecialtiesValidtaion = {
    create
}