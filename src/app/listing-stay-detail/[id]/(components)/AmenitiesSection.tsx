'use client'

import ButtonSecondary from '@/shared/ButtonSecondary'
import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ButtonClose from '@/shared/ButtonClose'
import { Amenity } from '../offering.type'

interface Props {
  heading: string
  description: string
  amenities: Amenity[] | undefined | null
}

const AmenitiesSection: React.FC<Props> = ({
  amenities,
  heading,
  description,
}) => {
  const [isOpenModalOfferingAmenities, setIsOpenModalOfferingAmenities] =
    useState(false)

  function closeOfferingModalAmenities() {
    setIsOpenModalOfferingAmenities(false)
  }
  function openOfferingModalAmenities() {
    setIsOpenModalOfferingAmenities(true)
  }

  if (amenities === undefined || amenities === null || amenities.length === 0)
    return null

  const renderAmenities = () => {
    return (
      <Transition appear show={isOpenModalOfferingAmenities} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeOfferingModalAmenities}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-screen w-full max-w-4xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      {heading}
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeOfferingModalAmenities} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    {amenities?.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="flex items-center space-x-3"
                        >
                          <i
                            className={`text-4xl text-neutral-6000 las ${item.image}`}
                          ></i>
                          <span className="flex items-center py-2.5 sm:py-4 lg:py-5 space-x-5 lg:space-x-8">
                            {item.name}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    )
  }
  return (
    <div className="listingSection__wrap">
      <div>
        <h2 className="text-2xl font-semibold">{heading}</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          {description}
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300">
        {amenities.slice(0, 9).map((item) => {
          return (
            <div key={item.id} className="flex items-center space-x-3">
              <i className={`text-3xl las ${item.image}`}></i>
              <span>{item.name}</span>
            </div>
          )
        })}
      </div>

      <div className="w-14 border-b border-neutral-200"></div>
      <ButtonSecondary onClick={openOfferingModalAmenities}>
        View all amenities
      </ButtonSecondary>
      {renderAmenities()}
    </div>
  )
}

export default AmenitiesSection
