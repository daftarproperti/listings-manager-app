import type { FilterMinMax, FilterSet, SavedSearch } from 'api/types'

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

export const searchparamsToSavedSearch = (searchParams: URLSearchParams) => {
  const defaultValue: {
    [key: string]: string | number | FilterMinMax | null
  } = {
    propertyType: null,
    listingType: null,
    price: null,
    lotSize: null,
    buildingSize: null,
    bedroomCount: null,
    bathroomCount: null,
    carCount: null,
    facing: null,
    ownership: null,
    floorCount: null,
    electricPower: null,
    city: null,
  }

  const filterSetKeys = Object.keys(defaultValue)
  const regexMinMax = /\[min\]|\[max\]/g

  for (const [key, value] of searchParams.entries()) {
    const filterKey = key.replace(regexMinMax, '')

    if (filterSetKeys.includes(filterKey)) {
      if (key.includes('min') || key.includes('max')) {
        const minMaxKey = key.includes('min') ? 'min' : 'max'
        const currentValue = (defaultValue[filterKey] as FilterMinMax) ?? {
          min: null,
          max: null,
        }
        currentValue[minMaxKey] = value ? parseInt(value) : null
        defaultValue[filterKey] = currentValue
      } else if (key.includes('electricPower') || key.includes('floorCount')) {
        defaultValue[filterKey] = value ? parseInt(value) : null
      } else {
        defaultValue[filterKey] = value ?? null
      }
    }
  }

  const search: SavedSearch = {
    ...(searchParams.has('title')
      ? { title: searchParams.get('title') as string }
      : {}),
    filterSet: defaultValue as FilterSet,
  }

  return search
}
