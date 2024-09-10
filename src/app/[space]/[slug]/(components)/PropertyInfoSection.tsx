import StartRating from '@/components/StartRating'
import Avatar from '@/shared/Avatar'
import ButtonSecondary from '@/shared/ButtonSecondary'
import Link from 'next/link'
import React, { FC } from 'react'
import { Property } from '../offering.type'
import { Route } from 'next'

interface Props {
  property: Property
}

const PropertyInfoSection: FC<Props> = ({ property }) => {
  const { name, rating, offerings, description, id } = property

  return (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">Property Information</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      <div className="flex items-center space-x-4">
        <Avatar
          hasChecked
          hasCheckedClass="w-4 h-4 -top-0.5 right-0.5"
          sizeClass="h-14 w-14"
          radius="rounded-full"
        />
        <div>
          <a className="block text-xl font-medium" href="##">
            {name}
          </a>
          <div className="mt-1.5 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
            <StartRating rating={rating} />
            <span className="mx-2">·</span>
            <span>Offerings: {offerings.length}</span>
          </div>
        </div>
      </div>

      <span className="block 0">
        <div
          dangerouslySetInnerHTML={{
            __html: description.replace(/\n/g, '<br>'),
          }}
        />
      </span>

      <ButtonSecondary>
        <Link href={`/property/${id}` as Route}>View Property</Link>
      </ButtonSecondary>
    </div>
  )
}

export default PropertyInfoSection
