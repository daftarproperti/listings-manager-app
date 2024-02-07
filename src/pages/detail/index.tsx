import { useState } from 'react'
import { useParams } from 'react-router-dom'

import Header from 'components/header/Header'
import Detail from './Detail'

const DetailPage = () => {
  const { id } = useParams()
  const [canEdit, setCanEdit] = useState<boolean>(false)

  return (
    <>
      <Header title="Rincian Listing" canEdit={canEdit} />
      {id && <Detail id={id} setCanEdit={setCanEdit} />}
    </>
  )
}
export default DetailPage
