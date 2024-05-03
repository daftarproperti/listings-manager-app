import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

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
  UploadImageRes,
  SavedSearchListRes,
} from './types'

// If x-init-data is in local storage (as a result of login widget), attach it
// on every request.
axios.interceptors.request.use(
  (config) => {
    const xInitData = localStorage.getItem('x-init-data')
    if (xInitData) {
      config.headers['X-INIT-DATA'] = xInitData
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const checkAuth = async () => {
  try {
    // TODO: use auth specific endpoint that is lighter, like /auth
    const response = await axios.get('/listings')
    return response.status === 200
  } catch (error) {
    return false
  }
}

export const useGetPropertyList = ({
  searchParams,
}: {
  searchParams?: URLSearchParams
}) =>
  useInfiniteQuery<PropertyListRes>({
    queryKey: ['useGetPropertyListInfite', searchParams],
    queryFn: async ({ pageParam }) => {
      let url = '/properties'
      if (searchParams?.size) {
        url += `?${searchParams}`
        if (pageParam) {
          url += `&page=${pageParam}`
        }
      } else if (pageParam) {
        url += `?page=${pageParam}`
      }
      const response = await axios.get(url)
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Invalid response format')
      }

      return response.data
    },
    initialPageParam: searchParams?.get('page') ?? null,
    getNextPageParam: (lastPage) => {
      // Note: links and meta is not available in swagger schema yet
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const nextFetchLink: string = lastPage?.links?.next
      if (!nextFetchLink) {
        return null
      } else {
        return new URL(nextFetchLink).searchParams.get('page') ?? null
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  })

export const useGetPropertyDetail = ({ id }: { id: string }) =>
  useQuery<PropertyDetailRes>({
    queryKey: ['useGetPropertyDetail'],
    queryFn: async () => {
      try {
        const response = await axios.get(`/properties/${id}`)
        return response.data
      } catch (error) {
        console.error('Failed to fetch property detail:', error)
        throw error
      }
    },
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

export const useGetListingList = ({
  searchParams,
}: {
  searchParams?: URLSearchParams
}) =>
  useInfiniteQuery<ListingListRes>({
    queryKey: ['useGetListingListInfite', searchParams],
    queryFn: async ({ pageParam }) => {
      let url = '/listings'
      if (searchParams?.size) {
        url += `?${searchParams}`
        if (pageParam) {
          url += `&page=${pageParam}`
        }
      } else if (pageParam) {
        url += `?page=${pageParam}`
      }
      const response = await axios.get(url)
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Invalid response format')
      }
      return response.data
    },
    initialPageParam: searchParams?.get('page') ?? null,
    getNextPageParam: (lastPage) => {
      // Note: links and meta is not available in swagger schema yet
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const nextFetchLink: string = lastPage?.links?.next
      if (!nextFetchLink) {
        return null
      } else {
        return new URL(nextFetchLink).searchParams.get('page') ?? null
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  })

export const useGetListingDetail = ({ id }: { id: string }) =>
  useQuery<ListingDetailRes>({
    queryKey: ['useGetListingDetail'],
    queryFn: async () => {
      try {
        const response = await axios.get(`/listings/${id}`)
        return response.data
      } catch (error) {
        console.error('Failed to fetch listing detail:', error)
        throw error
      }
    },
    retry: false,
    staleTime: 0,
  })

export const useListSavedSearch = () =>
  useQuery<SavedSearchListRes>({
    queryKey: ['listSavedSearch'],
    queryFn: async () => (await axios.get('/saved-searches')).data,
    retry: false,
    staleTime: 0,
  })

// non hook function
export const uploadImage = async (file: File) => {
  const imageFormData = new FormData()
  imageFormData.append('image', file)
  try {
    const res = await axios.post<UploadImageRes>('/upload/image', imageFormData)
    return res?.data
  } catch (error) {
    if (error instanceof AxiosError) {
      if (
        error.response?.data?.errors?.image.includes(
          'The image field must be an image.',
        )
      ) {
        toast(`Error uploading image: File harus berupa gambar`, {
          type: 'error',
        })
      } else {
        toast(
          `Error uploading image: ${JSON.stringify(
            error.response?.data?.message,
          )}`,
          {
            type: 'error',
          },
        )
      }
    }
    return null
  }
}
