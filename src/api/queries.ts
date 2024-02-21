import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

import type {
  AddPropertyRequest,
  AddPropertyResponse,
  DeletePropertyRes,
  PropertyDetailRes,
  PropertyListRes,
  UpdatePropertyParams,
  UpdatePropertyRes,
  UpdateProfileParams,
  UpdateProfileRes,
  UserProfileResponse,
} from './types'

export const checkAuth = async () => {
  try {
    // TODO: use auth specific endpoint that is lighter, like /auth
    const response = await axios.get('/properties')
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

export const useUpdateProperty = () => {
  const mutation = useMutation<UpdatePropertyRes, Error, UpdatePropertyParams>({
    mutationFn: async ({ propertyId, updateData }) => {
      const response = await axios.post(`/properties/${propertyId}`, updateData)
      return response.data
    },
  })
  return mutation
}

export const useDeleteProperty = () => {
  return useMutation<DeletePropertyRes, Error, { id: string }>({
    mutationFn: async ({ id }) => {
      const response = await axios.delete(`/properties/${id}`)
      return response.data
    },
  })
}

export const useAddProperty = () =>
  useMutation<AddPropertyResponse, Error, AddPropertyRequest>({
    mutationFn: async (formData) => {
      const response = await axios.post('/properties', formData)
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
