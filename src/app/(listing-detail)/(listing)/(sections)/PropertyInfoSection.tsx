import StartRating from '@/components/StartRating'
import { PropertyData } from '@/data/lisiting-details'
import Avatar from '@/shared/Avatar'
import ButtonSecondary from '@/shared/ButtonSecondary'
import Link from 'next/link'
import React, { FC } from 'react'

interface Props {
  property: PropertyData
}
const PropertyInfoSection: FC<Props> = ({ property }) => {
  return (
    <div className="listingSection__wrap">
      {/* HEADING */}
      <h2 className="text-2xl font-semibold">Property Information</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      {/* host */}
      <div className="flex items-center space-x-4">
        <Avatar
          hasChecked
          hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
          sizeClass="h-14 w-14"
          radius="rounded-full"
        />
        <div>
          <a className="block text-xl font-medium" href="##">
            {property?.name}
          </a>
          <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
            <StartRating rating={property?.rating} />
            <span className="mx-2">·</span>

            <span>Offerings: {property?.offerings.length}</span>
          </div>
        </div>
      </div>

      {/* desc */}
      <span className="block text-neutral-6000 dark:text-neutral-300">
        {property?.description}
      </span>

      <ButtonSecondary>
        <Link
          href={{
            pathname: '/property',
            query: {
              propertyId: property.id,
            },
          }}
        >
          View Property
        </Link>
      </ButtonSecondary>
    </div>
  )
}

export default PropertyInfoSection
