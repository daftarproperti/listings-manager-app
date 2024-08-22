import { CANCELLATION_STATUS_ENUM } from 'pages/listings/edit/dummy'
import { type CancellationStatus } from 'api/types'

export const getCancellationStatus = (status: CancellationStatus) => {
  return CANCELLATION_STATUS_ENUM[status] || 'Undefined'
}
