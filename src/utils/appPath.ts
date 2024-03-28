export const appPath = (path: string) =>
  import.meta.env.VITE_BASE_PATH ? import.meta.env.VITE_BASE_PATH + path : path
