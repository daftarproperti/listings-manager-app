import { components, operations } from './generated'

export type PropertyListRes =
  operations['index']['responses']['200']['content']['application/json']
export type Property = components['schemas']['Property']
export type PropertyDetailRes =
  operations['show']['responses']['200']['content']['application/json']
export type UpdatePropertyRequest =
  components['schemas']['UpdatePropertyRequest']
export type UpdatePropertyRes =
  operations['update']['responses']['200']['content']['application/json']