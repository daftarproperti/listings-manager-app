// Constructs the path to Daftar Properti site.
export const dpPath = (path: string) => {
  return (import.meta.env.VITE_DP_HOME || window.location.origin) + path
}
