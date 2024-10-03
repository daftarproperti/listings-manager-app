import type { Listing } from 'api/types'

// For now the only marketer is Jelajah Rumah, so it's fine to hardcode.
// TODO: Generate the list of marketers dynamically.
const MarketerLink = ({ data }: { data: Listing }) => {
  return data?.activeStatus === 'active' ? (
    <span className="pl-1">
      (Dipasarkan oleh:{' '}
      <a
        className="text-blue-600 underline transition duration-300 ease-in-out hover:text-blue-800 hover:no-underline focus:text-blue-800 focus:no-underline active:text-blue-900 active:no-underline"
        target="_blank"
        href={`https://jelajahrumah.id/?type=map&id=${data?.listingIdStr}`}
        rel="noreferrer"
      >
        Jelajah Rumah
      </a>
      )
    </span>
  ) : null
}

export default MarketerLink
