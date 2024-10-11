import { Typography } from '@material-tailwind/react'
import { type ReactNode } from 'react'

const InputLabel = ({ label }: { label: ReactNode }) => {
  return (
    <Typography variant="small" className="mb-1 font-semibold leading-6">
      {label}
    </Typography>
  )
}

export default InputLabel
