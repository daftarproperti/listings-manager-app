export const formatDate = (date: string | number | Date | undefined) => {
  if (!date) return 'No date provided'

  const parsedDate = new Date(date)
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsedDate)
}
