import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

import type {
  PropertyDetailRes,
  PropertyListRes,
  ListingListRes,
  ListingDetailRes,
  AddListingRequest,
  AddListingResponse,
  DeleteListingRes,
  UpdateListingParams,
  UpdateListingRes,
  UpdateProfileParams,
  UpdateProfileRes,
  UserProfileResponse,
} from './types'

export const checkAuth = async () => {
  try {
    // TODO: use auth specific endpoint that is lighter, like /auth
    const response = await axios.get('/listings')
    return response.status === 200
  } catch (error) {
    return false
  }
}

export const useGetPropertyList = () =>
  useMutation<PropertyListRes, Error, { searchParams?: URLSearchParams }>({
    mutationFn: async ({ searchParams }) => {
      const url = searchParams?.size
        ? `/properties?${searchParams}`
        : '/properties'

      const response = await axios.get(url)
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Invalid response format')
      }

      return response.data
    },
  })

export const useGetPropertyDetail = ({ id }: { id: string }) =>
  useQuery<PropertyDetailRes>({
    queryKey: ['useGetPropertyDetail'],
    queryFn: async () => (await axios.get(`/properties/${id}`)).data,
    retry: false,
    staleTime: 0,
  })

export const useUpdateListing = () => {
  const mutation = useMutation<UpdateListingRes, Error, UpdateListingParams>({
    mutationFn: async ({ listingId, updateData }) => {
      const response = await axios.post(`/listings/${listingId}`, updateData)
      return response.data
    },
  })
  return mutation
}

export const useDeleteListing = () => {
  return useMutation<DeleteListingRes, Error, { id: string }>({
    mutationFn: async ({ id }) => {
      const response = await axios.delete(`/listings/${id}`)
      return response.data
    },
  })
}

export const useAddListing = () =>
  useMutation<AddListingResponse, Error, AddListingRequest>({
    mutationFn: async (formData) => {
      const response = await axios.post('/listings', formData)
      return response.data
    },
  })

export const useGetUserProfile = () =>
  useQuery<UserProfileResponse>({
    queryKey: ['getUserProfile'],
    queryFn: async () => (await axios.get('/users/profile')).data,
    retry: false,
    staleTime: 0,
  })

export const useUpdateUserProfile = () =>
  useMutation<UpdateProfileRes, Error, UpdateProfileParams>({
    mutationFn: async ({ userData }) => {
      const response = await axios.post('/users/profile', userData)
      return response.data
    },
  })
export const useGetListingList = () =>
  useMutation<ListingListRes, Error, { searchParams?: URLSearchParams }>({
    mutationFn: async ({ searchParams }) => {
      const url = searchParams?.size ? `/listings?${searchParams}` : '/listings'

      const response = await axios.get(url)
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Invalid response format')
      }

      return response.data
    },
  })

export const useGetListingDetail = ({ id }: { id: string }) =>
  useQuery<ListingDetailRes>({
    queryKey: ['useGetListingDetail'],
    queryFn: async () => (await axios.get(`/listings/${id}`)).data,
    retry: false,
    staleTime: 0,
  })
