import { z } from 'zod'

export const addEditFormSchema = z.object({
  address: z.string(),
  bathroomCount: z.string().or(z.number()),
  bedroomCount: z.string().or(z.number()),
  buildingSize: z.string().or(z.number()),
  carCount: z.string().or(z.number()),
  city: z.string(),
  contacts: z
    .object({
      name: z.string().nullable(),
      phoneNumber: z.string().or(z.number()).nullable(),
      provider: z.string().nullable(),
    })
    .optional(),
  description: z.string(),
  electricPower: z.string().or(z.number()),
  facing: z.string(),
  floorCount: z.string().or(z.number()),
  isPrivate: z.boolean(),
  lotSize: z.string().or(z.number()),
  ownership: z.string(),
  pictureUrls: z.instanceof(FileList).optional().nullable(),
  price: z
    .string()
    .transform((val) => Number(val.replace(/\D/g, '')))
    .or(z.number()),
  title: z.string(),
})
