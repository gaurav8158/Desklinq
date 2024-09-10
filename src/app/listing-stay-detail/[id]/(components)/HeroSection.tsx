import React, { FC } from 'react'
import { Offering } from '../offering.type'
import Badge from '@/shared/Badge'
import formatString from '@/function/StringFunctions'
import StartRating from '@/components/StartRating'
import Avatar from '@/shared/Avatar'

interface Props {
  offerings: Offering
}
const HeroSection: FC<Props> = ({ offerings }) => {
  const { property, address } = offerings

  return (
    <div className="listingSection__wrap !space-y-6">
      <div className="flex justify-between items-center">
        <Badge name={formatString(offerings.type) || 'Office spaces'} />
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
        {offerings.name}
      </h2>
      <div className="flex items-center space-x-4">
        <StartRating rating={property.rating} />
        <span>
          <i className="las la-map-marker-alt"></i>
          <span className="ml-1">
            {address.city}, {address.state}
          </span>
        </span>
      </div>

      <div className="flex items-center">
        <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
        <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
          Property:
          <span className="text-neutral-900 dark:text-neutral-200 font-medium">
            {property.name}
          </span>
        </span>
      </div>

      <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

      <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
        <div className="flex items-center space-x-3 ">
          <i className="las la-door-open text-2xl"></i>
          <span className="">{offerings?.name} </span>
        </div>

        {!(offerings?.type === 'VIRTUAL_OFFICE') && (
          <div className="flex items-center space-x-3">
            <i className=" las la-users text-2xl "></i>
            <span>
              <span className="hidden sm:inline-block">
                {offerings?.capacity}
                <span className="hidden sm:inline-block">
                  {offerings?.type == 'HOT_DESK' ? 'Desk' : 'Capacity'}
                </span>
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroSection
