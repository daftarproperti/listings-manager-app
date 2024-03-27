import { type Property } from 'api/types'
import { LISTING_OPTIONS } from 'pages/listings/edit/dummy'

const DetailPropertyTable = ({ dataTable }: { dataTable: Property }) => {
  const getLabelForValue = (
    property: keyof typeof LISTING_OPTIONS,
    value: string | number,
  ) => {
    const options = LISTING_OPTIONS[property].options
    const option = options.find((option) => option.value === value)
    return option ? option.label : value
  }

  return (
    <table>
      <tbody>
        {dataTable?.address && (
          <tr>
            <td className="w-1/3 min-w-24 align-top">Alamat</td>
            <td>: {dataTable?.address}</td>
          </tr>
        )}
        {dataTable?.city && (
          <tr>
            <td className="w-1/3 min-w-24 align-top">Kota</td>
            <td>: {dataTable?.city} </td>
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
            <td className="w-1/3 min-w-24 align-top">Garasi Mobil</td>
            <td>: {dataTable?.carCount}</td>
          </tr>
        )}
        {dataTable?.ownership && (
          <tr>
            <td className="w-1/3 min-w-24 align-top">Sertifikat</td>
            <td>: {getLabelForValue('ownership', dataTable.ownership)}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default DetailPropertyTable