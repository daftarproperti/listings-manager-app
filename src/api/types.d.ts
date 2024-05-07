import { type components, type operations } from './generated'

export type PropertyListRes =
  operations['index']['responses']['200']['content']['application/json']
export type Property = components['schemas']['Property']
export type PropertyDetailRes =
  operations['show']['responses']['200']['content']['application/json']
export type UpdateProfileParams = {
  userData: FormData
}
export type UpdateProfileRequest =
  components['schemas']['TelegramUserProfileRequest']
export type UpdateProfileRes =
  operations['updateProfile']['responses']['200']['content']['application/json']
export type UserProfileResponse =
  operations['profile']['responses']['200']['content']['application/json']
export type ListingListRes =
  operations['listings.index']['responses']['200']['content']['application/json']
export type Listing = components['schemas']['Listing']
export type ListingDetailRes =
  operations['listings.show']['responses']['200']['content']['application/json']
export type UpdateListingParams = {
  listingId: string
  updateData: FormData
}
export type UpdateListingRes =
  operations['listings.update']['responses']['200']['content']['application/json']
export type UpdateListingRequest = components['schemas']['ListingRequest']
export type DeleteListingRes =
  operations['listings.delete']['responses']['200']['content']['application/json']
export type AddListingRequest = FormData
export type AddListingResponse =
  operations['listings.create']['responses']['200']['content']['application/json']
export type UploadImageRes =
  operations['image.upload']['responses']['200']['content']['application/json']

export type SavedSearch = components['schemas']['SavedSearch']
export type SavedSearchListRes =
  operations['saved_searches.index']['responses']['200']['content']['application/json']
export type AddSavedSearchRes =
  operations['saved_searches.create']['responses']['200']['content']['application/json']
export type AddSavedSearchReq = components['schemas']['SavedSearchRequest']
export type UpdateSavedSearchRes =
  operations['saved_searches.update']['responses']['200']['content']['application/json']
export type UpdateSavedSearchParams = {
  id: operations['saved_searches.update']['parameters']['path']['id']
  requestBody: components['schemas']['SavedSearchRequest']
}
export type DeleteSavedSearchRes =
  operations['saved_searches.delete']['responses']['200']['content']['application/json']

export type FilterMinMax = components['schemas']['FilterMinMax']
export type FilterSet = components['schemas']['FilterSet']
