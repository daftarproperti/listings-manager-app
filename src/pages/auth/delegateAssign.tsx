import { Button, Typography } from '@material-tailwind/react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import WhatsAppLinkContact from 'components/WhatsAppLinkContact'
import {
  useGetUserProfile,
  useGetDelegateUserProfile,
  useUpdateUserProfile,
} from 'api/queries'
import { toast } from 'react-toastify'

function DelegateAssign() {
  const { phoneNumber } = useParams<string>()
  const { data: userProfile, refetch: refetchUserProfile } = useGetUserProfile()
  const { data: delegateProfile } = useGetDelegateUserProfile(phoneNumber || '')
  const { mutate: updateUserProfile } = useUpdateUserProfile()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isCurrentDelegate =
    userProfile?.delegatePhone === delegateProfile?.phoneNumber

  const delegateIdentity = delegateProfile
    ? `${delegateProfile.name} (${delegateProfile.phoneNumber})`
    : ''

  const anotherDelegateExists =
    userProfile?.delegatePhone &&
    userProfile?.delegatePhone !== delegateProfile?.phoneNumber

  const isDelegateEligible =
    delegateProfile?.phoneNumber &&
    userProfile?.delegatePhone !== delegateProfile?.phoneNumber &&
    !userProfile?.isDelegateEligible

  const assignDelegation = async () => {
    try {
      setIsSubmitting(true)

      const userData = new FormData()
      userData.append('setDelegate', 'true')
      userData.append('delegatePhone', phoneNumber as string)

      updateUserProfile(
        { userData },
        {
          onSuccess: () => {
            refetchUserProfile()
          },
          onError: (response) => {
            toast(response.message, { type: 'error' })
            setIsSubmitting(false)
            refetchUserProfile()
          },
        },
      )
    } catch (error) {
      toast((error as Error).message, { type: 'error' })
      setIsSubmitting(false)
      refetchUserProfile()
    }
  }

  return (
    <div className="min-h-screen">
      <div className="w-full bg-slate-100 pb-20 pt-16 lg:pb-4 lg:pt-0">
        <div className="sticky top-0 z-10 hidden items-center justify-between border-b bg-white p-4 pt-8 lg:flex">
          <Typography variant="h5">Delegasi Akses Kelola Listing</Typography>
        </div>

        <div className="p-4 lg:w-4/5">
          {isDelegateEligible &&
          !isCurrentDelegate &&
          !anotherDelegateExists ? (
            <>
              <Typography variant="small" className="mb-2">
                Anda akan memberi akses kepada {delegateIdentity} untuk
                mengelola Listing anda.
              </Typography>
              <Typography variant="small" className="mb-2">
                Jika diberi akses, maka {delegateProfile?.name} akan bisa
                mengelola Listing atas nama anda.
              </Typography>
              <Button
                color="blue"
                onClick={assignDelegation}
                disabled={isSubmitting}
              >
                Beri Akses
              </Button>
            </>
          ) : isCurrentDelegate ? (
            <Typography variant="small" className="mb-2">
              {delegateIdentity} sudah menjadi delegasi aktif untuk mengelola
              Listing anda.
            </Typography>
          ) : anotherDelegateExists ? (
            <Typography variant="small" className="mb-2">
              Anda sudah mempunyai delegasi lain.
              <br />
              <WhatsAppLinkContact /> untuk mengganti akses delegasi.
            </Typography>
          ) : (
            <Typography variant="small" className="mb-2">
              {phoneNumber} tidak bisa didelegasikan.
              <br />
              <WhatsAppLinkContact /> untuk informasi lebih lanjut.
            </Typography>
          )}
        </div>
      </div>
    </div>
  )
}

export default DelegateAssign
