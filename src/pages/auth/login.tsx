import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@material-tailwind/react'
import { sendOTP } from 'api/queries'

import { LogoSVG } from '../../assets/icons/LogoSVG'

function Login() {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { token, timestamp } = await sendOTP(phone)
      navigate('/verify', { state: { phone, token, timestamp } })
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
        <h1 className="mb-2 text-center text-xl font-semibold">
          Masuk / daftar akun dulu
        </h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Masukkan dengan nomor HP
            </label>
            <input
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
            {loading ? 'Loading...' : 'Masuk atau daftar'}
          </Button>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        <p className="mt-4 text-center text-sm text-gray-500">
          Dengan masuk atau mendaftar, saya menyetujui{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Syarat dan Ketentuan
          </a>{' '}
          serta{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Kebijakan Privasi
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
