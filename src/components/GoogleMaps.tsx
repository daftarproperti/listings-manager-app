import { type Dispatch, type SetStateAction, useEffect } from 'react'
import { Status, Wrapper } from '@googlemaps/react-wrapper'
import useIsVisible from 'utils/useIsVisible'
import { Spinner } from '@material-tailwind/react'

export const DEFAULT_MAP_ZOOM = 14
export const DEFAULT_MAP_CENTER = { lat: -6.175403, lng: 106.824584 }

type GoogleMapsProps = {
  coord?: google.maps.LatLngLiteral
  setCoord: Dispatch<SetStateAction<google.maps.LatLngLiteral | undefined>>
  initialAddress?: string
}

export default function GoogleMaps({
  coord,
  setCoord,
  initialAddress,
}: GoogleMapsProps): JSX.Element {
  const [mapRef] = useIsVisible<HTMLDivElement>()

  const initMap = async (
    mapElement: HTMLElement,
    initialAddress?: string,
  ): Promise<void> => {
    const { Map } = (await google.maps.importLibrary(
      'maps',
    )) as google.maps.MapsLibrary
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker',
    )) as google.maps.MarkerLibrary

    let defaultCenter = {
      lat: coord?.lat ?? DEFAULT_MAP_CENTER.lat,
      lng: coord?.lng ?? DEFAULT_MAP_CENTER.lng,
    }

    if (initialAddress) {
      try {
        const { Geocoder } = (await google.maps.importLibrary(
          'geocoding',
        )) as google.maps.GeocodingLibrary
        const geocoder = new Geocoder()
        const geocodeResult = await geocoder.geocode({
          address: initialAddress,
        })
        if (geocodeResult.results.length > 0) {
          const location = geocodeResult.results[0].geometry.location
          setCoord({
            lat: location.lat(),
            lng: location.lng(),
          })
          defaultCenter = {
            lat: location.lat(),
            lng: location.lng(),
          }
        }
      } catch (error) {
        console.error(error)
      }
    }

    const maps = new Map(mapElement, {
      zoom: DEFAULT_MAP_ZOOM,
      center: defaultCenter,
      mapId: 'roadmap',
      disableDefaultUI: true,
      streetViewControl: true,
    })
    const marker = new AdvancedMarkerElement({
      map: maps,
      position: defaultCenter,
      gmpDraggable: true,
    })

    maps.addListener('click', (e: google.maps.MapMouseEvent) => {
      marker.position = e.latLng
      if (e.latLng !== null) {
        setCoord({
          lat: parseFloat(e.latLng.lat().toFixed(7)),
          lng: parseFloat(e.latLng.lng().toFixed(7)),
        })
      }
    })

    marker.addListener('dragend', () => {
      const position = marker.position as google.maps.LatLngLiteral
      setCoord({
        lat: parseFloat(position.lat.toFixed(7)),
        lng: parseFloat(position.lng.toFixed(7)),
      })
    })
  }

  const render = (status: Status) => {
    switch (status) {
      case Status.FAILURE:
        return <h2>Error</h2>
      case Status.LOADING:
        return (
          <div className="mt-3 flex h-96 w-full items-center justify-center bg-neutral-300">
            <Spinner />
          </div>
        )
      default:
        return <></>
    }
  }

  useEffect(() => {
    // initMap only gets called when component is rendered in the first time
    if (mapRef.current !== null) {
      initMap(mapRef.current, initialAddress)
    }
  }, [mapRef.current])

  return (
    <>
      <Wrapper
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}
        render={render}
      />
      <div ref={mapRef} className="mt-3 h-96 bg-neutral-300" />
    </>
  )
}
