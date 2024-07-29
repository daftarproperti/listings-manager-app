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

export const closingSchema = z.object({
  closingType: z.string().refine(mustContainValueRefine, {
    message: `Tipe harus diisi`,
  }),
  clientName: z.string().refine(mustContainValueRefine, {
    message: `Nama harus diisi`,
  }),
  clientPhoneNumber: z
    .string()
    .refine(mustContainValueRefine, {
      message: 'No HP harus diisi',
    })
    .refine((value) => /^(\+[1-9]\d{1,14}|0\d{5,14})$/.test(value ?? ''), {
      message: 'No HP tidak valid',
    }),
  date: z.string().refine(mustContainValueRefine, {
    message: 'Tanggal harus diisi',
  }),
  transactionValue: z
    .any()
    .or(z.string())
    .or(z.number())
    .transform((val) => Number(String(val).replace(/\D/g, '')))
    .refine(mustContainValueRefine, {
      message: `Harga transaksi harus diisi`,
    })
    .refine(mustContainNumberMoreThanZeroRefine, {
      message: `Harga transaksi harus diisi angka lebih dari 0`,
    }),
})
