import Header from 'components/header/Header'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import ListingDetail from './Detail'

const ListingDetailPage = () => {
  const { id } = useParams()
  const [canEdit, setCanEdit] = useState<boolean>(false)
  const [multipleUnit, checkMultipleUnit] = useState<boolean>(false)
  const [closings, checkClosings] = useState<number>(0)

  return (
    <>
      <Header
        title="Rincian Listing"
        canEdit={canEdit}
        multipleUnit={multipleUnit}
        closings={closings}
      />
      {id && (
        <ListingDetail
          id={id}
          setCanEdit={setCanEdit}
          checkMultipleUnit={checkMultipleUnit}
          checkClosings={checkClosings}
        />
      )}
    </>
  )
}
export default ListingDetailPage
