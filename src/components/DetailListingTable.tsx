import { type Listing } from 'api/types'
import { getLabelForValue } from 'utils'

const DetailListingTable = ({ dataTable }: { dataTable: Listing }) => {
  return (
    <table>
      <tbody>
        {dataTable?.address && (
          <tr>
            <td className="w-1/3 min-w-24 align-top">Alamat</td>
            <td>: {dataTable?.address}</td>
          </tr>
        )}
        {dataTable?.cityName && (
          <tr>
            <td className="w-1/3 min-w-24 align-top">Kota</td>
            <td>: {dataTable?.cityName} </td>
          </tr>
        )}
        {dataTable?.facing && (
          <tr>
            <td className="w-1/3 min-w-24 align-top">Hadap</td>
            <td>: {getLabelForValue('facing', dataTable.facing)}</td>
          </tr>
        )}
        {dataTable?.electricPower && (
          <tr>
            <td className="w-1/3 min-w-24 align-top">Listrik</td>
            <td>
              : {getLabelForValue('electric_power', dataTable.electricPower)} V
            </td>
          </tr>
        )}
        {dataTable?.floorCount && (
          <tr>
            <td className="w-1/3 min-w-24 align-top">Lantai</td>
            <td>: {dataTable?.floorCount}</td>
          </tr>
        )}
        {dataTable?.carCount && (
          <tr>
            <td className="w-1/3 min-w-24 align-top">Kapasitas Mobil</td>
            <td>: {dataTable?.carCount}</td>
          </tr>
        )}
        {dataTable?.ownership && (
          <tr>
            <td className="w-1/3 min-w-24 align-top">Sertifikat</td>
            <td>: {getLabelForValue('ownership', dataTable.ownership)}</td>
          </tr>
        )}
        {dataTable?.isMultipleUnits && (
          <tr>
            <td className="w-1/3 min-w-24 align-top">Multiunit</td>
            <td>: {dataTable.isMultipleUnits ? 'Ya' : 'Tidak'}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default DetailListingTable
