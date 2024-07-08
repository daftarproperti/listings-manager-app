import { z } from 'zod'

const mustContainValueRefine = (value: string | number) => {
  if (typeof value === 'number') {
    return true
  } else {
    return value.trim() !== ''
  }
}

const mustContainNumberMoreThanZeroRefine = (value: string | number) => {
  // Check if the value is a string or a number
  const stringValue = typeof value === 'number' ? String(value) : value

  // Check if the string contains a number and it's greater than zero
  const parsedValue = parseFloat(stringValue)
  return !isNaN(parsedValue) && parsedValue > 0
}

const mustContainNumberRefine = (value: string | number) => {
  // Check if the value is a string or a number
  const stringValue = typeof value === 'number' ? String(value) : value

  // Check if the string contains a number and it's greater than zero
  const parsedValue = parseFloat(stringValue)
  return !isNaN(parsedValue)
}

const mustContainNumberOrEmptyRefine = (value: string | number) => {
  if (!value) {
    return true
  }
  // Check if the value contain letters
  if (typeof value === 'string' && isNaN(Number(value))) {
    return false
  }

  return mustContainNumberRefine(value)
}

const getOptionalField = (fieldName?: string) => ({
  string: z.string().optional().nullable(),
  number: z
    .string()
    .or(z.number())
    .refine(mustContainNumberOrEmptyRefine, {
      message: `${fieldName} harus berupa angka`,
    })
    .optional()
    .nullable(),
  picture: z
    .array(z.union([z.instanceof(File), z.string()]))
    .or(z.instanceof(FileList))
    .optional()
    .nullable(),
})

const getMandatoryField = (fieldName: string) => ({
  string: z.string().refine(mustContainValueRefine, {
    message: `${fieldName} harus diisi`,
  }),
  numberMoreThanZero: z
    .string()
    .or(z.number())
    .refine(mustContainValueRefine, {
      message: `${fieldName} harus diisi`,
    })
    .refine(mustContainNumberMoreThanZeroRefine, {
      message: `${fieldName} harus diisi angka lebih dari 0`,
    }),
  number: z
    .string()
    .or(z.number())
    .refine(mustContainValueRefine, {
      message: `${fieldName} harus diisi`,
    })
    .refine(mustContainNumberRefine, {
      message: `${fieldName} harus berupa angka`,
    }),
  price: z
    .any()
    .or(z.string())
    .or(z.number())
    .transform((val) => Number(String(val).replace(/\D/g, '')))
    .refine(mustContainValueRefine, {
      message: `${fieldName} harus diisi`,
    })
    .refine(mustContainNumberMoreThanZeroRefine, {
      message: `${fieldName} harus diisi angka lebih dari 0`,
    }),
})

export const baseFormSchema = z.object({
  title: getMandatoryField('Judul Listing').string,
  propertyType: getMandatoryField('Tipe Properti').string,
  listingForSale: z.boolean(),
  listingForRent: z.boolean(),
  address: getMandatoryField('Alamat').string,
  bathroomCounts: getOptionalField('Kamar Mandi').string,
  bedroomCounts: getOptionalField('Kamar Tidur').string,
  buildingSize: getOptionalField('Luas Bangunan').number,
  carCount: getOptionalField('Kapasitas Mobil').number,
  cityId: getOptionalField('Kota').number,
  description: getMandatoryField('Deskripsi').string,
  electricPower: getOptionalField('Daya Listrik').number,
  facing: getOptionalField().string,
  floorCount: getOptionalField('Lantai').number,
  lotSize: getOptionalField('Luas Tanah').number,
  ownership: getMandatoryField('Sertifikat').string,
  pictureUrls: getOptionalField().picture,
  isPrivate: z.boolean(),
  withRewardAgreement: z.boolean().refine((val) => val === true, {
    message: 'Persetujuan Imbalan harus disetujui',
  }),
  price: getOptionalField('Harga Jual').number,
  rentPrice: getOptionalField('Harga Sewa').number,
  coordinate: z
    .object({
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    })
    .optional(),
})

export const schema = baseFormSchema.superRefine((data, ctx) => {
  type DataType = z.infer<typeof baseFormSchema>
  type MandatoryFieldsType = {
    code: keyof DataType
    name: string
    canbeZero?: boolean
  }

  // Check listing type and add errors to respective fields
  if (
    data.listingForSale &&
    (!data.price || !/\d/.test(data.price.toString()))
  ) {
    ctx.addIssue({
      path: ['price'],
      message: 'Harga Jual harus diisi untuk listing jual',
      code: z.ZodIssueCode.custom,
    })
  }
  if (
    data.listingForRent &&
    (!data.rentPrice || !/\d/.test(data.rentPrice.toString()))
  ) {
    ctx.addIssue({
      path: ['rentPrice'],
      message: 'Harga Sewa harus diisi untuk listing sewa',
      code: z.ZodIssueCode.custom,
    })
  }
  if (!data.listingForSale && !data.listingForRent) {
    ctx.addIssue({
      path: ['listingType', 'listingForSale', 'listingForRent'],
      message: 'Harus memilih minimal satu tipe listing',
      code: z.ZodIssueCode.custom,
    })
  }

  const checkMandatoryFields = (mandatoryFields: MandatoryFieldsType[]) => {
    mandatoryFields.forEach((field) => {
      if (!data[field.code]) {
        ctx.addIssue({
          path: [field.code],
          message: `${field.name} harus diisi`,
          code: z.ZodIssueCode.custom,
        })
      }
      if (
        !field.canbeZero &&
        (data[field.code] === 0 || data[field.code] === '0')
      ) {
        ctx.addIssue({
          path: [field.code],
          message: `${field.name} tidak boleh 0`,
          code: z.ZodIssueCode.custom,
        })
      }
    })
  }

  switch (data.propertyType) {
    case 'apartment':
      checkMandatoryFields([
        { code: 'buildingSize', name: 'Luas Bangunan' },
        { code: 'bathroomCounts', name: 'Kamar Mandi', canbeZero: true },
        { code: 'bedroomCounts', name: 'Kamar Tidur', canbeZero: true },
        { code: 'facing', name: 'Arah Bangunan' },
      ])
      break
    case 'land':
      checkMandatoryFields([{ code: 'lotSize', name: 'Luas Tanah' }])
      break
    case 'warehouse':
      checkMandatoryFields([
        { code: 'buildingSize', name: 'Luas Bangunan' },
        { code: 'lotSize', name: 'Luas Bangunan' },
      ])
      break
    default:
      checkMandatoryFields([
        { code: 'bathroomCounts', name: 'Kamar Mandi', canbeZero: true },
        { code: 'bedroomCounts', name: 'Kamar Tidur', canbeZero: true },
        { code: 'buildingSize', name: 'Luas Bangunan' },
        { code: 'floorCount', name: 'Lantai' },
        { code: 'lotSize', name: 'Luas Bangunan' },
      ])
      break
  }
})
