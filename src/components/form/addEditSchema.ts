import { z } from 'zod'

export const addEditFormSchema = z.object({
  address: z.string().optional(),
  bathroomCount: z
    .string()
    .or(z.number())
    .refine((value) => String(value).length > 0),
  bedroomCount: z
    .string()
    .or(z.number())
    .refine((value) => String(value).length > 0),
  buildingSize: z
    .string()
    .or(z.number())
    .refine((value) => String(value).length > 0),
  carCount: z.string().or(z.number()).optional().nullable(),
  city: z.string().refine((value) => String(value).length > 0),
  contacts: z
    .object({
      name: z
        .string()
        .nullable()
        .refine((value) => !value || String(value).length > 0),
      phoneNumber: z
        .string()
        .or(z.number())
        .nullable()
        .refine((value) => !value || String(value).length > 0),
      provider: z
        .string()
        .nullable()
        .refine((value) => !value || String(value).length > 0),
    })
    .optional(),
  description: z.string().refine((value) => String(value).length > 0),
  electricPower: z.string().or(z.number()).optional().nullable(),
  facing: z.string().optional().nullable(),
  floorCount: z
    .string()
    .or(z.number())
    .refine((value) => String(value).length > 0),
  isPrivate: z.boolean().optional(),
  lotSize: z
    .string()
    .or(z.number())
    .refine((value) => String(value).length > 0),
  ownership: z.string().refine((value) => String(value).length > 0),
  pictureUrls: z
    .array(z.union([z.instanceof(File), z.string()]))
    .or(z.instanceof(FileList))
    .optional()
    .nullable(),
  price: z
    .string()
    .transform((val) => Number(val.replace(/\D/g, '')))
    .or(z.number())
    .refine((value) => String(value).length > 0),
  title: z.string().refine((value) => String(value).length > 0),
})
