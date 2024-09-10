'use client'

import React, { FC, useState, useEffect, useRef, ChangeEvent } from 'react'
import LocationInput from '@/app/(client-components)/(HeroSearchForm2Mobile)/LocationInput'
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import GoogleMapReact from 'google-map-react'
import AnyReactComponent from '@/components/AnyReactComponent/AnyReactComponent'
import Label from '@/components/Label'
import FormItem from '../FormItem'
import Textarea from '@/shared/Textarea'

export interface PageAddListing2Props {
  inputs: { [key: string]: any }
  setInputs: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>
  autoFocus?: boolean
  propertyId: null | string
}

declare global {
  interface Window {
    initMap: () => void
  }
}

const PageAddListing2: FC<PageAddListing2Props> = ({
  inputs,
  setInputs,
  autoFocus = false,
  propertyId,
}) => {
  const [listingData, setListingData] = useState<any>(null)
  useEffect(() => {
    const listingDataString = localStorage.getItem(
      `desklink_listingData_${propertyId}`
    )
    const listingDataTemp = listingDataString
      ? JSON.parse(listingDataString)
      : {}
    setListingData(listingDataTemp)
  }, [])

  const [address, setAddress] = useState<any>(null)
  const [detailedAddress, setDetailedAddress] = useState(
    listingData?.address?.city
  )

  const primaryFilter = useAppSelector(
    (state: any) => state.filter.primaryFilter
  )
  const [lng, setLng] = useState(listingData?.adderss?.location?.coordinates[0])
  const [lat, setLat] = useState(listingData?.adderss?.location?.coordinates[1])

  // const dispatch=useAppDispatch();
  // dispatch()
  useEffect(() => {
    if (
      primaryFilter.coordinates[0] !== 77.669562 &&
      primaryFilter.coordinates[1] !== 12.922187
    ) {
      setLng(primaryFilter.coordinates[0])
      setLat(primaryFilter.coordinates[1])
    }
  }, [primaryFilter])

  useEffect(() => {
    console.log(listingData)
    console.log(
      listingData?.adderss?.location?.coordinates[1],
      listingData?.adderss?.location?.coordinates[0]
    )
    setLat(listingData?.address?.location?.coordinates[1])
    setLng(listingData?.address?.location?.coordinates[0])

    console.log(listingData?.address?.description)
    setInputs((values) => ({
      ...values,
      address: {
        ...values?.address,
        description: listingData?.address?.description,
      },
    }))
  }, [listingData])

  console.log(lat, lng)

  const containerStyle = {
    // position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '400px',
  }

  const reverseGeocode = async () => {
    const apiKey = 'AIzaSyA1SFxV6ilufdd-Q2oVt7Yd1_HTr3ulT1M'
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`

    try {
      const response = await fetch(geocodingUrl)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      if (data?.status === 'OK') {
        // console.log(data);
        setDetailedAddress(data?.results[0]?.formatted_address)
        setAddress(data?.results[0])
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  useEffect(() => {
    // setInputs(null);
    reverseGeocode()
  }, [lat, lng])

  useEffect(() => {
    console.log(address)

    const updatedAddress = {
      city: '',
      area: '',
      state: '',
      country: '',
      pin: '',
    }

    address?.address_components?.forEach((item: any) => {
      if (item.types.includes('locality')) {
        updatedAddress.city = item.long_name
      }

      if (item.types.includes('sublocality')) {
        updatedAddress.area = item.long_name
      }

      if (item.types.includes('administrative_area_level_1')) {
        updatedAddress.state = item.long_name
      }

      if (item.types.includes('country')) {
        updatedAddress.country = item.long_name
      }

      if (item.types.includes('postal_code')) {
        updatedAddress.pin = item.long_name
      }
    })

    setInputs((values) => ({
      ...values,
      address: {
        ...updatedAddress,
        description: listingData?.address?.description,
        detailedAddress: detailedAddress,
        location: { type: 'Point', coordinates: [lng, lat] },
      },
    }))
  }, [address])

  const handleDescriptionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({
      ...values,
      address: { ...values.address, description: value },
    }))
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Your property location</h2>
        <span className="w-14 border-b border-neutral-200 dark:border-neutral-700"></span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      <LocationInput headingText="Search Location" />

      <div style={containerStyle as any}>
        <Label className="font-bold">Detailed address</Label>
        <span className="block mt-1 mb-3 text-sm text-neutral-500 dark:text-neutral-400">
          {detailedAddress ||
            'Bellandur Gate Rd, Bellandur, Bengaluru, Karnataka 560103, India'}
        </span>
        <div>Coordinates: [{`${lat}, ${lng}`}]</div>
        <GoogleMapReact
          // style={containerStyle}
          defaultZoom={12}
          defaultCenter={{
            lat: 12.922187,
            lng: 77.669562,
          }}
          center={{
            lat: lat,
            lng: lng,
          }}
          bootstrapURLKeys={{
            key: 'AIzaSyBB4ACnJ7RDVATSfznyI0Z5Lxn4Rjdmjvk',
          }}
          yesIWantToUseGoogleMapApiInternals
          onDragEnd={(e) => console.log(e)}
        >
          {<AnyReactComponent lat={lat} lng={lng} />}
        </GoogleMapReact>
      </div>

      <FormItem
        label="Location description"
        desc="Your location is the silent storyteller of your listing. Craft a concise description that whispers the neighborhood's charm, setting the stage for an unforgettable experience. Let every word paint a picture that beckons guests to explore and savor the essence of your locale."
      >
        <Textarea
          id="desc"
          defaultValue={listingData?.address?.description}
          required
          placeholder="..."
          rows={6}
          name="description"
          onChange={handleDescriptionChange}
        />
      </FormItem>
    </>
  )
}

export default PageAddListing2
