export type CombinedImage =
  | { id: number; url: string; isExistingImage: true }
  | { id: number; url: string; isExistingImage: false; file: File }
