import { CLOSING_STATUS_ENUM } from 'pages/listings/edit/dummy'
import { type ClosingStatus } from 'api/types'

export const getClosingStatus = (status: ClosingStatus) => {
  return CLOSING_STATUS_ENUM[status] || 'Undefined'
}
