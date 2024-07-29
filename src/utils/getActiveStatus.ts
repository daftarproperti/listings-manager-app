import { ACTIVE_STATUS_ENUM } from 'pages/listings/edit/dummy'
import { type ActiveStatus } from 'api/types'

export const getActiveStatus = (status: ActiveStatus) => {
  return ACTIVE_STATUS_ENUM[status] || 'Undefined'
}
