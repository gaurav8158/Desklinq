'use client'

import React, { FC, Fragment, useState, useEffect } from 'react'
import Image from 'next/image'
import { PropertyData, OfferingData } from '@/data/lisiting-details'
import BaseService from '@/service/BaseService'
import userService from '@/service/user.service'
import { BookingType } from '@/type/BookingsTypes'
import Contact from './ContactVerification'
import { placeholder } from '@/images'

export interface CheckOutPagePageMainProps {
  className?: string
  bookingId: string
}

export interface PricingType {
  tax: number
  totalAmount: number
  discount: number
  price: number
  amountToPay: number
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = '',
  bookingId,
}) => {
  const baseService = new BaseService()
  const [propertyData, setPropertyData] = useState<PropertyData>()
  const [offeringData, setOfferingData] = useState<OfferingData>()
  const [bookingData, setBookingData] = useState<BookingType>()
  const [paymentOption, setPaymentOption] = useState<
    'FULL' | 'PARTIAL' | 'ON_PREMISE'
  >('FULL')
  const [pricing, setPricing] = useState<PricingType>({
    tax: 0,
    totalAmount: 0,
    discount: 0,
    price: 0,
    amountToPay: 0,
  })

  useEffect(() => {
    const fetchdetails = async () => {
      const response = await userService.get(`/bookings/${bookingId}`)
      if (response.success) {
        setBookingData(response.data)
        const propertyId = response.data.property
        const offeringId = response.data.offerings
        const getPropertyData = async (propertyId: string) => {
          const res: any = await baseService.doGet<PropertyData>(
            `/properties/${propertyId}`
          )
          if (res.success) {
            setPropertyData(res.data)
          } else {
            console.log(res.error)
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
          }
        }
        getPropertyData(propertyId)
        getOfferingData(offeringId)
      } else {
        console.log(response.error)
      }
    }
    bookingId && fetchdetails()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId])

  useEffect(() => {
    if (bookingData) {
      const discount = pricing.discount || 0
      const tax = Math.round((bookingData.price - discount) * 18) / 100
      const totalAmt =
        Math.round((bookingData.price + tax - discount) * 100) / 100

      console.log(
        totalAmt,
        tax,
        discount,
        bookingData.price,
        pricing.amountToPay
      )

      if (paymentOption === 'PARTIAL' || paymentOption === 'ON_PREMISE') {
        setPricing({
          ...pricing,
          tax,
          totalAmount: totalAmt,
          amountToPay:
            paymentOption === 'PARTIAL' ? Math.round(totalAmt * 10) / 100 : 0,
          discount,
          price: bookingData.price,
        })
      } else if (paymentOption === 'FULL') {
        setPricing({
          ...pricing,
          tax,
          totalAmount: totalAmt,
          amountToPay: totalAmt,
          discount,
          price: bookingData.price,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingData, paymentOption])

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <Image
                fill
                alt=""
                className="object-cover"
                src={offeringData?.images?.[0] || placeholder}
              />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {propertyData?.name}
              </span>
              <span className="text-base font-medium mt-1 block">
                {offeringData?.name}
              </span>
            </div>
            <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              Co-Workers : {bookingData?.capacity}
            </span>
            <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">Price detail</h3>
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between">
            <span>Amount</span>
            <span>₹ {bookingData?.price ?? 0}</span>
          </div>
          {pricing.discount ? (
            <div className="flex justify-between">
              <span>Discount </span>
              <span>₹ {pricing.discount}</span>
            </div>
          ) : null}
          <div className="flex justify-between">
            <span>Tax </span>
            <span>₹ {pricing.tax}</span>
          </div>
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

          <div className="flex justify-between item-start font-semibold">
            <div className="space-x-2">
              <span>Total Amount</span>
            </div>
            <span>₹{pricing.totalAmount}</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          {paymentOption === 'PARTIAL' ? (
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span>Advance Payment</span>
                <span className="text-red-600">(10% of total amount)</span>
              </div>
              <span>- ₹ {pricing.amountToPay}</span>
            </div>
          ) : (
            <div className="flex justify-between">
              <span>Amount to Pay</span>
              <span>₹ {pricing.amountToPay}</span>
            </div>
          )}
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          {paymentOption === 'PARTIAL' || paymentOption === 'ON_PREMISE' ? (
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span>Remaining Amount</span>
                <span className="text-red-600">(Pay On-site)</span>
              </div>
              <span>
                ₹{' '}
                {Math.round((pricing.totalAmount - pricing.amountToPay) * 100) /
                  100}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">
          {bookingData && (
            <Contact
              bookingData={bookingData}
              changePaymentOption={setPaymentOption}
              pricing={pricing}
            />
          )}
        </div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  )
}

export default CheckOutPagePageMain
