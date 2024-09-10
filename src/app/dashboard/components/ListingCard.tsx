import React, { FC, Fragment, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { StayDataType } from '@/data/types'
import StartRating from '@/components/StartRating'
import BtnLikeIcon from '@/components/BtnLikeIcon'
import SaleOffBadge from '@/components/SaleOffBadge'
import Badge from '@/shared/Badge'
import GallerySlider from '@/components/GallerySlider'

import { Transition, Dialog } from '@headlessui/react'
import DrawerContent from '@/app/dashboard/components/DrawerContent'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { Route } from 'next'
import { toast } from 'react-toastify'

// export interface ListingCardProps {
//     className?: string;
//     data?: object;
//     size?: "default" | "small";
// }

const ListingCard: FC<any> = ({ className, data }) => {
  const {
    type,
    propertyId,
    vendorId,
    offeringId,
    name,
    description,
    offeringType,
    address,
    capacity,
    rating,
    initialStatus,
    href,
    galleryImgs,
  } = data
  const [status, setStatus] = useState<string>(initialStatus)

  const { push } = useRouter()
  const size = 'default'

  const handleOfferingStatusChange = async (
    offeringId: string,
    desiredStatus: 'ENABLED' | 'DISABLED'
  ) => {
    try {
      const url = `https://api-dev.desklinq.com/v1/offerings/${offeringId}`
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: desiredStatus }),
      })

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`)
      }

      const data = await response.json()
      if (data.success) {
        setStatus(desiredStatus)
        toast.success(`Offering successfully ${desiredStatus.toLowerCase()}`)
      } else {
        toast.error('An error occurred while updating offering status.')
      }
    } catch (err) {
      console.error('Error fetching offerings:', err)
      toast.error('Error updating offering status.')
    }
  }

  // ***** Drawer starts *****
  const [isVisable, setIsVisable] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsVisable(false)
  }, [pathname])

  const handleOpenMenu = () => setIsVisable(true)
  const handleCloseMenu = () => {
    if (confirm('Close menu!\nDo you really want to?')) {
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
                    title="edit"
                    onClickClose={handleCloseMenu}
                    propertyId={propertyId}
                    vendorId={vendorId}
                    offeringId={offeringId}
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

  // Getting property data by ID
  const getPropertyById = async () => {
    try {
      const res = await fetch(
        `https://api-dev.desklinq.com/v1/properties/${propertyId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const propertyData = await res.json()
      if (propertyData.success) {
        localStorage.setItem(
          `desklink_listingData_${propertyId}`,
          JSON.stringify(propertyData.data)
        )
      } else {
        alert('Error fetching property')
      }
    } catch (err) {
      console.error('Error fetching property:', err)
    }
  }
  const handleEditProperty = async () => {
    await getPropertyById()
    push(`/dashboard/add-property?id=${propertyId}` as any)
  }

  const deleteOffering = async () => {
    try {
      const res = await fetch(
        `https://api-dev.desklinq.com/v1/offerings/${offeringId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      console.log(res.status)
      if (res.status === 204) {
        alert('Offering deleted successfully')
        window.location.reload()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const deleteProperty = async () => {
    try {
      const res = await fetch(
        `https://api-dev.desklinq.com/v1/properties/${propertyId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await res.json()
      console.log(data)
      if (res.status === 200) {
        alert('Property and its offerings Deleted')
        window.location.reload()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        {type === 'property' && (
          <GallerySlider
            uniqueID={propertyId}
            propertyName={name}
            vendorID={vendorId}
            ratioClass="aspect-w-4 aspect-h-3 "
            galleryImgs={galleryImgs}
            href={href}
            galleryClass={size === 'default' ? undefined : ''}
          />
        )}
        {type === 'offering' && (
          <GallerySlider
            uniqueID={offeringId}
            ratioClass="aspect-w-4 aspect-h-3"
            galleryImgs={galleryImgs}
            href={href}
            galleryClass={size === 'default' ? undefined : ''}
          />
        )}

        <Badge
          name={status}
          color={status === 'ENABLED' ? 'green' : 'yellow'}
          className="absolute left-3 top-3"
        />
        <div>
          <i
            onClick={type === 'offering' ? handleOpenMenu : handleEditProperty}
            className="las la-edit absolute right-2 top-2 text-2xl text-lightBlue-500 hover:text-lightBlue-600 bg-black/60 px-1 cursor-pointer"
          ></i>
          <i
            onClick={type === 'offering' ? deleteOffering : deleteProperty}
            className=" las la-trash absolute right-2 top-11 text-2xl text-lightBlue-500 hover:text-lightBlue-600 bg-black/60 px-1 cursor-pointer"
          ></i>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    return (
      <div className={size === 'default' ? 'p-4 space-y-4' : 'p-3 space-y-1'}>
        <div className={size === 'default' ? 'space-y-2' : 'space-y-1'}>
          <div className="flex items-center space-x-2">
            {/* <Badge name="ADS" color="green" /> */}
            <h2
              className={`font-semibold capitalize text-neutral-900 dark:text-white ${
                size === 'default' ? 'text-base' : 'text-base'
              }`}
            >
              <span className="line-clamp-1">{name}</span>
            </h2>
          </div>

          <div className="flex justify-between items-center">
            {description && (
              <p
                className={`text-sm text-neutral-500 dark:text-neutral-400 ${
                  size === 'default' ? 'line-clamp-2' : 'line-clamp-1'
                }`}
              >
                {description}
              </p>
            )}
          </div>
          <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>

          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
            {size === 'default' && address && (
              <div>
                <svg
                  className="h-4 w-4 text-black"
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
              </div>
            )}
            {offeringType && (
              <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
                <i className="las la-home mr-2 text-xl text-black font-extrabold"></i>
                <Badge name={offeringType} color="green" />
              </div>
            )}
            <span className="">{address}</span>
          </div>
        </div>

        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>

        {type === 'offering' && (
          <div className="flex items-center justify-between">
            <div>
              <span
                className={`font-semibold capitalize text-neutral-900 dark:text-white mr-2`}
              >
                Capacity:
              </span>
              <span
                className={`text-sm text-neutral-500 dark:text-neutral-400`}
              >
                {capacity}
              </span>
            </div>
            {status && (
              <ButtonPrimary
                onClick={() =>
                  handleOfferingStatusChange(
                    offeringId,
                    status === 'ENABLED' ? 'DISABLED' : 'ENABLED'
                  )
                }
                sizeClass="px-4 py-2 lg:px-5 lg:py-2 rounded-xl"
                fontSize="text-xs sm:text-base lg:text-lg font-medium"
              >
                {status === 'ENABLED' ? 'Published' : 'Publish'}
              </ButtonPrimary>
            )}
          </div>
        )}
        {type === 'property' && (
          <div>
            <span
              className={`font-semibold capitalize text-neutral-900 dark:text-white mr-2`}
            >
              Rating:
            </span>
            <span className={`text-sm text-neutral-500 dark:text-neutral-400`}>
              {rating}
            </span>
            <i className="las la-star text-md ml-1 text-yellow-500"></i>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={`nc-ListingCard group relative bg-white dark:bg-neutral-900 ${
        size === 'default'
          ? 'border border-neutral-100 dark:border-neutral-800 '
          : ''
      } rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id="ListingCard"
      data-tour-property="step-3"
    >
      {renderSliderGallery()}

      {/* <Link className="cursor-pointer"
                href={{ pathname: `${href}`, query: type === "property" ? { name: `${name}`, property: `${propertyId}`, vendor: `${vendorId}` } : {} }}> */}
      {renderContent()}
      {renderDrawer()}
    </div>
  )
}

export default ListingCard
