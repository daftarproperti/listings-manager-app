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
export type GenerateFromTextRequest =
  operations['listings.generateFromText']['parameters']['path']
export type GenerateFromTextResponse =
  operations['listings.generateFromText']['responses']['200']['content']['application/json']
export type GetGenerateResultRequest =
  operations['listings.getGenerateResult']['parameters']['path']
export type GetGenerateResultResponse =
  operations['listings.getGenerateResult']['responses']['200']['content']['application/json']
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
export type CitiesListRes =
  operations['cities.index']['responses']['200']['content']['application/json']
export type CitybyIdRes =
  operations['cities.getCityById']['responses']['200']['content']['application/json']

export type FilterMinMax = components['schemas']['FilterMinMax']
export type FilterSet = components['schemas']['FilterSet']
export type PropertyType = components['schemas']['PropertyType']
export type ListingType = components['schemas']['ListingType']
export type VerifyStatus = components['schemas']['VerifyStatus']
export type AdminNote = components['schemas']['AdminNote']

export type City = components['schemas']['City']
export type CityOption = { label: string; value: number }
