import { useParams } from 'react-router-dom'

import Detail from './Detail'

const DetailPage = () => {
  const { id } = useParams()

  return id && <Detail id={id} />
}
export default DetailPage
