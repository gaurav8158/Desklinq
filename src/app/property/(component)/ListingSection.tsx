'use client'

import { Tab } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import PropertyCard from '@/components/PropertyCard'
import { OfferingType, PropertiesDataType } from '@/type/propertiesTypes'
import userService from '@/service/user.service'

interface ListingSectionProps {
  property: PropertiesDataType
}

const categories = ['Meeting Rooms', 'Hot desk', 'Cabins']

const ListingSection: React.FC<ListingSectionProps> = ({ property }) => {
  const ids: string[] = property?.offerings

  const [offerings, setOfferings] = useState<OfferingType[]>([])

  useEffect(() => {
    const fetchOfferingData = async () => {
      try {
        const offeringDetails: OfferingType[] = []
        for (const offeringId of ids) {
          const res: any = await userService.get(`/offerings/${offeringId}`)
          if (res.success) {
            offeringDetails.push(res.data)
          }
        }
        setOfferings(offeringDetails)
      } catch (error) {
        console.error('Error fetching offering details:', error)
      }
    }

    fetchOfferingData()
  }, [ids, property?.offerings])

  return (
    <div className="listingSection__wrap">
      <div>
        <h2 className="text-2xl font-semibold">
          {property?.name}&rsquo;s Listed Spaces
        </h2>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      <div>
        <Tab.Group>
          <Tab.List className="flex space-x-1 overflow-x-auto">
            {categories.map((item) => (
              <Tab key={item} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                      selected
                        ? 'bg-secondary-900 text-secondary-50 '
                        : 'text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    } `}
                  >
                    {item}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="">
              {offerings?.length ? (
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                  {offerings
                    ?.filter(({ type }) => type == 'MEETING_ROOMS')
                    .map((offer) => (
                      <PropertyCard
                        key={offer.id}
                        data={property}
                        offering={offer}
                      />
                    ))}
                </div>
              ) : (
                <div className="flex mt-11 justify-center items-center">
                  {offerings?.length || 0 > 0 ? (
                    // <ButtonPrimary>Show me more</ButtonPrimary>
                    <></>
                  ) : (
                    <div>Nothing to preview</div>
                  )}
                </div>
              )}
            </Tab.Panel>
            <Tab.Panel className="">
              {offerings?.length ? (
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                  {offerings
                    ?.filter(({ type }) => type == 'HOT_DESK')
                    .map((offer) => (
                      <PropertyCard
                        key={offer.id}
                        data={property}
                        offering={offer}
                      />
                    ))}
                </div>
              ) : (
                <div className="flex mt-11 justify-center items-center">
                  {offerings?.length || 0 > 0 ? (
                    // <ButtonPrimary>Show me more</ButtonPrimary>
                    <></>
                  ) : (
                    <div>Nothing to preview</div>
                  )}
                </div>
              )}
            </Tab.Panel>
            <Tab.Panel className="">
              {offerings?.length ? (
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                  {offerings
                    ?.filter(({ type }) => type == 'CABINS')
                    .map((offer) => (
                      <PropertyCard
                        key={offer.id}
                        data={property}
                        offering={offer}
                      />
                    ))}
                </div>
              ) : (
                <div className="flex mt-11 justify-center items-center">
                  <div>Nothing to preview</div>
                </div>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default ListingSection
