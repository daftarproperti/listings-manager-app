import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetListingDetail } from 'api/queries'
import { type ClosingStatus, type Closing } from 'api/types'
import { formatCurrencyToIDRText, formatDate, getClosingStatus } from 'utils'
import BottomStickyButton from 'components/button/BottomStickyButton'

import { CLOSING_TYPE_ENUM } from '../edit/dummy'

const ClosingDetailListingPage = () => {
  const { id, closingId } = useParams() as { id: string; closingId: string }
  const { data } = useGetListingDetail({ id })
  const [dataClosing, setDataClosing] = useState<Closing | null>(null)

  useEffect(() => {
    if (data && data.closings) {
      const closingDetail = data.closings.find(
        (closing) => closing.id === closingId,
      )
      setDataClosing(closingDetail || null)
    }
  }, [data, closingId])

  return (
    <div className="flex min-h-dvh flex-col break-words bg-slate-100 pt-16 lg:pt-0">
      <div className="sticky top-0 z-10 hidden items-center justify-between border-b bg-white p-4 pt-8 lg:flex">
        <div className="text-xl font-semibold">Rincian Closing</div>
      </div>
      <div className="flex flex-col">
        <table className="m-4 max-w-lg table-auto text-sm">
          <tbody>
            {dataClosing ? (
              <>
                <tr>
                  <td className="w-1/3 min-w-24 align-top">Closing ID</td>
                  <td>: {dataClosing.id}</td>
                </tr>
                <tr>
                  <td className="w-1/3 min-w-24 align-top">Nama</td>
                  <td>: {dataClosing.clientName}</td>
                </tr>
                <tr>
                  <td className="w-1/3 min-w-24 align-top">No. HP</td>
                  <td>: {dataClosing.clientPhoneNumber}</td>
                </tr>
                <tr>
                  <td className="w-1/3 min-w-24 align-top">Tipe Closing</td>
                  <td>
                    :{' '}
                    {dataClosing.closingType &&
                      CLOSING_TYPE_ENUM[dataClosing.closingType]}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 min-w-24 align-top">Nilai Transaksi</td>
                  <td>
                    : {formatCurrencyToIDRText(dataClosing.transactionValue)}
                  </td>
                </tr>
                <tr>
                  <td className="w-1/3 min-w-24 align-top">Tanggal</td>
                  <td>: {formatDate(dataClosing.date)}</td>
                </tr>
                <tr>
                  <td className="w-1/3 min-w-24 align-top">Status</td>
                  <td>
                    : {getClosingStatus(dataClosing.status as ClosingStatus)}
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <td>Loading or No Data Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="lg:hidden">
        <BottomStickyButton onClick={() => window.history.back()}>
          Kembali
        </BottomStickyButton>
      </div>
    </div>
  )
}

export default ClosingDetailListingPage
