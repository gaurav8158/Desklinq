'use client'

import React, { FC, Fragment, useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Transition, Dialog } from '@headlessui/react'
import ListingCard from '../components/ListingCard'
import DrawerContent from '@/app/dashboard/components/DrawerContent'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Heading from '@/shared/Heading'
import { useAppSelector } from '@/redux/app/hooks'
import LoadingIndicator from '@/components/LoadingIndicator'
import { useTour } from '@reactour/tour'
import userService from '@/service/user.service'

const Page: FC<any> = () => {
  const userData = useAppSelector((state) => state.userData)
  const searchParams = useSearchParams()
  const propertyName = searchParams.get('name')
  const propertyId = searchParams.get('property')
  const vendorId = searchParams.get('vendor')

  const [propertyAddress, setPropertyAddress] = useState<any[]>([])
  const [offerings, setOfferings] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isVisable, setIsVisable] = useState(false)
  const { setSteps, setCurrentStep } = useTour()

  useEffect(() => {
    setCurrentStep(0)

    setSteps &&
      setSteps([
        {
          selector: '[data-tour-offering="step-0"]',
          content: 'Click here to add a new property.',
        },
      ])
  }, [setCurrentStep, setSteps])

  const fetchData = async <T,>(url: string, setState: (data: T) => void) => {
    try {
      setIsLoading(true)
      const res = await userService.get(
        url,
        { cacheBuster: Math.random() },
        {},
        false
      )

      if (res.success) {
        setState(res.data)
      } else {
        throw new Error(res.message || 'Error fetching data')
      }
    } catch (err) {
      console.error(`Error fetching ${url}:`, err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData<{ address: any }>(`properties/${propertyId}`, (data) =>
      setPropertyAddress(data.address)
    )
    fetchData('offerings', setOfferings)
  }, [propertyId])

  // ***** Drawer starts *****
  const pathname = usePathname()

  useEffect(() => {
    setIsVisable(false)
  }, [pathname])

  const handleOpenMenu = () => setIsVisable(true)
  const handleCloseMenu = () => {
    if (confirm('Close offering!\nDo you really want to?')) {
      setIsVisable(false)
    }
  }

  const renderDrawer = () => {
    return (
      <Transition appear show={isVisable} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 overflow-hidden"
          onClose={handleCloseMenu}
        >
          <Transition.Child
            as={Fragment}
            enter="duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/60 dark:bg-black/70" />
          </Transition.Child>
          <div className="fixed inset-0">
            <div className="flex justify-end min-h-full ">
              <Transition.Child
                as={Fragment}
                enter="transition duration-100 transform"
                enterFrom="opacity-0 translate-x-56"
                enterTo="opacity-100 translate-x-0"
                leave="transition duration-150 transform"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-56"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden transition-all ">
                  <DrawerContent
                    title="create"
                    onClickClose={handleCloseMenu}
                    propertyName={propertyName}
                    propertyId={propertyId}
                    vendorId={vendorId}
                    propertyAddress={propertyAddress}
                    setOfferings={setOfferings}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
  }
  // ***** Drawer ends *****

  const renderCards = () => {
    return (
      <div className="min-h-[95vh]">
        <Heading
          desc={propertyId && `(For Property: ${propertyName})`}
          isCenter={true}
          className="pt-8 mb-8"
        >
          My Offerings
        </Heading>

        {propertyId && (
          <div data-tour-offering="step-0" className="w-fit">
            <ButtonPrimary
              onClick={handleOpenMenu}
              sizeClass="px-6 py-3 lg:px-8 lg:py-4 rounded-xl"
              fontSize="text-sm sm:text-base lg:text-lg font-medium"
            >
              <i className="las la-plus-circle text-xl mr-2.5"></i> Add Offering
            </ButtonPrimary>
          </div>
        )}

        {isLoading && <LoadingIndicator className="mt-20" />}

        <div className="grid gap-20 md:gap-12 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {propertyId
            ? offerings
                .filter((listing) => listing?.property === propertyId)
                .map((listing, index) => {
                  return (
                    <ListingCard
                      key={index}
                      className="mt-8"
                      data={{
                        type: 'offering',
                        offeringId: listing.id,
                        name: listing.name,
                        description: listing.description,
                        offeringType: listing.type,
                        capacity: listing.capacity,
                        initialStatus: listing.status || 'DISABLED',
                        href: `/listing-stay-detail/${listing.id}`,
                        galleryImgs: listing.images,
                      }}
                    />
                  )
                })
            : offerings
                .filter((listing) => listing.vendor === userData.user.id)
                .map((listing, index) => {
                  return (
                    <ListingCard
                      key={index}
                      className="mt-8"
                      data={{
                        type: 'offering',
                        offeringId: listing.id,
                        name: listing.name,
                        description: listing.description,
                        offeringType: listing.type,
                        capacity: listing.capacity,
                        status: listing.status || 'DISABLED',
                        href: `/listing-stay-detail/${listing.id}`,
                        galleryImgs: listing.images,
                      }}
                    />
                  )
                })}
        </div>
      </div>
    )
  }

  return (
    <div>
      {renderCards()}
      {renderDrawer()}
    </div>
  )
}

export default Page
