import { useParams } from 'react-router-dom'

import EditListing from './editListing'

const EditListingPage = () => {
  const { id } = useParams()

  return id && <EditListing id={id} />
}
export default EditListingPage
