import { useSearchParams } from 'react-router-dom'

const ResetHeaderButton = () => {
  const [, setSearchParams] = useSearchParams()

  return (
    <>
      <button
        className="h-12 w-12 cursor-pointer p-3 text-sm text-blue-500"
        onClick={() => {
          setSearchParams({}, { replace: true })
        }}
      >
        Reset
      </button>
    </>
  )
}

export default ResetHeaderButton
