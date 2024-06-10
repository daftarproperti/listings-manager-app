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

const priceSchema = z
  .union([getMandatoryField('Harga Jual').price, z.literal(false)])
  .transform((price) => (price === false ? undefined : price))

const rentPriceSchema = z
  .union([getMandatoryField('Harga Sewa').price, z.literal(false)])
  .transform((rentPrice) => (rentPrice === false ? undefined : rentPrice))

export const baseFormSchema = z.object({
  title: getMandatoryField('Judul Listing').string,
  propertyType: getMandatoryField('Tipe Properti').string,
  listingForSale: z.boolean(),
  listingForRent: z.boolean(),
  address: getMandatoryField('Alamat').string,
  bathroomCount: getMandatoryField('Kamar Mandi').number,
  bedroomCount: getMandatoryField('Kamar Tidur').number,
  buildingSize: getMandatoryField('Luas Bangunan').numberMoreThanZero,
  carCount: getOptionalField('Kapasitas Mobil').number,
  cityId: getOptionalField('Kota').number,
  description: getMandatoryField('Deskripsi').string,
  electricPower: getOptionalField('Daya Listrik').number,
  facing: getOptionalField().string,
  floorCount: getMandatoryField('Lantai').numberMoreThanZero,
  lotSize: getMandatoryField('Luas Tanah').numberMoreThanZero,
  ownership: getMandatoryField('Sertifikat').string,
  pictureUrls: getOptionalField().picture,
  isPrivate: z.boolean(),
  price: priceSchema,
})
export const getDynamicFormSchema = (
  listingForSale: boolean,
  listingForRent: boolean,
  propertyType: string,
) => {
  let schema = baseFormSchema

  if (listingForSale && listingForRent) {
    schema = schema.extend({
      price: priceSchema,
      rentPrice: rentPriceSchema,
    })
  } else if (listingForSale && !listingForRent) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    schema = schema
      .extend({
        price: priceSchema,
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .omit({ rentPrice: true })
  } else if (!listingForSale && listingForRent) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    schema = schema
      .extend({
        rentPrice: rentPriceSchema,
      })
      .omit({ price: true })
  }

  switch (propertyType) {
    case 'apartment':
      return schema.omit({
        lotSize: true,
        floorCount: true,
      })
    case 'land':
      return schema.omit({
        buildingSize: true,
        floorCount: true,
        bathroomCount: true,
        bedroomCount: true,
        electricPower: true,
        facing: true,
      })
    case 'warehouse':
      return schema.omit({
        bedroomCount: true,
        bathroomCount: true,
        floorCount: true,
      })
    default:
      return schema
  }
}

export type DynamicFormSchema = ReturnType<typeof getDynamicFormSchema>
