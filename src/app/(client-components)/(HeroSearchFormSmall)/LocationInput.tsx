'use client'

import React, { useContext, useState } from 'react'
import { FC } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import useOutsideAlerter from '@/hooks/useOutsideAlerter'
import { ClockIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks'
import { updatePrimaryFilter } from '@/redux/filters/filterSlice'
import { SearchContext } from '@/app/layout'
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete'

export interface LocationInputProps {
  onInputDone?: (value: string) => void
  placeHolder?: string
  desc?: string
  className?: string
  divHideVerticalLineClass?: string
  autoFocus?: boolean
}

const LocationInput: FC<LocationInputProps> = ({
  autoFocus = false,
  onInputDone,
  placeHolder = 'Location',
  desc = 'city',
  className = 'nc-flex-1.5',
  divHideVerticalLineClass = 'left-10 -right-0.5',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const space = useAppSelector((state: any) => state.filter.primaryFilter.space)
  const [value, setValue] = useState('')
  const [showPopover, setShowPopover] = useState(autoFocus)

  useEffect(() => {
    setShowPopover(autoFocus)
    if (autoFocus && !!inputRef.current) {
      setTimeout(() => {
        inputRef.current && inputRef.current.focus()
      }, 200)
    }
  }, [autoFocus])

  useOutsideAlerter(containerRef, () => {
    setShowPopover(false)
  })

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showPopover])

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
  const [loadings, setLoading] = useState(false)
  const handleSelect = async (value: any) => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    setAddress(value)
    setCoordinates(latLng)
    setShowPopover(false)

    console.log(results)
  }

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
      setShowPopover(false)
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBB4ACnJ7RDVATSfznyI0Z5Lxn4Rjdmjvk`
      )

      const data = await response.json()
      console.log(data)
    } catch (error) {
      // Handle errors, e.g., permission denied
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(true)}
        className={`flex lg:flex-1 relative z-10 [ nc-hero-field-padding--small ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left ${
          showPopover ? 'nc-hero-field-focused--2' : ''
        }`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-1">
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
              <div>
                <input
                  autoFocus={showPopover}
                  {...getInputProps({
                    placeholder: 'Workspaces ...',
                    className:
                      'location-search-input block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-400 xl:text-base font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate',
                  })}
                />
                {showPopover && (
                  <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[400px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-5 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
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
                            {space} near me
                          </span>
                        </>
                      )}
                    </div>
                    {loading && (
                      <div className="flex px-4 sm:px-6 items-center space-x-3 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700">
                        Loading...
                      </div>
                    )}
                    {suggestions.map((suggestion) => {
                      const className =
                        'flex px-4 sm:px-6 items-center space-x-3 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer'
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                          })}
                          key={suggestion.index}
                        >
                          <span className="block text-neutral-400">
                            <MapPinIcon className="h-4 w-4 sm:h-6 sm:w-6" />
                          </span>
                          <span className="block text-neutral-700 dark:text-neutral-200">
                            {suggestion.description}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </PlacesAutocomplete>

          <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1">{!!value ? placeHolder : desc}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default LocationInput

export const _renderLoading = () => {
  return (
    <>
      <svg
        className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-6 sm:w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <div className="flex-1">Loading...</div>
    </>
  )
}
