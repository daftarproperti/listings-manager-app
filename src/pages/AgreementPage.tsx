import { Typography } from '@material-tailwind/react'
import { useGetUserProfile } from 'api/queries'

function Agreement() {
  const { data: userProfile } = useGetUserProfile()

  return (
    <div className="min-h-dvh">
      <div className="w-full bg-slate-100 pt-16 lg:pb-4 lg:pt-0">
        <div className="m-3 rounded-lg border-b border-slate-300 bg-white p-3 font-times shadow-md md:m-6 md:p-6">
          <h1 className="mb-6 text-center text-2xl font-bold">
            Persetujuan Pendaftaran Daftar Properti
          </h1>
          <p className="mb-6 text-justify">
            Dengan mendaftarkan suatu Listing di Daftar Properti, maka pendaftar
            dan Daftar Properti menyetujui hal-hal yang dicantumkan di dokumen
            ini.
          </p>

          <h2 className="mb-4 text-xl font-bold">Pihak yang Menandatangani</h2>
          <p className="mb-6 text-justify">
            Dengan ini, Pendaftar (&ldquo;Pihak Pertama&rdquo;) menyetujui
            ketentuan-ketentuan yang berlaku dalam pendaftaran properti di
            Daftar Properti (&ldquo;Pihak Kedua&rdquo;), sebagaimana diatur
            dalam persetujuan ini.
          </p>

          <h2 className="mb-4 text-xl font-bold">1. Pernyataan Pendaftar</h2>
          <ol className="mb-6 list-decimal space-y-2 pl-6 text-justify">
            <li>
              Pihak Pertama adalah pemilik sah dari properti yang didaftarkan
              atau adalah agen/perantara yang memiliki hubungan langsung dengan
              pemilik properti tersebut.
            </li>
            <li>
              Informasi yang disampaikan mengenai properti adalah benar, akurat,
              dan tidak menyesatkan.
            </li>
            <li>
              Pihak Pertama setuju bahwa apabila properti laku (terjual atau
              tersewa), maka Pihak Pertama akan membayar komisi sebesar 0,5%
              dari harga penjualan (untuk penjualan) atau 1% dari total sewa
              (untuk penyewaan) kepada Pemasar yang berhasil merujuk properti
              tersebut, sebagaimana ditentukan oleh Pihak Kedua.
            </li>
            <li>
              Pihak Pertama diwajibkan melaporkan kepada Daftar Properti apabila
              properti yang didaftarkan tidak lagi aktif atau tersedia di pasar.
            </li>
            <li>
              Ketika properti laku (terjual atau tersewa), Pihak Pertama
              berkewajiban untuk melaporkan informasi penutupan transaksi dengan
              benar agar Daftar Properti dapat secara adil menentukan siapa
              Pemasar yang menjadi penghubung menggunakan teknologi Referral
              Tracking. Melaporkan transaksi dengan benar akan memberikan
              manfaat bagi Pihak Pertama, karena informasi penjualan yang
              terlapor akan menjadi informasi publik yang dapat meningkatkan
              nilai properti di masa mendatang.
            </li>
            <li>
              Pihak Pertama akan membayar komisi secara langsung kepada Pemasar
              yang ditentukan oleh Daftar Properti, bukan kepada Daftar
              Properti. Daftar Properti tetap akan memantau dan menegakkan
              kewajiban pembayaran ini meskipun pembayaran dilakukan langsung
              kepada Pemasar.
            </li>
          </ol>

          <h2 className="mb-4 text-xl font-bold">
            2. Pernyataan Daftar Properti
          </h2>
          <ol className="mb-6 list-decimal space-y-2 pl-6 text-justify">
            <li>
              Setiap properti yang didaftarkan akan dilindungi untuk pendaftar
              pertama. Artinya, jika ada agen atau pemilik lain yang mencoba
              mendaftarkan properti yang sama, pendaftaran tersebut tidak akan
              diterima. Hal ini dilakukan agar Pihak Pertama dihargai atas
              transparansi dan segala pertanyaan mengenai properti tersebut akan
              diteruskan kepada Pihak Pertama, baik sebagai pemilik maupun agen.
            </li>
            <li>
              Pengecualian hanya berlaku apabila ada pengaduan dari pemilik
              properti terkait kurangnya upaya dari agen untuk mempertahankan
              kualitas listing.
            </li>
            <li>
              Daftar Properti akan memberitahukan seluruh jaringan Pemasar
              mengenai penambahan atau perubahan pada listing, memastikan bahwa
              informasi tersebar dengan cepat dan efisien.
            </li>
            <li>
              Informasi mengenai listing dan penutupan transaksi akan
              dipublikasikan untuk memastikan efisiensi pasar. Namun, Daftar
              Properti menjamin privasi Pihak Pertama dengan tidak menyertakan
              nomor telepon dalam catatan yang tersedia untuk publik.
            </li>
          </ol>

          <h2 className="mb-4 text-xl font-bold">3. Penandatanganan</h2>
          <p className="mb-6 text-justify">
            Dengan menandatangani perjanjian ini, Pihak Pertama menyetujui semua
            ketentuan di atas dan menyatakan kesediaan untuk tunduk dan patuh
            pada perjanjian ini.
          </p>

          <div className="mt-8 space-y-4">
            <div>
              <p className="font-bold">Tanggal:</p>
              <div className="mt-2 border-b border-gray-400"></div>
            </div>
            <div>
              <p className="font-bold">Nama Pendaftar: {userProfile?.name}</p>
              <div className="mt-2 border-b border-gray-400"></div>
            </div>
            <div>
              <p className="font-bold">Tanda Tangan Pendaftar:</p>
              <div className="mt-2 border-b border-gray-400"></div>
            </div>
            <div>
              <p className="font-bold">Tanda Tangan Daftar Properti:</p>
              <div className="mt-2 border-b border-gray-400"></div>
            </div>
          </div>
        </div>
        <div className="m-3 text-center font-times md:m-6">
          <Typography variant="small" className="italic">
            Agreement Version 1
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default Agreement
