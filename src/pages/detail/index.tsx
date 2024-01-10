import { useParams } from 'react-router-dom'

import Detail from './Detail'

export default function DetailPage() {
  const { id } = useParams()

  return id && <Detail id={id} />
}
