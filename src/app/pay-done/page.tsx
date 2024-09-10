'use client'
import StartRating from '@/components/StartRating'
import React, { FC, useState, useEffect } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Image from 'next/image'
import BaseService from '@/service/BaseService'
import { PropertyData, OfferingData } from '../../data/lisiting-details'
import { Route } from 'next'
import withAuthRedirect from '../(HOC)/withAuthRedirect'
import { dateRender } from '@/function/fuction'
import { Price } from '@/type/BookingsTypes'
import Page404 from '../not-found'
import userService from '@/service/user.service'

export interface BookingData {
  id: string
  payment: Price
  paymentMode: 'FULL' | 'PARTIAL' | 'ON_PREMISE'
  property: string
  offering: string
  price: number
  status: 'BOOKED' | 'UNAVAILABLE' | 'CHECKED_OUT' | 'IN_PROGRESS' | 'CANCELLED'
  confirmationCode: string
  startTime: Date
  endTime: Date
  customer: string
  capacity: number
  createdAt: Date
  statusHistory: {
    status:
      | 'BOOKED'
      | 'UNAVAILABLE'
      | 'CHECKED_OUT'
      | 'IN_PROGRESS'
      | 'CANCELLED'
    timestamp: Date
  }[]
}

const PayPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const bookingId = searchParams.bookingId as string
  const baseService = new BaseService()
  const [propertyData, setPropertyData] = useState<PropertyData>()
  const [offeringData, setOfferingData] = useState<OfferingData>()
  const [bookingData, setBookingData] = useState<BookingData>()

  useEffect(() => {
    const fetchdetails = async () => {
      const res: any = await userService.get(
        `/bookings/${bookingId}`,
        { cacheBuster: Math.random() * 10 },
        {},
        false
      )
      if (res.success) {
        setBookingData(res.data)
        const propertyId = res.data.property
        const offeringId = res.data.offerings
        const getPropertyData = async (propertyId: string) => {
          const res: any = await baseService.doGet<PropertyData>(
            `/properties/${propertyId}`
          )
          if (res.success) {
            setPropertyData(res.data)
          } else {
            console.log(res.error)
            throw new Error(res.error)
          }
        }
        const getOfferingData = async (offeringId: string) => {
          const res: any = await baseService.doGet<OfferingData>(
            `/offerings/${offeringId}`
          )
          if (res.success) {
            setOfferingData(res.data)
          } else {
            console.log(res.error)
            throw new Error(res.error)
          }
        }
        getPropertyData(propertyId)
        getOfferingData(offeringId)
      } else {
        console.log(res.error)
      }
    }
    fetchdetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderContent = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl space-y-10 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          {offeringData?.type === 'MEETING_ROOMS' ? (
            <span>Meeting Room </span>
          ) : null}
          {offeringData?.type === 'HOT_DESK' ? <span>Hot desk </span> : null}
          {offeringData?.type === 'CABINS' ? <span>Cabins </span> : null}
          {offeringData?.type === 'VIRTUAL_OFFICE' ? (
            <span>Virtual Office </span>
          ) : null}
          Successfully Booked 🎉
        </h2>

        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* ------------------------ */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Your booking</h3>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-shrink-0 w-full sm:w-40">
              <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                <Image
                  fill
                  alt=""
                  className="object-cover"
                  src={offeringData?.images[0] || '/images/office1.jpg'}
                />
              </div>
            </div>
            <div className="pt-5  sm:pb-5 sm:px-5 space-y-3">
              <div>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                  {propertyData?.name} in {propertyData?.address?.city}
                </span>
                <span className="text-base sm:text-lg font-medium mt-1 block">
                  {offeringData?.name}
                </span>
              </div>
              {/* <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
                {offeringData?.amenities?.slice(0, 3).map((amenity) => (
                  <span className="mr-2">{amenity.Name}</span>
                ))}
              </span> */}
              <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
              <StartRating rating={propertyData?.rating} />
            </div>
          </div>
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
            <div className="flex-1 p-5 flex space-x-4">
              <svg
                className="w-8 h-8 text-neutral-300 dark:text-neutral-6000"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.33333 8.16667V3.5M18.6667 8.16667V3.5M8.16667 12.8333H19.8333M5.83333 24.5H22.1667C23.4553 24.5 24.5 23.4553 24.5 22.1667V8.16667C24.5 6.878 23.4553 5.83333 22.1667 5.83333H5.83333C4.54467 5.83333 3.5 6.878 3.5 8.16667V22.1667C3.5 23.4553 4.54467 24.5 5.83333 24.5Z"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex flex-col justify-end">
                <span className="text-sm text-neutral-400">Date</span>
                <div className="flex items-center  justify-end text-lg font-semibold">
                  Check in : &nbsp;
                  <span className="text-sm text-neutral-600">
                    {dateRender(bookingData?.startTime, offeringData?.type)}
                  </span>
                </div>
                {dateRender(bookingData?.startTime, offeringData?.type) !==
                dateRender(bookingData?.endTime, offeringData?.type) ? (
                  <div className="flex items-center space-y-1.5 text-lg font-semibold">
                    Check out : &nbsp;
                    <span className="text-sm text-neutral-600">
                      {dateRender(bookingData?.endTime, offeringData?.type)}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex-1 p-5 flex space-x-4">
              <svg
                className="w-8 h-8 text-neutral-300 dark:text-neutral-6000"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 5.07987C14.8551 4.11105 16.1062 3.5 17.5 3.5C20.0773 3.5 22.1667 5.58934 22.1667 8.16667C22.1667 10.744 20.0773 12.8333 17.5 12.8333C16.1062 12.8333 14.8551 12.2223 14 11.2535M17.5 24.5H3.5V23.3333C3.5 19.4673 6.63401 16.3333 10.5 16.3333C14.366 16.3333 17.5 19.4673 17.5 23.3333V24.5ZM17.5 24.5H24.5V23.3333C24.5 19.4673 21.366 16.3333 17.5 16.3333C16.225 16.3333 15.0296 16.6742 14 17.2698M15.1667 8.16667C15.1667 10.744 13.0773 12.8333 10.5 12.8333C7.92267 12.8333 5.83333 10.744 5.83333 8.16667C5.83333 5.58934 7.92267 3.5 10.5 3.5C13.0773 3.5 15.1667 5.58934 15.1667 8.16667Z"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Co-Workers </span>
                <span className="mt-1.5 text-lg font-semibold">
                  Co-Workers : {bookingData?.capacity}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------ */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Booking detail</h3>
          <div className="flex flex-col space-y-4">
            <div className="flex text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Booking code</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {bookingData?.confirmationCode}
              </span>
            </div>
            {bookingData?.payment ? (
              <>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Payment Mode</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100 capitalize">
                    {bookingData?.paymentMode.replace(/_/g, ' ').toLowerCase()}
                  </span>
                </div>
                <div className="flex text-neutral-6000 dark:text-neutral-300">
                  <span className="flex-1">Total Amount</span>
                  <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                    ₹ {bookingData?.payment.total}
                  </span>
                </div>
                {bookingData?.paymentMode === 'PARTIAL' ||
                bookingData?.paymentMode === 'ON_PREMISE' ? (
                  <div className="flex text-neutral-6000 dark:text-neutral-300">
                    <span className="flex-1">Amount to be Paid</span>
                    <span className="flex-1 font-medium text-red-500">
                      ₹ {bookingData?.payment.amountToBePaid}
                    </span>
                  </div>
                ) : null}
              </>
            ) : null}

            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span className="flex-1">Payment Status</span>
              <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                {bookingData?.status === 'BOOKED' ? (
                  <span className="text-green-500">Booked Successfully</span>
                ) : (
                  <span className="text-red-500 capitalize">
                    {bookingData?.status}
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
        <div>
          {bookingData?.status === 'BOOKED' ? (
            <p>
              Your Booking is Confirmed! Please check your inbox for
              confirmation email. If you do not see it kindly peek into your
              spam folder just in case.
            </p>
          ) : (
            <p>
              Your Booking is not Confirmed! Please contact the admin for
              further details.
            </p>
          )}
        </div>
        <div>
          <ButtonPrimary href={'/' as Route}>
            Explore more Offerings
          </ButtonPrimary>
        </div>
      </div>
    )
  }

  if (!bookingId) {
    return <Page404 />
  }

  return (
    <div className={`nc-PayPage`}>
      <main className="container mt-11 mb-24 lg:mb-32 ">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  )
}

export default withAuthRedirect(PayPage)
