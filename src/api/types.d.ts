import { type components, type operations } from './generated'

export type PropertyListRes =
  operations['index']['responses']['200']['content']['application/json']
export type Property = components['schemas']['Property']
export type PropertyDetailRes =
  operations['show']['responses']['200']['content']['application/json']
export type UpdatePropertyRequest =
  components['schemas']['UpdatePropertyRequest']
export type UpdatePropertyParams = {
  propertyId: string
  updateData: FormData
}
export type UpdatePropertyRes =
  operations['update']['responses']['200']['content']['application/json']
export type AddPropertyRequest = FormData
export type AddPropertyResponse =
  operations['create']['responses']['200']['content']['application/json']
export type DeletePropertyRes =
  operations['delete']['responses']['200']['content']['application/json']
export type UpdateProfileParams = {
  userData: FormData
}
export type UpdateProfileRequest =
  components['schemas']['TelegramUserProfileRequest']
export type UpdateProfileRes =
  operations['updateProfile']['responses']['200']['content']['application/json']
export type UserProfileResponse =
  operations['profile']['responses']['200']['content']['application/json']
