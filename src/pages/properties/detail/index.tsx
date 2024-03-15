import { useParams } from 'react-router-dom'

import PropertyDetail from './Detail'

const PropertyDetailPage = () => {
  const { id } = useParams()

  return <>{id && <PropertyDetail id={id} />}</>
}
export default PropertyDetailPage
