import { useParams } from 'react-router-dom'

import EditProperty from './editProperty'

const EditPropertyPage = () => {
  const { id } = useParams()

  return id && <EditProperty id={id} />
}
export default EditPropertyPage
