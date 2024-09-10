import LikeSaveBtns from '@/components/LikeSaveBtns'
import StartRating from '@/components/StartRating'
import { OfferingData, PropertyData } from '@/data/lisiting-details'
import userService from '@/service/user.service'
import Avatar from '@/shared/Avatar'
import Badge from '@/shared/Badge'
import { User, UserData } from '@/type/UserTypes'
import React from 'react'
import { toast } from 'react-toastify'

interface Props {
  offerings: OfferingData
  property: PropertyData
  userData: User
}

const Section1: React.FC<Props> = ({ offerings, property, userData }) => {
  const handleWishlist = async () => {
    try {
      if (userData.id)
        await userService.post(`/users/${userData.id}/wishlist`, {
          offeringId: offerings?.id,
        })
      else (() => toast.info('Kindly login to add to wishlist'))()
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <div className="listingSection__wrap !space-y-6">
      {/* 1 */}
      <div className="flex justify-between items-center">
        <Badge
          name={
            offerings?.type
              .replace(/_/g, ' ')
              .toLowerCase()
              .replace(/\b\w/g, (char: any) => char.toUpperCase()) ||
            'Office spaces'
          }
        />
        <LikeSaveBtns
          onWishlistClick={handleWishlist}
          saved={userData.wishlist.includes(offerings.id || '')}
        />
      </div>

      {/* 2 */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
        {offerings?.name}
      </h2>

      {/* 3 */}
      <div className="flex items-center space-x-4">
        <StartRating rating={property?.rating} />
        <span>
          <i className="las la-map-marker-alt"></i>
          <span className="ml-1">
            {property?.address?.city}, {property?.address.state}{' '}
          </span>
        </span>
      </div>

      {/* 4 */}
      <div className="flex items-center">
        <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
        <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
          Property:{' '}
          <span className="text-neutral-900 dark:text-neutral-200 font-medium">
            {property?.name}
          </span>
        </span>
      </div>

      {/* 5 */}
      <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

      {/* 6 */}
      <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
        <div className="flex items-center space-x-3 ">
          <i className=" las la-door-open text-2xl"></i>
          <span className="">{offerings?.name} </span>
        </div>

        {!(offerings?.type === 'VIRTUAL_OFFICE') && (
          <div className="flex items-center space-x-3">
            <i className=" las la-users text-2xl "></i>
            <span className=" ">
              <span className="hidden sm:inline-block">
                {offerings?.capacity}{' '}
                <span className="hidden sm:inline-block">
                  {offerings?.type == 'HOT_DESK' ? 'Desk' : 'Capacity'}
                </span>
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Section1
