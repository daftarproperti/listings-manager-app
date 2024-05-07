import { filterKeyStrings } from 'components/form/FilterForm'

export const isSavedSearchApplied = (searchParams: URLSearchParams) => {
  const activeFilters: string[] = []
  const filterKeys = Object.values(filterKeyStrings)

  for (const [key] of searchParams.entries()) {
    if (filterKeys.includes(key)) {
      const filterkey = key.replace(/\b(max|min)\b/g, '')
      if (!activeFilters.includes(filterkey)) {
        activeFilters.push(filterkey)
      }
    }
  }

  if (activeFilters.length === 0) {
    return 'Calon Pembeli'
  } else {
    return searchParams.get('title') ?? ''
  }
}
