import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

import { PropertyListRes, PropertyDetailRes } from './types'

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
