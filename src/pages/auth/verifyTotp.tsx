import { useEffect } from 'react'
import { Button } from '@material-tailwind/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { LogoSVG } from 'assets/icons'
import { type VerifyTOTPReq } from 'api/types'
import { sendOTP, useVerifyTOTP } from 'api/queries'

function VerifyTotp() {
  const location = useLocation()
  const navigate = useNavigate()
  const { phone } = location.state || { phone: 'Unknown' }
  const { mutate, data, status, error } = useVerifyTOTP()
  const { setValue, watch, handleSubmit } = useForm<VerifyTOTPReq>({
    defaultValues: { phoneNumber: phone, totpCode: '' },
    mode: 'onChange',
  })

  const handleTotpCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*$/.test(value)) {
      setValue('totpCode', value)
    }
  }

  const handleSendOTP = async () => {
    const { token, timestamp } = await sendOTP({ phoneNumber: phone }, true)
    navigate('/verify', { state: { phone, token, timestamp } })
  }

  useEffect(() => {
    if (!data?.accessToken) return
    const { accessToken } = data
    localStorage.setItem('accessToken', accessToken)
    navigate('/', { state: { accessToken } })
  }, [data, navigate])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-xs rounded bg-white p-8 shadow-md">
        <div className="mb-4 flex justify-center">
          <LogoSVG />
        </div>
        <h1 className="mb-2 text-center text-xl font-semibold">
          Verifikasi kode authenticator
        </h1>
        <p className="mb-4 text-center text-gray-600">
          Masukkan kode dari authenticator app dengan nomor aktif
          <br />
          <strong>{phone}</strong>
        </p>
        <form
          className="space-y-4"
          onSubmit={handleSubmit((data) => {
            mutate(data)
          })}
        >
          <div>
            <label
              htmlFor="totpCode"
              className="block text-sm font-medium text-gray-700"
            >
              Masukkan kode verifikasi
            </label>
            <input
              autoComplete="off"
              required
              type="text"
              id="totpCode"
              name="totpCode"
              value={watch('totpCode')}
              onChange={handleTotpCodeChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            disabled={status === 'pending'}
          >
            {status === 'pending' ? 'Loading...' : 'Verifikasi'}
          </Button>
          {error && (
            <p className="text-center text-sm text-red-500">{error.message}</p>
          )}
          <p className="block text-center text-sm text-gray-500">
            Kirim OTP via WA?{' '}
            {
              <button
                onClick={handleSendOTP}
                className="text-blue-600 hover:underline"
              >
                Klik di sini
              </button>
            }
          </p>
        </form>
      </div>
    </div>
  )
}

export default VerifyTotp
