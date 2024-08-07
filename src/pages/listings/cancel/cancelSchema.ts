import { z } from 'zod'

const mustContainValueRefine = (value: string | number) => {
  if (typeof value === 'number') {
    return true
  } else {
    return value.trim() !== ''
  }
}

export const cancelSchema = z.object({
  reason: z.string().refine(mustContainValueRefine, {
    message: `Pesan harus diisi`,
  }),
})
