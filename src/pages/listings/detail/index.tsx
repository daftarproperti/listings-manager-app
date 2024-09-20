import Header from 'components/header/Header'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import ListingDetail from './Detail'

const ListingDetailPage = () => {
  const { id } = useParams()
  const [canEdit, setCanEdit] = useState<boolean>(false)
  const [multipleUnit, checkMultipleUnit] = useState<boolean>(false)
  const [closings, checkClosings] = useState<number>(0)
  const [isApproved, setIsApproved] = useState<boolean>(false)

  const handleSetIsApproved = (approvedStatus: boolean) => {
    setIsApproved(approvedStatus)
  }

  return (
    <>
      <Header
        title="Rincian Listing"
        canEdit={canEdit}
        multipleUnit={multipleUnit}
        closings={closings}
        isApproved={isApproved}
      />
      {id && (
        <ListingDetail
          id={id}
          setCanEdit={setCanEdit}
          checkMultipleUnit={checkMultipleUnit}
          checkClosings={checkClosings}
          setIsApproved={handleSetIsApproved}
        />
      )}
    </>
  )
}
export default ListingDetailPage
