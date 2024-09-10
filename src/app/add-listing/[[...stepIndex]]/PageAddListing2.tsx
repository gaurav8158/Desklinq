'use client'

import React, { ChangeEvent, FC, use, useState } from 'react'
import { MapPinIcon } from '@heroicons/react/24/solid'
import LocationMarker from '@/components/AnyReactComponent/LocationMarker'
import Label from '@/components/Label'
import GoogleMapReact from 'google-map-react'
import ButtonSecondary from '@/shared/ButtonSecondary'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import FormItem from '../FormItem'
import Textarea from '@/shared/Textarea'

export interface PageAddListing2Props {
  inputs?: any
  setInputs?: any
}

const PageAddListing2: FC<PageAddListing2Props> = ({ inputs, setInputs }) => {
  // const [inputs, setInputs] = useState({});
  const [coords, setCoords] = useState([0, 0])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values: any) => ({ ...values, [name]: value }))
  }

  const handleCoordinates = (e: any) => {
    const name = e.target.name
    name === 'long'
      ? setCoords([e.target.value, coords[1]])
      : setCoords([coords[0], e.target.value])

    setInputs((values: any) => ({
      ...values,
      location: {
        type: 'Point',
        coordinates: coords,
      },
    }))
  }

  // const handlePrint = () => {
  //   setInputs(values => ({
  //     ...values,
  //     "location": {
  //       "type": "Point",
  //       "coordinates": coords
  //     }
  //   }));

  //   const data = JSON.parse(localStorage.getItem("desklink_listingData"));
  //   data.address = inputs;
  //   localStorage.setItem("desklink_listingData", JSON.stringify(data));

  //   console.log(JSON.parse(localStorage.getItem("desklink_listingData")));
  // }

  return (
    <>
      <h2 className="text-2xl font-semibold">Your property location</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      {/* FORM */}
      <div className="space-y-8">
        <ButtonSecondary>
          <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
          <span className="ml-3">Use current location</span>
        </ButtonSecondary>

        {/* ITEM */}
        <FormItem label="Country/Region">
          <Select name="country" onChange={handleChange}>
            <option value="none" style={{ display: 'none' }}>
              -- Select one --
            </option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="France">France</option>
            <option value="Singapore">Singapore</option>
            <option value="Jappan">Jappan</option>
            <option value="Korea">Korea</option>
            <option value="...">...</option>
          </Select>
        </FormItem>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <FormItem label="Area">
            <Input name="area" onChange={handleChange} />
          </FormItem>
          <FormItem label="Landmark">
            <Input name="landmark" onChange={handleChange} />
          </FormItem>
        </div>

        <FormItem label="House Number/Name">
          <Input name="houseNumber" onChange={handleChange} />
        </FormItem>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
          <FormItem label="City">
            <Input name="city" onChange={handleChange} />
          </FormItem>
          <FormItem label="State">
            <Input name="state" onChange={handleChange} />
          </FormItem>
          <FormItem label="Postal code">
            <Input type="number" name="pin" onChange={handleChange} />
          </FormItem>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <FormItem label="Longitude">
            <Input type="number" name="long" onChange={handleCoordinates} />
          </FormItem>
          <FormItem label="Latitude">
            <Input type="number" name="lat" onChange={handleCoordinates} />
          </FormItem>
        </div>

        <FormItem label="Location Description">
          <Textarea
            placeholder="..."
            rows={5}
            name="description"
            onChange={handleChange}
          />
        </FormItem>

        {/* <button onClick={handlePrint}>Print</button> */}

        <div>
          <Label>Detailed address</Label>
          <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            1110 Pennsylvania Avenue NW, Washington, DC 20230
          </span>
          <div className="mt-4">
            <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
              <div className="rounded-xl overflow-hidden">
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: 'AIzaSyBB4ACnJ7RDVATSfznyI0Z5Lxn4Rjdmjvk',
                  }}
                  yesIWantToUseGoogleMapApiInternals
                  defaultZoom={15}
                  defaultCenter={{
                    lat: 55.9607277,
                    lng: 36.2172614,
                  }}
                >
                  <LocationMarker lat={55.9607277} lng={36.2172614} />
                </GoogleMapReact>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageAddListing2
