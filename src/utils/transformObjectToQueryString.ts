export const transformObjectToQueryString = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string, any>,
): string => {
  const params = new URLSearchParams()
  Object.entries(obj).forEach(([key, value]) => {
    params.append(key, String(value))
  })
  return params.toString()
}
