'use client'
import React, { FC } from 'react'
import GoogleMapReact from 'google-map-react'
import AnyReactComponent from '@/components/AnyReactComponent/AnyReactComponent'
import { Address } from '../offering.type'

interface Props {
  address: Address
}

const LocationSection: FC<Props> = ({ address }) => {
  return (
    <div className="listingSection__wrap">
      <div>
        <h2 className="text-2xl font-semibold">Location</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          {address?.houseNumber + `,`} {address?.city},{address?.state},{' '}
          {address?.country},{address?.pin}
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
        <div className="rounded-xl overflow-hidden z-0">
          {address.location.coordinates && (
            <GoogleMapReact
              defaultZoom={16}
              center={{
                lat: address.location.coordinates[1] || 0,
                lng: address.location.coordinates[0] || 0,
              }}
              bootstrapURLKeys={{
                key: 'AIzaSyBB4ACnJ7RDVATSfznyI0Z5Lxn4Rjdmjvk',
              }}
              yesIWantToUseGoogleMapApiInternals
              draggable={false}
            >
              {
                <AnyReactComponent
                  lat={address.location.coordinates[1]}
                  lng={address.location.coordinates[0]}
                />
              }
            </GoogleMapReact>
          )}
        </div>
      </div>
    </div>
  )
}

export default LocationSection
