import React, { FC } from 'react'
import GallerySlider from '@/components/GallerySlider'
import StartRating from '@/components/StartRating'
import Link from 'next/link'
import { OfferingType, PropertiesDataType } from '@/type/propertiesTypes'

export interface StayCard2Props {
  className?: string
  data?: PropertiesDataType
  size?: 'default' | 'small'
  offering?: OfferingType
}
const PropertyCard: FC<StayCard2Props> = (props) => {
  const { size = 'default', className = '', data, offering } = props

  if (!data) {
    return null
  }
  const { images, address, name, rating, _id } = data

  const href = `/listing-stay-detail/${offering?.id}`
  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard2_${_id}`}
          ratioClass="aspect-w-12 aspect-h-11"
          galleryImgs={images}
          imageClass="rounded-lg"
          href={href}
        />
        {/* <BtnLikeIcon isLiked={like} className="absolute right-3 top-3 z-[1]" />
        {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
      </div>
    )
  }
  const renderContent = () => {
    return (
      <div className={size === 'default' ? 'mt-3 space-y-3' : 'mt-2 space-y-2'}>
        <div className="space-y-2">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {offering?.type
              .replace(/_/g, ' ')
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}{' '}
            · {offering?.capacity} capacity
          </span>
          <div className="flex items-center space-x-2">
            {/* {isAds && <Badge name="ADS" color="green" />} */}
            <h2
              className={`font-semibold capitalize text-neutral-900 dark:text-white ${
                size === 'default' ? 'text-base' : 'text-base'
              }`}
            >
              <span className="line-clamp-1">{name}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
            {size === 'default' && (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
            <span className="text-xs">
              {address.area},{' '}
              <div className="truncate line-clamp-2">{address.city}</div>
            </span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            {offering?.pricing[0].currency} {offering?.pricing[0].price}
            {` `}
            {size === 'default' && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /{offering?.pricing[0].duration?.toLowerCase()}
              </span>
            )}
          </span>
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

export default PropertyCard
