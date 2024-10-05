import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import axios, { isAxiosError, AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { debounce } from 'lodash'
import { appPath } from 'utils'

import type {
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
  City,
  CityOption,
  CitiesListRes,
  GenerateFromTextRequest,
  GenerateFromTextResponse,
  GetGenerateResultRequest,
  GetGenerateResultResponse,
  UpdateCancellationNoteParams,
  ClosingListingRes,
  ClosingListingParams,
  PropertyDetailsResponse,
  GenerateSecretKeyRes,
  VerifyTOTPRes,
  VerifyTOTPReq,
  SendOTPRes,
  SendOTPReq,
  DeleteSecretKeyRes,
} from './types'

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      console.log('Auth error occured. redirecting to login page . . .')
      window.location.href = appPath('/login')
      return Promise.reject(error)
    }

    throw error.response.data
  },
)

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

export const useGenerateListingFromText = () => {
  return useMutation<GenerateFromTextResponse, Error, GenerateFromTextRequest>({
    mutationFn: async (data: GenerateFromTextRequest) => {
      const response = await axios.post('/listings/generate-from-text', data)
      return response.data
    },
  })
}

export const useGetGenerateResult = () => {
  return useMutation<
    GetGenerateResultResponse,
    Error,
    GetGenerateResultRequest
  >({
    mutationFn: async (data: GetGenerateResultRequest) => {
      const response = await axios.post('/listings/get-generate-result', data)
      return response.data
    },
  })
}

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

export const useGenerateSecretKey = () =>
  useMutation<GenerateSecretKeyRes>({
    mutationFn: async () => {
      const response = await axios.post('/users/secret-key')
      return response.data
    },
  })

export const useDeleteSecretKey = () =>
  useMutation<DeleteSecretKeyRes>({
    mutationFn: async () => {
      const response = await axios.delete('/users/secret-key')
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
    refetchOnWindowFocus: false,
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

export const sendOTP = async (
  input: SendOTPReq,
  forceSend?: boolean,
): Promise<SendOTPRes> => {
  try {
    const response = await axios.post(
      `/send-otp${forceSend ? '?forceSend=true' : ''}`,
      input,
      {
        baseURL: `${import.meta.env.VITE_DP_HOME}/api/auth`,
      },
    )
    return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 429) {
      throw new Error(
        'Too many attempts, please wait 1 minute before trying again.',
      )
    }
    throw new Error('Failed to send verification code. Please try again.')
  }
}

export const verifyOTP = async (
  phoneNumber: string,
  token: string,
  timestamp: number,
  otpCode: string,
): Promise<{ accessToken: string }> => {
  try {
    const response = await axios.post(
      '/verify-otp',
      {
        phoneNumber,
        token,
        timestamp,
        otpCode,
      },
      { baseURL: `${import.meta.env.VITE_DP_HOME}/api/auth` },
    )
    return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 429) {
      throw new Error(
        'Too many attempts, please wait 1 minute before trying again.',
      )
    }
    throw new Error('Failed to verify the otpCode. Please try again.')
  }
}

export const logout = async () => {
  try {
    const response = await axios.post('/logout', {
      baseURL: `${import.meta.env.VITE_DP_HOME}/api/auth`,
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to logout. Please try again.')
  }
}

export const fetchDefaultCities = async (): Promise<City[]> => {
  try {
    const response = await axios.get<{ cities: City[] }>('/cities')
    return response.data.cities
  } catch (error) {
    console.error('Error fetching default cities:', error)
    return []
  }
}

async function fetchCities(inputValue: string): Promise<CityOption[]> {
  if (inputValue.length < 2) return []

  try {
    const response = await axios.get<CitiesListRes>(
      `/cities?q=${encodeURIComponent(inputValue)}`,
    )
    if (response.data && Array.isArray(response.data.cities)) {
      return response.data.cities.map((city) => ({
        label: city.name || 'Unknown city',
        value: city.id || 0,
      }))
    }
    return []
  } catch (error) {
    console.error('Error fetching cities:', error)
    return []
  }
}

const debouncedFetchCities = debounce(
  (
    inputValue: string,
    resolve: (result: CityOption[]) => void,
    reject: (error: string) => void,
  ) => {
    fetchCities(inputValue).then(resolve).catch(reject)
  },
  1000,
)

export function getDebouncedCities(inputValue: string): Promise<CityOption[]> {
  return new Promise((resolve, reject) => {
    debouncedFetchCities(inputValue, resolve, reject)
  })
}

export async function getCityById(cityId: number): Promise<City | null> {
  try {
    const response = await axios.get<City>(`/cities/${cityId}`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch city:', error)
    return null
  }
}

export const impersonate = async (
  phoneNumber: string,
): Promise<{ accessToken: string }> => {
  try {
    const response = await axios.post(
      '/impersonate',
      { phoneNumber },
      { baseURL: `${import.meta.env.VITE_DP_HOME}/api/auth` },
    )
    return response.data
  } catch (error) {
    throw new Error('Failed to impersonate. Please try again.')
  }
}

export const useUpdateCancellationNote = () => {
  return useMutation({
    mutationKey: ['updateCancellationNote'],
    mutationFn: async ({
      listingId,
      updateData,
    }: UpdateCancellationNoteParams) => {
      const response = await axios.put(
        `/listings/${listingId}/cancel`,
        JSON.stringify(updateData),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      return response.data
    },
    onError: () => {
      throw new Error('Failed to send cancellation note. Please try again.')
    },
  })
}

export const useClosingListing = () => {
  const mutation = useMutation<ClosingListingRes, Error, ClosingListingParams>({
    mutationFn: async ({ listingId, updateData }) => {
      const response = await axios.post(
        `/listings/${listingId}/closings`,
        updateData,
      )
      return response.data
    },
  })
  return mutation
}

export const fetchPropertyDetails = async (
  propertyId: string,
): Promise<PropertyDetailsResponse> => {
  const url = `https://admin.easyfind.id/api/properties/${propertyId}?populate=*`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(
        'Failed to fetch property details: ' + response.statusText,
      )
    }
    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Network error: ' + error.message)
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}

export const useVerifyTOTP = () =>
  useMutation<VerifyTOTPRes, AxiosError, VerifyTOTPReq>({
    mutationFn: async (input) => {
      const response = await axios.post('/verify-totp', input, {
        baseURL: `${import.meta.env.VITE_DP_HOME}/api/auth`,
      })
      return response.data
    },
  })
