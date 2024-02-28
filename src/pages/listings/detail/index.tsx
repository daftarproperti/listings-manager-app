import Header from 'components/header/Header'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import ListingDetail from './Detail'

const ListingDetailPage = () => {
  const { id } = useParams()
  const [canEdit, setCanEdit] = useState<boolean>(false)

  return (
    <>
      <Header title="Rincian Listing" canEdit={canEdit} />
      {id && <ListingDetail id={id} setCanEdit={setCanEdit} />}
    </>
  )
}
export default ListingDetailPage
