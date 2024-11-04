import { Link, useSearchParams } from 'react-router-dom'
import { Typography } from '@material-tailwind/react'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import { useGetListingList } from 'api/queries'
import Tooltip from 'components/Tooltip'

const Title = () => {
  const [searchParams] = useSearchParams()
  const { data } = useGetListingList({ searchParams })

  const listingsLength = data?.pages?.[0]?.listings?.length || 0

  const maxListings = Number(
    (import.meta.env.VITE_MAX_LISTINGS_PER_USER as string) || '10',
  )

  return (
    <div className="flex items-center gap-1">
      <Typography variant="h6" className="lg:text-xl">
        Listing Saya ({listingsLength}/{maxListings})
      </Typography>
      <Tooltip
        content={
          <Typography variant="small">
            {listingsLength >= maxListings ? (
              <>
                Kuota listing anda sudah habis,{' '}
                {
                  <Link
                    target="_blank"
                    tabIndex={-1}
                    className="text-blue-500"
                    to="https://api.whatsapp.com/send?phone=6285186856707"
                  >
                    hubungi Daftar Properti
                  </Link>
                }{' '}
                untuk permintaan tambahan kuota.
              </>
            ) : (
              <>
                Anda memiliki kuota listing yang tersisa sebanyak{' '}
                {maxListings - listingsLength}
              </>
            )}
          </Typography>
        }
      >
        <QuestionMarkCircleIcon className="h-5 w-5 text-slate-500" />
      </Tooltip>
    </div>
  )
}

export default Title
