export const isSorted = (searchParams: URLSearchParams) => {
  switch (searchParams.get('sort')) {
    case null:
      return false
    case '':
      return false
    default:
      return true
  }
}
