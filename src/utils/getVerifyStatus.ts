import { VERIFY_STATUS_ENUM } from 'pages/listings/edit/dummy'
import { type VerifyStatus } from 'api/types'

export const getVerifyStatus = (status: VerifyStatus) => {
  return VERIFY_STATUS_ENUM[status] || 'Undefined'
}
