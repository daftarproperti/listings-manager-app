import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@material-tailwind/react'
import { verifyOTP, sendOTP } from 'api/queries'

import { LogoSVG } from '../../assets/icons/LogoSVG'

function Verify() {
  const location = useLocation()
  const navigate = useNavigate()
  const { phone, token, timestamp } = location.state || {
    phone: 'Unknown',
    token: '',
    timestamp: 0,
  }
  const [verificationCode, setVerificationCode] = useState('')
  const [resendTimer, setResendTimer] = useState(60)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleVerify = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { accessToken } = await verifyOTP(
        phone,
        token,
        timestamp,
        verificationCode,
      )
      sessionStorage.setItem('accessToken', accessToken)
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

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      setVerificationCode(value)
    }
  }

  const handleResendCode = async () => {
    setError(null)
    setLoading(true)

    try {
      await sendOTP(phone)
      setResendTimer(60)
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-xs rounded bg-white p-8 shadow-md">
        <div className="mb-4 flex justify-center">
          <LogoSVG />
        </div>
        <h1 className="mb-2 text-center text-xl font-semibold">
          Verifikasi nomor kamu
        </h1>
        <p className="mb-4 text-center text-gray-600">
          Kode verifikasi dikirim via Whatsapp atau SMS ke nomor aktif kamu di
          <br />
          <strong>{phone}</strong>
        </p>
        <form className="space-y-4" onSubmit={handleVerify}>
          <div>
            <label
              htmlFor="verificationCode"
              className="block text-sm font-medium text-gray-700"
            >
              Masukkan kode verifikasi
            </label>
            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              value={verificationCode}
              onChange={handleVerificationCodeChange}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Verifikasi'}
          </Button>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        <p className="mt-4 text-center text-sm text-gray-500">
          Kirim ulang kode? ({resendTimer})
          {resendTimer === 0 && (
            <button
              onClick={handleResendCode}
              className="text-blue-600 hover:underline"
            >
              Klik di sini
            </button>
          )}
        </p>
        <p className="mt-2 text-center text-sm text-gray-500">
          Mau{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:underline"
          >
            Ganti nomor
          </button>
          ?
        </p>
      </div>
    </div>
  )
}

export default Verify
