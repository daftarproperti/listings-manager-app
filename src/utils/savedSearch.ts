import type { SavedSearch } from 'api/types'

export const savedSearchToSearchParams = (search: SavedSearch) => {
  const searchParams = new URLSearchParams()

  if (search.id) {
    searchParams.set('searchId', search.id)
  }

  if (search.title) {
    searchParams.set('title', search.title)
  }

  if (search.filterSet) {
    const filterSetKeys = Object.keys(search.filterSet)
    filterSetKeys.forEach((key) => {
      const value = search.filterSet
        ? search.filterSet[key as keyof typeof search.filterSet]
        : ''

      if (value != null) {
        if (typeof value === 'object' && 'min' in value && 'max' in value) {
          if (value.min != null) {
            searchParams.set(`${key}[min]`, value.min.toString())
          }
          if (value.max != null) {
            searchParams.set(`${key}[max]`, value.max.toString())
          }
        } else {
          searchParams.set(key, value.toString())
        }
      }
    })
  }

  return searchParams
}

export const searchparamsToSavedSearch = () => {}
