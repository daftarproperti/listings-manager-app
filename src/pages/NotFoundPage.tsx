import { useNavigate } from 'react-router-dom'
import ButtonChip from 'components/button/ButtonChip'

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <div className="h-screen bg-slate-100 px-4 pt-24 text-center">
      <h1 className="mb-6 text-lg font-semibold leading-3">404</h1>
      <div className="mb-6 text-sm">
        <p>Maaf halaman yang Anda cari tidak ditemukan.</p>
        <p>Silahkan kembali ke halaman utama.</p>
      </div>
      <div className="flex items-center justify-center">
        <ButtonChip
          text="Kembali ke Halaman Utama"
          isActive
          onClick={() => navigate('/')}
          className="inline-block"
        />
      </div>
    </div>
  )
}

export default NotFoundPage
