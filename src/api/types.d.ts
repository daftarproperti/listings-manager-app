import { type components, type operations } from './generated'

export type PropertyListRes =
  operations['index']['responses']['200']['content']['application/json']
export type Property = components['schemas']['Property']
export type PropertyDetailRes =
  operations['show']['responses']['200']['content']['application/json']
export type UpdateProfileParams = {
  userData: FormData
}
export type UpdateProfileRequest = components['schemas']['User']
export type UpdateProfileRes =
  operations['updateProfile']['responses']['200']['content']['application/json']
export type UserProfileResponse =
  operations['profile']['responses']['200']['content']['application/json']
export type GenerateSecretKeyRes =
  operations['generateSecretKey']['responses']['200']['content']['application/json']
export type DeleteSecretKeyRes =
  operations['deleteSecretKey']['responses']['200']['content']['application/json']
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
export type ActiveStatus = components['schemas']['ActiveStatus']

export type City = components['schemas']['City']
export type CityOption = { label: string; value: number }

export type CancellationNote = components['schemas']['CancellationNote']
export type UpdateCancellationNoteRequest =
  components['schemas']['CancellationNote']
export type CancellationStatus = components['schemas']['CancellationStatus']
type UpdateCancellationNoteParams = {
  listingId: string
  updateData: CancellationNote
}
export type CancelListingRes =
  operations['listings.cancel']['responses']['200']['content']['application/json']
export type Closing = components['schemas']['Closing']
export type UpdateClosingRequest = components['schemas']['ClosingRequest']
export type ClosingType = components['schemas']['ClosingType']
export type ClosingListingRes =
  operations['listings.closing']['responses']['200']['content']['application/json']
export type ClosingListingParams = {
  listingId: string
  updateData: FormData
}
export type ClosingStatus = components['schemas']['ClosingStatus']
export type SendOTPReq = operations['auth.send_otp']['parameters']['path']
export type SendOTPRes =
  operations['auth.send_otp']['responses']['200']['content']['application/json']
export type VerifyTOTPReq =
  operations['auth.verify_totp']['requestBody']['content']['application/json']
export type VerifyTOTPRes =
  operations['auth.verify_totp']['responses']['200']['content']['application/json']

export interface PropertyDetailsResponse {
  data: {
    id: number
    attributes: {
      title: string
      address: string
      description: string
      price: number
      lotSize: number
      buildingSize: number
      carCount: number
      floorCount: number
      bedroomCount: number
      bathroomCount: number
      facing: string
      ownership: string
      sellerName: string
      sellerPhoneNumber: string
      latitude: number
      longitude: number
      createdAt: Date
      updatedAt: Date
      publishedAt: Date
      placeId: number
      dpId: number
      pictures: {
        data: {
          id: number
          attributes: {
            name: string
            alternativeText: string
            caption: string
            width: number
            height: number
            formats: {
              small: {
                ext: string
                url: string
                hash: string
                mime: string
                name: string
                path: string
                size: number
                width: number
                height: number
              }
              medium: {
                ext: string
                url: string
                hash: string
                mime: string
                name: string
                path: string
                size: number
                width: number
                height: number
              }
              thumbnail: {
                ext: string
                url: string
                hash: string
                mime: string
                name: string
                path: string
                size: number
                width: number
                height: number
              }
            }
            hash: string
            ext: string
            mime: string
            size: number
            url: string
            previewUrl: string
            provider: string
            provider_metadata: string
            createdAt: string
            updatedAt: string
          }
        }[]
      }
      city: {
        data: {
          id: number
          attributes: {
            name: string
            createdAt: string
            updatedAt: string
            publishedAt: string
            osmId: number
          }
        }
      }
    }
  }
}
