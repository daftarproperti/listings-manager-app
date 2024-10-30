import { useParams } from 'react-router-dom'
import Header from 'components/header/Header'

import ClosingForm from './ClosingForm'

const ClosingListingPage = () => {
  const { id } = useParams()

  return (
    <>
      <Header title="Closing Listing" />
      {id && (
        <div className="min-h-dvh w-full bg-slate-50 pb-20 pt-16 lg:pb-4 lg:pt-0">
          <ClosingForm id={id} />
        </div>
      )}
    </>
  )
}

export default ClosingListingPage
