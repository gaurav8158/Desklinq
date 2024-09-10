'use client'

import { Transition } from '@headlessui/react'
import StayCard from '@/components/StayCard'
import React, { FC, Fragment } from 'react'
import { useState } from 'react'
import { OfferingType, offeringsListingType } from '@/type/propertiesTypes'
import LocationPointer from '@/images/LocationPointer.svg'
import Image, { StaticImageData } from 'next/image'
import Avatar from '@/shared/Avatar'

export interface AnyReactComponentProps {
  className?: string
  listing?: offeringsListingType
  isSelected?: boolean
  lat: number
  lng: number
  offering?: OfferingType
  userAvtar?: boolean
}

const AnyReactComponent: FC<AnyReactComponentProps> = ({
  className = '',
  listing,
  isSelected,
  offering,
  userAvtar = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`nc-AnyReactComponent relative  ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span
        className={`flex rounded-lg text-sm font-semibold items-center justify-center min-w-max transition-colors ${
          isSelected ? 'scale-150 transition ease-in-out duration-500 ' : ''
        }`}
      >
        {userAvtar ? (
          <div className="hover:transition-opacity hover:duration-75">
            <Avatar sizeClass="w-10 h-10" />
          </div>
        ) : (
          <Image
            src={LocationPointer}
            alt=""
            className="absolute -top-[30px]"
          />
        )}
      </span>
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute z-50 bottom-full pb-3 -left-12 w-[260px] aspect-w-1">
          {listing && (
            <StayCard size="small" data={listing} className="shadow-2xl" />
          )}
        </div>
      </Transition>
    </div>
  )
}

export default AnyReactComponent
