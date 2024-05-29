import { vi } from 'vitest'
import axios from 'axios'
import React from 'react'
import { render, waitFor } from '@testing-library/react'
import * as reactRouterDom from 'react-router-dom'

import App from './App'

vi.mock('axios')
vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof reactRouterDom>('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

describe('App', () => {
  beforeEach(() => {
    // Clear all mocks before each test.
    vi.resetAllMocks()
  })

  test('Render login page at the start of the app', async () => {
    const mockedNavigate = vi.fn()
    vi.mocked(reactRouterDom.useNavigate).mockReturnValue(mockedNavigate)

    vi.mocked(axios.get).mockImplementation(() => {
      return Promise.reject(new Error('Page not found'))
    })

    render(<App />)

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/login'))
  })
})
