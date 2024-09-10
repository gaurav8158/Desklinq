import AnyReactComponent from '@/components/AnyReactComponent/AnyReactComponent'
import React, { FC } from 'react'

import GoogleMapReact from 'google-map-react'
import { OfferingData, PropertyData } from '@/data/lisiting-details'

interface Props {
  offerings: OfferingData
  property: PropertyData
}
const LocationSection: FC<Props> = ({ offerings, property }) => {
  return (
    <div className="listingSection__wrap">
      {/* HEADING */}
      <div>
        <h2 className="text-2xl font-semibold">Location</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          {property?.address?.houseNumber}, {property?.address?.city},{' '}
          {property?.address.state}, {property?.address?.country},{' '}
          {property?.address?.pin}
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

      {/* MAP */}
      <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
        <div className="rounded-xl overflow-hidden z-0">
          {offerings?.address.location.coordinates && (
            <GoogleMapReact
              defaultZoom={16}
              center={{
                lat: offerings?.address.location.coordinates[1] || 0,
                lng: offerings?.address.location.coordinates[0] || 0,
              }}
              bootstrapURLKeys={{
                key: 'AIzaSyBB4ACnJ7RDVATSfznyI0Z5Lxn4Rjdmjvk',
              }}
              yesIWantToUseGoogleMapApiInternals
              draggable={false}
            >
              {
                <AnyReactComponent
                  lat={offerings?.address.location.coordinates[1]}
                  lng={offerings?.address.location.coordinates[0]}
                  // userAvtar={true}
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
