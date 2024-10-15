import { type Listing } from 'api/types'
import { getLabelForValue } from 'utils'
import { Typography } from '@material-tailwind/react'

const DetailListingTable = ({ dataTable }: { dataTable: Listing }) => {
  const trClasses = ''
  const labelClasses = 'w-1/3 min-w-24 align-top'
  const dataClasses = ''
  const labelTypoClasses = 'leading-6'
  return (
    <table>
      <tbody>
        {dataTable?.address && (
          <tr className={trClasses}>
            <td className={labelClasses}>
              <Typography className={labelTypoClasses} variant="small">
                Alamat
              </Typography>
            </td>
            <td className={dataClasses}>
              <Typography variant="small">{dataTable?.address}</Typography>
            </td>
          </tr>
        )}
        {dataTable?.cityName && (
          <tr className={trClasses}>
            <td className={labelClasses}>
              <Typography className={labelTypoClasses} variant="small">
                Kota
              </Typography>
            </td>
            <td className={dataClasses}>
              <Typography variant="small">{dataTable?.cityName}</Typography>
            </td>
          </tr>
        )}
        {dataTable?.facing && (
          <tr className={trClasses}>
            <td className={labelClasses}>
              <Typography className={labelTypoClasses} variant="small">
                Hadap
              </Typography>
            </td>
            <td className={dataClasses}>
              <Typography variant="small">
                {getLabelForValue('facing', dataTable.facing)}
              </Typography>
            </td>
          </tr>
        )}
        {dataTable?.electricPower && (
          <tr className={trClasses}>
            <td className={labelClasses}>
              <Typography className={labelTypoClasses} variant="small">
                Listrik
              </Typography>
            </td>
            <td className={dataClasses}>
              <Typography variant="small">
                {getLabelForValue('electric_power', dataTable.electricPower)} V
              </Typography>
            </td>
          </tr>
        )}
        {dataTable?.floorCount && (
          <tr className={trClasses}>
            <td className={labelClasses}>
              <Typography className={labelTypoClasses} variant="small">
                Lantai
              </Typography>
            </td>
            <td className={dataClasses}>
              <Typography variant="small">{dataTable?.floorCount}</Typography>
            </td>
          </tr>
        )}
        {dataTable?.carCount && (
          <tr className={trClasses}>
            <td className={labelClasses}>
              <Typography className={labelTypoClasses} variant="small">
                Kapasitas Mobil
              </Typography>
            </td>
            <td className={dataClasses}>
              <Typography variant="small">{dataTable?.carCount}</Typography>
            </td>
          </tr>
        )}
        {dataTable?.ownership && (
          <tr className={trClasses}>
            <td className={labelClasses}>
              <Typography className={labelTypoClasses} variant="small">
                Sertifikat
              </Typography>
            </td>
            <td className={dataClasses}>
              <Typography variant="small">
                {getLabelForValue('ownership', dataTable.ownership)}
              </Typography>
            </td>
          </tr>
        )}
        {dataTable?.isMultipleUnits && (
          <tr className={trClasses}>
            <td className={labelClasses}>
              <Typography className={labelTypoClasses} variant="small">
                Multiunit
              </Typography>
            </td>
            <td className={dataClasses}>
              <Typography variant="small">
                {dataTable.isMultipleUnits ? 'Ya' : 'Tidak'}
              </Typography>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default DetailListingTable
