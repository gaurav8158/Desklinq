'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ListingCard from '../components/ListingCard'
import { useAppSelector } from '@/redux/app/hooks'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Heading from '@/shared/Heading'
import LoadingIndicator from '@/components/LoadingIndicator'
import { useTour } from '@reactour/tour'
import { createPropertySteps } from '@/config/tourGuide/tourGuideSteps'

const Page = () => {
  const userData = useAppSelector((state) => state.userData)
  const [listings, setListings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { setIsOpen, setSteps, setCurrentStep } = useTour()

  useEffect(() => {
    setCurrentStep(0)
    setSteps(createPropertySteps)
  }, [setCurrentStep, setSteps])

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)

        const res = await fetch(
          `https://api-dev.desklinq.com/v1/properties?cacheBuster=${Date.now()}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        const listingData = await res.json()
        setListings(listingData.data)
      } catch (err) {
        console.error('Error fetching', err)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return (
    <div className="min-h-[95vh]">
      <Heading isCenter={true} className="pt-8 mb-8">
        My Properties
      </Heading>
      <div className="flex justify-between items-center">
        <Link href="/dashboard/add-property" data-tour-property="step-2">
          <ButtonPrimary
            sizeClass="px-6 py-3 lg:px-8 lg:py-4 rounded-xl"
            fontSize="text-sm sm:text-base lg:text-lg font-medium"
          >
            <i className="las la-plus-circle text-xl mr-2.5"></i> Add Property
          </ButtonPrimary>
        </Link>
        <button
          title="Need help?"
          data-tour-property="step-1"
          onClick={() => setIsOpen(true)}
          className="need-help-btn text-blue-500 underline text-lg border-0 outline-0"
        >
          Need help?
        </button>
      </div>

      {isLoading && <LoadingIndicator className="mt-20" />}

      <div className="grid gap-20 md:gap-12 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {listings
          .filter((listing) => listing.vendor === userData.user.id)
          .map((listing, index) => {
            return (
              <ListingCard
                key={index}
                data-tour-property="step-3"
                className="mt-8 property-card"
                data={{
                  type: 'property',
                  propertyId: listing.id,
                  vendorId: listing.vendor,
                  name: listing.name,
                  description: listing.description,
                  address: `${listing.address.area}, ${listing.address.city}, ${listing.address.state}, ${listing.address.country}`,
                  status: listing.status,
                  rating: listing.rating,
                  href: `/dashboard/my-offerings`,
                  galleryImgs: listing.images,
                }}
              />
            )
          })}
      </div>
    </div>
  )
}

export default Page
