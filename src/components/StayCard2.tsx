import React, { FC } from 'react'
import GallerySlider from '@/components/GallerySlider'
import StartRating from '@/components/StartRating'
import Link from 'next/link'
import {
  OfferingType,
  PropertiesDataType,
  offeringsListingType,
} from '@/type/propertiesTypes'
import { formatCurrency } from '@/function/fuction'
import SaleOffBadge from './SaleOffBadge'
import Badge from '@/shared/Badge'
import { useRouter } from 'next/navigation'
import { ArrowRight, Clock, MapPinLine, Star } from 'phosphor-react'

export interface StayCard2Props {
  className?: string
  data?: offeringsListingType
  size?: 'default' | 'small'
  offering?: OfferingType
}
const StayCard2: FC<StayCard2Props> = (props) => {
  const { size = 'default', className = '', data, offering } = props

  if (!data) {
    return null
  }
  console.log(data)
  const {
    images,
    address,
    name,
    rating,
    _id,
    property,
    capacity,
    type,
    pricing,
    distance,
    AvailabilityStatus,
    slug,
  } = data

  const href = `/${type.toLowerCase().replace('_', '-')}/${slug}`

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard2_${_id}`}
          ratioClass="aspect-w-12 aspect-h-11"
          galleryImgs={images}
          imageClass="rounded-md"
          href={href}
        />
        <Badge
          name="⭐ Most Popular"
          className="absolute text-white text-sm left-0 top-0 rounded-sm rounded-tl-md bg-violet-800 "
        />
        <Badge
          name={`${Math.round((distance / 1000) * 10) / 10} Km away`}
          color="gray"
          className="absolute text-white right-3 bottom-4 rounded-sm bg-[#FFFFFF4D] bg-opacity-[30%]"
        />

        {/* {AvailabilityStatus === 'Booked' && (
          <Badge
            name={'Sold out'}
            color="red"
            className="absolute right-3 top-3"
          />
        )} */}
      </div>
    )
  }
  const openTime = property?.openingHours?.[0]?.openTime
  const closeTime = property?.openingHours?.[0]?.closeTime
  const renderContent = () => {
    return (
      <div className={size === 'default' ? 'mt-3 space-y-3' : 'mt-2 space-y-2'}>
        <div className="space-y-2">
          <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
            {type
              .replace(/_/g, ' ')
              .toLowerCase()
              .replace(/\b\w/g, (char: any) => char.toUpperCase())}{' '}
            · {capacity} capacity
          </span>
          <div className="flex items-center space-x-2">
            <h2
              className={`font-semibold capitalize text-neutral-900 dark:text-white ${
                size === 'default' ? 'text-base' : 'text-base'
              }`}
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <span className="line-clamp-1 text-sm">{property?.name}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
            {size === 'default' && <MapPinLine size={20} />}
            <span className="text-xs truncate mt-[2px]">
              {address?.area}, {address?.city}
              {/* <div className="truncate line-clamp-2">
                
              </div> */}
            </span>
          </div>
          <div className="h-[10px]">
            {openTime && (
              <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
                {size === 'default' && <Clock size={20} />}
                <span className="text-xs truncate mt-[2px]">
                  {openTime}-{closeTime}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-sm flex gap-1 font-semibold">
            {formatCurrency(pricing[0]?.price, pricing[0]?.currency)}
            {size === 'default' && (
              <span className="text-sm  ">
                <span className="mr-1 ">/</span>
                {pricing[0]?.duration?.toLowerCase()}
              </span>
            )}
          </span>
          <button className="text-[#6115E7] flex items-center gap-[4px] font-bold underline text-sm">
            Book Now <ArrowRight size={14} />
          </button>
          {!!rating && <StartRating rating={rating} />}
        </div>
      </div>
    )
  }

  return (
    <div className={`nc-StayCard2 group relative ${className}`}>
      {renderSliderGallery()}
      <Link href={{ pathname: href }}>{renderContent()}</Link>
    </div>
  )
}

export default StayCard2
