import { Tooltip, Typography } from '@material-tailwind/react'

const AddressTooltip = () => {
  const AddressExplanation = () => (
    <div className="max-w-80">
      <div className="prose text-sm text-slate-700 opacity-80 prose-li:my-0">
        <p>
          Daftar Properti bukanlah papan iklan, melainkan tempat pendaftaran
          properti-properti di pasar secara transparan.
        </p>
        <p>Kriteria sebuah alamat disebut lengkap:</p>
        <ul>
          <li>dapat menerima surat/paket</li>
          <li>dapat memproteksi anda agar listing lain tidak duplikat</li>
        </ul>
      </div>
    </div>
  )
  return (
    <Tooltip
      className="border border-blue-gray-100 bg-white px-4 py-3 shadow shadow-black/10"
      content={<AddressExplanation />}
    >
      <Typography variant="small" className="select-none underline">
        Mengapa perlu alamat lengkap?
      </Typography>
    </Tooltip>
  )
}

export default AddressTooltip
