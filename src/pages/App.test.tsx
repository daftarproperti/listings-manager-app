import { vi } from 'vitest'
import axios from 'axios'
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import App from './App'

vi.mock('axios')

// async utility to insert intentional response delay
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

describe('App', () => {
  beforeEach(() => {
    // Clear all mocks before each test.
    vi.resetAllMocks()
  })

  test('authentication failure', async () => {
    vi.mocked(axios.get).mockImplementation(() => {
      return Promise.reject(new Error('Page not found'))
    })

    render(<App />)
    expect(screen.getByText('Authenticating...')).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.queryByText('Authenticating...')).not.toBeInTheDocument(),
    )
    expect(screen.getByText('Authentication Failure')).toBeInTheDocument()
  })

  test('authentication successful, bad response', async () => {
    vi.mocked(axios.get).mockImplementation(async (url) => {
      await sleep(100)
      if (url.startsWith('/listings')) return { status: 200 }
      return { status: 404 }
    })

    render(<App />)

    expect(screen.getByText('Authenticating...')).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.queryByText('Authenticating...')).not.toBeInTheDocument(),
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument(),
    )

    expect(
      screen.getByText('Error: Invalid response format'),
    ).toBeInTheDocument()
  })

  test('authentication successful, good response, empty properties', async () => {
    vi.mocked(axios.get).mockImplementation(async (url) => {
      await sleep(100)
      if (url.startsWith('/listings')) return { status: 200, data: {} }
      return { status: 404 }
    })

    render(<App />)

    expect(screen.getByText('Authenticating...')).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.queryByText('Authenticating...')).not.toBeInTheDocument(),
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument(),
    )

    expect(screen.getByText('Data Tidak Tersedia')).toBeInTheDocument()
  })

  test('authentication successful, good response, some properties', async () => {
    vi.mocked(axios.get).mockImplementation(async (url) => {
      await sleep(100)
      if (url.startsWith('/listings'))
        return {
          status: 200,
          data: {
            listings: [
              {
                title: 'Dijual Rumah Besar',
              },
            ],
          },
        }
      return { status: 404 }
    })

    render(<App />)

    expect(screen.getByText('Authenticating...')).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.queryByText('Authenticating...')).not.toBeInTheDocument(),
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument(),
    )

    expect(screen.getByText('Dijual Rumah Besar')).toBeInTheDocument()
  })
})
