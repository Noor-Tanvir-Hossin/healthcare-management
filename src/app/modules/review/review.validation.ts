import { z } from 'zod';

const create = z.object({
    body: z.object({
        appointmentId: z.string({error: "Doctor Id must be a string"}).min(1, 'Appointment Id is required',),
        rating: z.string({error: "schedule Id must be a string"}).min(1, 'Rating is required',),
        comment: z.string({error: "Comment must be a string"}).min(1, 'Comment is required',),
        
    })
  });

export const ReviewValidation = {
    create,
};