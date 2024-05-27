import { SORT_OPTIONS } from 'components/SortBottomSheet'

export const getSortLabel = (searchparams: URLSearchParams) => {
  return SORT_OPTIONS.find(
    (v) =>
      v.value === searchparams.get('sort') &&
      v.order === searchparams.get('order'),
  )?.label
}
