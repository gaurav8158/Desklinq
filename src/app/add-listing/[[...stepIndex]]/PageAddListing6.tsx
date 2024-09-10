import ListingCard from '../ListingCard'
import { DEMO_STAY_LISTINGS } from '@/data/listings'
import React, { FC } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { EyeIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { Route } from '@/routers/types'

export interface PageAddListing6Props {}

const PageAddListing6: FC<PageAddListing6Props> = () => {
  console.log(DEMO_STAY_LISTINGS[0])
  const itemFromLocalStorage = localStorage.getItem('desklink_listingData')
  const listingData = itemFromLocalStorage
    ? JSON.parse(itemFromLocalStorage)
    : {}
  // const  = JSON.parse(localStorage.getItem("desklink_listingData"));

  const displayData = {
    offering: listingData?.offerings || '',
    name: listingData?.name || '',
    address:
      `${listingData?.address?.area}, ${listingData?.address?.city}, ${listingData?.address?.state}, ${listingData?.address?.country}` ||
      '',
    price: '$29',
    href: '',
    galleryImgs:
      listingData?.images && listingData.images[0]
        ? [listingData.images[0], listingData.images[1]]
        : [
            'https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/5998138/pexels-photo-5998138.jpeg?auto=compress&cs=tinysrgb&w=600',
          ],
    // galleryImgs: ["https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/5998138/pexels-photo-5998138.jpeg?auto=compress&cs=tinysrgb&w=600"],
  }

  console.log(displayData)

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Congratulations 🎉</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Excellent, congratulations on completing the listing, it is waiting to
          be reviewed for publication
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div>
        <h3 className="text-lg font-semibold">This is your listing</h3>
        <div className="max-w-xs">
          <ListingCard className="mt-8" data={displayData} />
        </div>
        <div className="flex items-center space-x-5 mt-8">
          <ButtonSecondary href={'/add-listing/1' as Route}>
            <PencilSquareIcon className="h-5 w-5" />
            <span className="ml-3">Edit</span>
          </ButtonSecondary>

          <ButtonPrimary>
            <EyeIcon className="h-5 w-5" />
            <span className="ml-3">Preview</span>
          </ButtonPrimary>
        </div>
      </div>
      {/*  */}
    </>
  )
}

export default PageAddListing6
