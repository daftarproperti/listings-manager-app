// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const safeJSONParse = (jsonString: string): any | null => {
  try {
    const parsedJson = JSON.parse(jsonString)
    return parsedJson
  } catch (error) {
    console.error('Error parsing JSON:', error)
    return null
  }
}
