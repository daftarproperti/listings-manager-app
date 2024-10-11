import { type Dispatch, type SetStateAction, useEffect } from 'react'
import { Status, Wrapper } from '@googlemaps/react-wrapper'
import useIsVisible from 'utils/useIsVisible'
import { Spinner } from '@material-tailwind/react'

const DEFAULT_MAP_ZOOM = 14
const DEFAULT_MAP_CENTER = { lat: -6.175403, lng: 106.824584 }

type GoogleMapsProps = {
  coord?: google.maps.LatLngLiteral
  setCoord: Dispatch<SetStateAction<google.maps.LatLngLiteral>>
}

export default function GoogleMaps({
  coord,
  setCoord,
}: GoogleMapsProps): JSX.Element {
  const [mapRef] = useIsVisible<HTMLDivElement>()
  const [inputRef] = useIsVisible<HTMLInputElement>()

  const initMap = async (
    mapElement: HTMLElement,
    inputElement: HTMLInputElement,
  ): Promise<void> => {
    const { Map } = (await google.maps.importLibrary(
      'maps',
    )) as google.maps.MapsLibrary
    const { SearchBox } = (await google.maps.importLibrary(
      'places',
    )) as google.maps.PlacesLibrary
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      'marker',
    )) as google.maps.MarkerLibrary

    const defaultCenter = {
      lat: coord?.lat ?? DEFAULT_MAP_CENTER.lat,
      lng: coord?.lng ?? DEFAULT_MAP_CENTER.lng,
    }

    const maps = new Map(mapElement, {
      zoom: DEFAULT_MAP_ZOOM,
      center: defaultCenter,
      mapId: 'roadmap',
      disableDefaultUI: true,
      streetViewControl: true,
    })
    const searchBox = new SearchBox(inputElement)
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

    maps.addListener('bounds_changed', () => {
      searchBox.setBounds(maps.getBounds() as google.maps.LatLngBounds | null)
    })

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces()
      if (places?.length === 0) {
        return
      }

      const bounds = new google.maps.LatLngBounds()
      places?.forEach((place) => {
        if (place.geometry?.location == null) {
          // Returned place contains no geometry
          return
        }
        if (place.geometry.viewport != null) {
          bounds.union(place.geometry.viewport)
        } else {
          bounds.extend(place.geometry.location)
        }

        marker.position = place.geometry.location
        setCoord({
          lat: parseFloat(place.geometry.location.lat().toFixed(7)),
          lng: parseFloat(place.geometry.location.lng().toFixed(7)),
        })
      })
      maps.fitBounds(bounds)
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
    if (mapRef.current !== null && inputRef.current !== null) {
      initMap(mapRef.current, inputRef.current)
    }
  }, [mapRef.current, inputRef.current])

  return (
    <>
      <input
        type="text"
        ref={inputRef}
        placeholder="Ketik alamat untuk mencari koordinat"
        className="relative mt-2 h-10 w-full whitespace-nowrap rounded-[7px] border border-solid border-blue-gray-200 bg-white px-3 py-2.5 text-sm leading-7 text-gray-800 focus:border-gray-900 focus:outline-none disabled:bg-blue-gray-50"
      />
      <Wrapper
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}
        render={render}
      />
      <div ref={mapRef} className="mt-3 h-96 bg-neutral-300" />
    </>
  )
}
