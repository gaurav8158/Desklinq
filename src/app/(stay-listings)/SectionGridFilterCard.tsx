'use client'

import React, { FC, useEffect } from 'react'
import TabFilters from './TabFilters'
import Heading2 from '@/shared/Heading2'
import StayCard2 from '@/components/StayCard2'
import { offeringsListingType } from '@/type/propertiesTypes'
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks'
import { fetchListing } from '@/redux/listing/listingSlice'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { updatePrimaryFilter } from '@/redux/filters/filterSlice'

export interface SectionGridFilterCardProps {
  className?: string
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({
  className = '',
}) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchListing())
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const offerings: offeringsListingType[] = useAppSelector(
    (state: any) => state.listing?.data
  )
  const primaryFilter = useAppSelector(
    (state: any) => state.filter.primaryFilter
  )

  const showMore = () => {
    dispatch(updatePrimaryFilter({ page: primaryFilter.page + 1 }))
    dispatch(fetchListing())
  }

  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2
        numOfListing={offerings?.length}
        capacity={primaryFilter?.minCapacity}
        heading={`${primaryFilter?.space}`}
        fromDate={primaryFilter?.dateTime?.fromDate}
        toDate={primaryFilter?.dateTime?.toDate}
      />

      <div className="mb-8 lg:mb-11">
        <TabFilters />
      </div>
      {offerings?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {offerings.map((item: offeringsListingType) => (
              <StayCard2 data={item} key={item._id} />
            ))}
          </div>
          {offerings.length % 12 === 0 && (
            <div className="w-full mt-8 lg:mt-11 flex items-center">
              <ButtonPrimary className="mx-auto" onClick={showMore}>
                Show me more
              </ButtonPrimary>
            </div>
          )}
        </>
      ) : (
        <div className="flex mt-16 justify-center items-center">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-indigo-500">
              No matching spaces
            </h2>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              We couldn’t find any spaces that matched your search. You might
              have more luck if you update your criteria.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SectionGridFilterCard
