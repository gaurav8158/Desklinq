import React, { FC } from 'react'
import GallerySlider from '@/components/GallerySlider'
import SaleOffBadge from '@/components/SaleOffBadge'
import Link from 'next/link'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { formatCurrency } from '@/function/fuction'

export interface BookingCardProps {
  className?: string
  ratioClass?: string
  data?: any
  size?: 'default' | 'small'
}

export const changeString = (givenStr: string): string => {
  return givenStr
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

const BookingCard: FC<BookingCardProps> = ({
  size = 'default',
  className = '',
  data,
  ratioClass = 'aspect-w-3 aspect-h-3',
}) => {
  const {
    property,
    customer,
    offerings,
    startTime,
    endTime,
    status,
    price,
    confirmationCode,
    statusHistory,
  } = data

  const href = `/listing-stay-detail/${offerings?.id}`

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full md:w-[30%] rounded-2xl overflow-hidden ">
        <GallerySlider
          uniqueID={`BookingCard_${property.id}`}
          ratioClass={ratioClass}
          galleryImgs={property.images}
          href={href}
        />
        {/* <BtnLikeIcon isLiked={like} className="absolute right-3 top-3" /> */}
      </div>
    )
  }

  const dateRender = (startDate: any, endDate: any, offeringType: string) => {
    const offering = offeringType == 'MEETING_ROOMS'
    let TimeObject = { startTime: '', endTime: '' }
    const fromDate = new Date(startDate)
    const toDate = new Date(endDate)
    if (offering) {
      TimeObject = {
        startTime: ` at ${startDate.split('T')[1].slice(0, 5)}`,
        endTime: ` at ${endDate.split('T')[1].slice(0, 5)}`,
      }
      let checkIn =
        fromDate.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
        }) || 'Add dates'
      let checkOut = toDate
        ? ' - ' +
          toDate.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
          })
        : ''

      return checkIn + TimeObject.startTime + checkOut + TimeObject.endTime
    }
  }

  const renderContent = () => {
    return (
      <div
        className={`px-3 w-full ${
          size === 'default' ? 'py-4 space-y-3' : 'p-3 space-y-1'
        }`}
      >
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div
              className={`font-medium capitalize ${
                size === 'default' ? 'text-base' : 'text-base'
              }`}
            >
              <span className="text-[25px]">{property.name}</span>
            </div>
            {status && (
              <SaleOffBadge
                className="absolute right-3 top-3"
                desc={`Status : ` + changeString(status)}
              />
            )}
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            {size === 'default' && <MapPinIcon className="w-4 h-4" />}
            <span className="text-xs line-clamp-1">
              {property.address.area}, {property.address.city}
            </span>
          </div>
        </div>
        <div className="border-b border-neutral-100 dark:border-neutral-800"></div>
        <div>{changeString(offerings.type)}</div>
        <div className="flex w-full justify-between items-center">
          <span className="text-base font-semibold">
            {dateRender(startTime, endTime, offerings.type)}
            {` `}
          </span>
        </div>
        <div className="flex w-full justify-between items-center">
          <span className="text-base font-semibold">
            {formatCurrency(price, offerings?.pricing[0].currency)}
            {` `}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={`nc-BookingCard md:flex relative ${className}`}>
      {renderSliderGallery()}
      <Link href={{ pathname: href }}>{renderContent()}</Link>
    </div>
  )
}

export default BookingCard
