import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

import { PropertyListRes } from './types'

export const useGetPropertyList = () =>
  useQuery<PropertyListRes>({
    queryKey: ['useGetPropertyList'],
    queryFn: async () => {
      return (await axios.get('/properties')).data
    },
    retry: false,
  })

export const useGetPropertyDetail = ({ id }: { id: string }) =>
  useQuery<PropertyListRes>({
    queryKey: ['useGetPropertyDetail'],
    queryFn: async () => {
      return (await axios.get(`/properties/${id}`)).data
    },
    retry: false,
  })
