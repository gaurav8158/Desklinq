import React, { FC } from 'react'
import GallerySlider from '@/components/GallerySlider'
import StartRating from '@/components/StartRating'
import BtnLikeIcon from '@/components/BtnLikeIcon'
import Badge from '@/shared/Badge'
import Link from 'next/link'
import { changeString, dateRender, formatCurrency } from '@/function/fuction'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonThird from '@/shared/ButtonThird'
import { toast } from 'react-toastify'
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'

export interface PropertyCardHProps {
  className?: string
  data?: any
  cancelBooking?: (id: string) => void
}

const PropertyCardH: FC<PropertyCardHProps> = ({
  className = '',
  data,
  cancelBooking,
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
    capacity,
    id,
  } = data

  const href = `/listing-stay-detail/${offerings?.id}`
  const renderSliderGallery = () => {
    return (
      <div className="flex-shrink-0 p-3 w-full sm:w-64 ">
        <GallerySlider
          ratioClass="aspect-w-1 aspect-h-1"
          className="w-full h-full rounded-2xl overflow-hidden"
          galleryImgs={offerings?.images}
          uniqueID={`BookingCard_${property?.id}`}
          href={href}
        />
      </div>
    )
  }

  const copyContent = async () => {
    try {
      let text = document?.getElementById('myText')?.innerHTML || ''
      await navigator.clipboard.writeText(text)
      // (()=>{toast.success('Copied to clipboard')})();
      // console.log('Content copied to clipboard');
    } catch (err) {
      // console.error('Failed to copy: ', err);
    }
  }

  const renderTienIch = () => {
    return (
      <div className="w-full md:inline-grid md:grid-cols-2 gap-1">
        <div className="flex items-center space-x-1">
          <span className="inline-block">
            <i className="las la-map-pin text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {property?.address?.area}, {property?.address?.city}
          </span>
        </div>
        {/* ---- */}
        <div className="flex items-center space-x-1">
          <span className="inline-block">
            <i className="las la-calendar text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {dateRender(startTime, offerings?.type)}
            <br />
            {dateRender(endTime, offerings?.type)}
          </span>
        </div>
        {/* ---- */}
        <div className="flex items-center space-x-1">
          <span className="inline-block">
            <i className="text-sm las la-user-friends"></i>
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {capacity}
          </span>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:pr-6 flex flex-col items-start">
        <div className="space-y-4 w-full">
          <div className="md:inline-flex md:space-x-3">
            <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-user-friends"></i>
                  <span className="ml-1">{changeString(offerings?.type)}</span>
                </div>
              }
              color="yellow"
            />
            <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-share-alt"></i>
                  <span className="ml-1">Status :</span>
                  <span className="ml-1">{changeString(status)}</span>
                </div>
              }
              // , 'UNAVAILABLE', 'CHECKED_OUT', 'IN_PROGRESS'
              color={
                status === 'BOOKED'
                  ? 'green'
                  : status == 'CANCELLED'
                    ? 'gray'
                    : 'red'
              }
            />
          </div>
          <div className="flex items-center space-x-2">
            {/* {isAds && <Badge name="ADS" color="green" />} */}
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-2">{property?.name}</span>
            </h2>
          </div>
          {renderTienIch()}
          <div className="w-14 border-b border-neutral-200/80 dark:border-neutral-700 "></div>
          <div className="flex w-full justify-between items-end">
            {/* <StartRating  rating={property?.rating} /> */}
            <div className="flex justify-center items-center text-sm font-medium">
              <div
                className="flex items-center justify-center px-4 py-1.5 border-2 rounded-lg leading-none text-sm font-medium bg-gray-200 border-gray-300 ml-2 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 cursor-pointer"
                id="myText"
                onClick={copyContent}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                  />
                </svg>
                {confirmationCode}
              </div>
            </div>
            <span className="flex items-center justify-center px-2.5 py-1.5 border-2 border-secondary-500 rounded-lg leading-none text-sm font-medium text-secondary-500">
              {formatCurrency(price, offerings?.pricing[0]?.currency)}
            </span>
          </div>
          <div className="flex w-full justify-end items-end">
            {cancelBooking && !(status === 'CANCELLED') && (
              <div className="flex justify-center items-center text-sm font-medium">
                <button
                  className="text-sm font-medium rounded-xl p-2 px-2 bg-red-500 text-white"
                  // className="text-sm font-medium p-2"
                  onClick={() => cancelBooking(id)}
                >
                  {'Cancel Booking'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link href={`/pay-done?bookingId=${data.id}`}>
      <div
        className={`nc-PropertyCardH group relative bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 rounded-3xl overflow-hidden ${className}`}
      >
        <div className="h-full w-full flex flex-col sm:flex-row sm:items-center">
          {renderSliderGallery()}
          {renderContent()}
        </div>
      </div>
    </Link>
  )
}

export default PropertyCardH
