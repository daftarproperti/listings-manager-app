import { components, operations } from './generated'

export type PropertyListRes =
  operations['index']['responses']['200']['content']['application/json']
export type Property = components['schemas']['Property']
