import ListingCard from '../ListingCard'
import { DEMO_STAY_LISTINGS } from '@/data/listings'
import React, { FC } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { EyeIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { Route } from '@/routers/types'

export interface PageAddListing5Props {
  inputs: { [key: string]: any }
  setInputs: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>
  propertyId: null | string
}

interface Address {
  area: string
  city: string
  state: string
  country: string
}

interface ListingData {
  offerings: string
  description: string
  name: string
  address: Address
  price: string
  images: [string]
}

interface DisplayData {
  name: string
  description: string
  address: string
  href: string
  galleryImgs: string[]
}

const PageAddListing5: FC<PageAddListing5Props> = ({
  inputs,
  setInputs,
  propertyId,
}) => {
  const listingDataString = localStorage.getItem(
    `desklink_listingData_${propertyId}`
  )
  const listingData = listingDataString ? JSON.parse(listingDataString) : {}

  const displayData: DisplayData = {
    name: listingData?.name || '',
    description: listingData?.description || '',
    address: listingData?.address?.detailedAddress || '',
    href: '',
    galleryImgs: listingData?.images
      ? listingData.images
      : [
          'https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=600',
          'https://images.pexels.com/photos/5998138/pexels-photo-5998138.jpeg?auto=compress&cs=tinysrgb&w=600',
        ],
  }

  console.log('listingData', displayData)

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
          <ButtonSecondary href={'/dashboard/add-property/1' as Route}>
            <PencilSquareIcon className="h-5 w-5" />
            <span className="ml-3">Edit</span>
          </ButtonSecondary>

          {/* <ButtonPrimary>
            <EyeIcon className="h-5 w-5" />
            <span className="ml-3">Preview</span>
          </ButtonPrimary> */}
        </div>
      </div>
      {/*  */}
    </>
  )
}

export default PageAddListing5
