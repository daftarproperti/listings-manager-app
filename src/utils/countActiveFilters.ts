import { filterKeyStrings } from 'components/form/FilterForm'

export const countActiveFilters = (searchParams: URLSearchParams) => {
  let activeFilters = 0
  const filterKeys = Object.values(filterKeyStrings)

  for (const [key] of searchParams.entries()) {
    if (filterKeys.includes(key)) {
      activeFilters++
    }
  }
  return activeFilters
}
