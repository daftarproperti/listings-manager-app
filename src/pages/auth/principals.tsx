import { Typography, Input, Button } from '@material-tailwind/react'
import { ClipboardIcon } from '@heroicons/react/24/solid'
import { useGetUserProfile, impersonate } from 'api/queries'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate, useHref } from 'react-router-dom'

function Principals() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const { data: userProfile } = useGetUserProfile()
  const delegateRequestLink =
    window.location.origin +
    useHref('/delegate/assign/') +
    (userProfile?.phoneNumber ?? '')
  const navigate = useNavigate()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(delegateRequestLink).then(() => {
      toast('Link telah disalin', { type: 'info' })
    })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    // Allow only digits and the "+" sign
    const regex = /^[+0-9]*$/

    if (regex.test(value)) {
      setPhoneNumber(value)
    }
  }

  const handleImpersonate = async (event: React.FormEvent) => {
    try {
      event.preventDefault()
      const { accessToken } = await impersonate(phoneNumber)
      localStorage.setItem('accessToken', accessToken)

      navigate('/', { state: { accessToken } })

      //refresh
      navigate(0)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { type: 'error' })
      } else {
        toast.error('An unexpected error occurred. Please try again.', {
          type: 'error',
        })
      }
    }
  }

  return (
    <div className="min-h-dvh">
      <div className="w-full bg-slate-100 pb-20 pt-16 lg:pb-4 lg:pt-0">
        <div className="sticky top-0 z-10 hidden items-center justify-between border-b bg-white p-4 pt-8 lg:flex">
          <Typography variant="h5">Principals</Typography>
        </div>

        <div className="border-b border-slate-300 px-4 py-3">
          <div className="relative mt-2 inline-flex w-1/2 items-center">
            <Input
              label="Link untuk permintaan delegasi:"
              autoComplete="off"
              value={delegateRequestLink}
              readOnly
              crossOrigin={undefined}
              className="w-full"
            />
            <button
              onClick={copyToClipboard}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
            >
              <ClipboardIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-4 lg:w-4/5">
          <form
            onSubmit={handleImpersonate}
            className="mb-2 flex max-w-md items-center gap-2"
          >
            <Input
              inputMode="tel"
              label="Nomor Handphone Principal"
              autoComplete="off"
              placeholder="Ketik nomor HP"
              value={phoneNumber}
              onChange={handleInputChange}
              crossOrigin={undefined}
            />

            <Button type="submit" color="blue" className="shrink-0">
              Impersonate
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Principals
