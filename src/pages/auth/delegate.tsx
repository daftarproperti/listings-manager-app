import { Typography } from '@material-tailwind/react'
import { useGetUserProfile, useGetDelegateUserProfile } from 'api/queries'
import WhatsAppLinkContact from 'components/WhatsAppLinkContact'

function Delegate() {
  const { data: userProfile } = useGetUserProfile()
  const { data: delegateProfile } = useGetDelegateUserProfile(
    userProfile?.delegatePhone || '',
  )

  return (
    <div className="min-h-dvh">
      <div className="w-full bg-slate-100 pb-20 pt-16 lg:pb-4 lg:pt-0">
        <div className="sticky top-0 z-10 hidden items-center justify-between border-b bg-white p-4 pt-8 lg:flex">
          <Typography variant="h5">Delegate</Typography>
        </div>
        {delegateProfile ? (
          <div className="p-4 lg:w-4/5">
            <Typography variant="h6" className="mb-2">
              Delegasi Aktif: {delegateProfile.name} (
              {delegateProfile.phoneNumber})
            </Typography>
            <Typography variant="small" className="mb-2">
              {delegateProfile.name} dapat mengelola Listing atas nama anda di
              Daftar Properti.
            </Typography>
            <Typography variant="small" className="mb-4">
              Untuk mengubah atau menghapus akses delegasi,{' '}
              <WhatsAppLinkContact />.
            </Typography>
          </div>
        ) : (
          <div className="p-4 lg:w-4/5">
            <Typography variant="h6" className="mb-2">
              Tidak ada delegasi aktif
            </Typography>
            <Typography variant="small" className="mb-2">
              <WhatsAppLinkContact /> untuk mendapatkan bantuan delegasi
              pengelola listing atas nama anda.
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
}

export default Delegate
