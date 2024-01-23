import axios from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'

import { PropertyListRes, PropertyDetailRes, UpdatePropertyRes } from './types'

export const useGetPropertyList = () =>
  useQuery<PropertyListRes>({
    queryKey: ['useGetPropertyList'],
    queryFn: async () => {
      return (await axios.get('/properties')).data
    },
    retry: false,
  })

export const useGetPropertyDetail = ({ id }: { id: string }) =>
  useQuery<PropertyDetailRes>({
    queryKey: ['useGetPropertyDetail'],
    queryFn: async () => (await axios.get(`/properties/${id}`)).data,
    retry: false,
    staleTime: 0,
  })

interface UpdatePropertyParams {
  propertyId: string
  updateData: FormData
}
export const useUpdateProperty = () => {
  const mutation = useMutation<UpdatePropertyRes, Error, UpdatePropertyParams>({
    mutationFn: async ({ propertyId, updateData }) => {
      const response = await axios.post(`/properties/${propertyId}`, updateData)
      return response.data
    },
  })
  return mutation
}
