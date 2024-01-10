import { useGetPropertyDetail } from 'api/queries'

export default function Detail({ id }: { id: string }) {
  const { data } = useGetPropertyDetail({ id })
  return (
    <div className="space-y-4 break-words p-4">
      <p>ini detail {id}</p>
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}
