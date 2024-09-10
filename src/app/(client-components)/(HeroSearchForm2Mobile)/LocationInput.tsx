'use client'

import { useAppDispatch, useAppSelector } from '@/redux/app/hooks'
import { updatePrimaryFilter } from '@/redux/filters/filterSlice'
import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { ClockIcon } from '@heroicons/react/24/solid'
import React, { useState, useEffect, useRef, FC } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete'
import { _renderLoading } from '../(HeroSearchFormSmall)/LocationInput'
interface Props {
  onClick?: () => void
  onChange?: (value: string) => void
  className?: string
  defaultValue?: string
  headingText?: string
}

const LocationInput: FC<Props> = ({
  onChange = () => {},
  className = '',
  defaultValue = 'United States',
  headingText = 'Where to?',
}) => {
  const [value, setValue] = useState('')
  const containerRef = useRef(null)
  const inputRef = useRef(null)
  const space = useAppSelector((state: any) => state.filter.primaryFilter.space)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const handleSelectLocation = (item: string) => {
    // DO NOT REMOVE SETTIMEOUT FUNC
    setTimeout(() => {
      setValue(item)
      onChange && onChange(item)
    }, 0)
  }

  const dispatch = useAppDispatch()
  const [coordinates, setCoordinates] = useState<{
    lat: null | number
    lng: null | number
  }>({ lat: null, lng: null })

  useEffect(() => {
    if (coordinates?.lat && coordinates?.lng)
      dispatch(
        updatePrimaryFilter({
          coordinates: [coordinates?.lng, coordinates?.lat],
        })
      )
  }, [coordinates])
  const [address, setAddress] = useState('')
  const handleSelect = async (value: any) => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    setAddress(value)
    setCoordinates(latLng)
  }

  const [loadings, setLoading] = useState(false)
  const LocationGetter = async () => {
    setLoading(true)
    try {
      const position: GeolocationPosition = await new Promise(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject)
        }
      )
      const { latitude, longitude } = position.coords
      setCoordinates({ lat: latitude, lng: longitude })
      setAddress('My Location')
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBB4ACnJ7RDVATSfznyI0Z5Lxn4Rjdmjvk`
      )

      const data = await response.json()
    } catch (error) {
      // Handle errors, e.g., permission denied
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`${className}`} ref={containerRef}>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {headingText}
        </span>
        <div className="relative mt-5">
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div key="1">
                <input
                  {...getInputProps({
                    placeholder: 'Workspaces ...',
                    className: `block w-full bg-transparent border px-4 py-3 pr-12 border-neutral-900 dark:border-neutral-200 rounded-xl focus:ring-0 focus:outline-none text-base leading-none placeholder-neutral-500 dark:placeholder-neutral-300 truncate font-bold placeholder:truncate`,
                  })}
                />
                <div className="mt-7">
                  <p className="block font-semibold text-base">
                    {'Search Spaces'}
                  </p>
                  <div className="mt-3">
                    <div
                      className="flex px-4 sm:px-6 items-center space-x-3 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                      onClick={LocationGetter}
                    >
                      {loadings ? (
                        _renderLoading()
                      ) : (
                        <>
                          <ClockIcon className="h-4 w-4 sm:h-6 sm:w-6" />
                          <span className="block text-neutral-700 dark:text-neutral-200">
                            {space} Near me
                          </span>
                        </>
                      )}
                    </div>
                    {loading && (
                      <div className="py-2 mb-1 flex items-center space-x-3 text-sm">
                        Loading...
                      </div>
                    )}
                    {suggestions.map((suggestion) => {
                      const className =
                        'py-2 mb-1 flex items-center space-x-3 text-sm'
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                          })}
                          key={suggestion.index}
                        >
                          <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400 cursor-pointer" />
                          <span className="block text-neutral-700 dark:text-neutral-200 cursor-pointer">
                            {suggestion.description}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
      </div>
    </div>
  )
}

export default LocationInput
