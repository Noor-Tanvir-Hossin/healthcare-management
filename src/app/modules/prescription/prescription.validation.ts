import { z } from 'zod';

const create = z.object({
    body: z.object({
    appointmentId: z.string({error: "Appointment Id must be a string"}).min(1, "Appointment Id is required!"),
    instructions: z.string({error: "instructions must be a string"}).min(1, "instructions is required!")
    })
  });

export const PrescriptionValidation = {
    create,
};