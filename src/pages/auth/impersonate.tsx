import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Tooltip, Typography } from '@material-tailwind/react'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import { impersonate } from 'api/queries'

import { LogoSVG } from '../../assets/icons/LogoSVG'

function Impersonate() {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleImpersonate = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { accessToken } = await impersonate(phone)
      localStorage.setItem('accessToken', accessToken)
      navigate('/', { state: { accessToken } })
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\+?\d*$/.test(value)) {
      setPhone(value)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-xs rounded bg-white p-8 shadow-md">
        <div className="mb-4 flex justify-center">
          <LogoSVG />
        </div>
        <h1 className="mb-2 text-center text-xl font-semibold">Impersonate</h1>
        <form className="space-y-4" onSubmit={handleImpersonate}>
          <div>
            <div className="flex justify-center">
              <label
                htmlFor="phone"
                className="text-center text-sm font-medium text-gray-700"
              >
                Masukkan nomor handphone untuk impersonation
              </label>
              <Tooltip
                className="border border-blue-gray-100 bg-white px-4 py-3 shadow shadow-black/10"
                content={
                  <div className="w-60">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal opacity-80"
                    >
                      nomor HP pengguna yang ingin di-impersonate
                    </Typography>
                  </div>
                }
              >
                <QuestionMarkCircleIcon className="ml-1 h-5 w-5 text-slate-500" />
              </Tooltip>
            </div>
            <input
              inputMode="tel"
              type="text"
              id="phone"
              name="phone"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Impersonate'}
          </Button>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </div>
  )
}

export default Impersonate
