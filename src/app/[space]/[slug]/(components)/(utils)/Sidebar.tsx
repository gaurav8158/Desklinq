'use client'

import ButtonPrimary from '@/shared/ButtonPrimary'
import React, { FC, use, useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
import { useAppSelector } from '@/redux/app/hooks'
import {
  calculateEndTime,
  formatCurrency,
  generateRandomCode,
} from '@/function/fuction'
import { toISOStringWithLocalTime } from '@/function/time'
import userService from '@/service/user.service'
import GuestsInput from './GuestsInput'
import PricingSelection from './PricingSelection'
import DetailsDateRange from './DetailsDateRange'
import Input from '@/shared/Input'
import SideBarTime from './SideBarTime'
import { PricingType } from '@/type/propertiesTypes'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Clock } from 'phosphor-react'

interface SidebarProps {
  offering: any
  dateArray: any
  timeArray: any
  openingHours: any
}
const Sidebar: FC<SidebarProps> = ({
  offering,
  dateArray,
  timeArray,
  openingHours,
}) => {
  const router = useRouter()
  const filter = useAppSelector((state: any) => state.filter)
  const userData = useAppSelector((state: any) => state.userData.user)
  // const myToken = userData?.token?.access?.token
  const userD = useAppSelector((state) => state.userData)
  const myToken = userD?.token?.access?.token

  // console.log(myToken);
  const userToken = useAppSelector(
    (state) => state.userData.token.access?.token
  )

  const [startTime, setStartTime] = useState<string>(
    filter.primaryFilter.dateTime.fromTime || '00:00'
  )
  const [duration, setDuration] = useState<number>(0)
  const [endTime, setEndTime] = useState<string>(
    calculateEndTime(filter.primaryFilter.dateTime.fromTime || '00:00', 1)
  )
  const [startDate, setStartDate] = useState<Date | null>(
    filter.primaryFilter.dateTime.fromDate
      ? new Date(filter.primaryFilter.dateTime.fromDate)
      : new Date()
  )
  const [endDate, setEndDate] = useState<Date | null>(
    filter.primaryFilter.dateTime.toDate
      ? new Date(filter.primaryFilter.dateTime.toDate)
      : new Date()
  )
  const [selected, setSelected] = useState<PricingType | null>()
  const [cost, setCost] = useState<{ tax: number; price: number }>({
    price: 0,
    tax: 0,
  })
  const [capacity, setCapacity] = useState<number>(
    filter.primaryFilter.minCapacity
  )
  const [total, setTotal] = useState<number>(0)
  const [buttonFunction, setButtonFunction] = useState<{
    loading: boolean
    disabled: boolean
  }>({ loading: false, disabled: true })
  const pathname = usePathname()

  useEffect(() => {
    if (selected?.duration === 'HOURLY') {
      setEndDate(startDate)
      setEndTime(calculateEndTime(startTime, duration))
    } else if (selected) {
      setStartTime('09:00')
      setEndTime('18:00')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, duration, selected])

  useEffect(() => {
    setCapacity(!(offering?.type === 'MEETING_ROOMS') ? capacity : 1)
    selected ?? setEndDate(startDate)
    const total = (selected?.price || 0) * duration * capacity
    setCost({ price: total, tax: total * 0.18 })
    setTotal(total * 1.18)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, duration, capacity])

  useEffect(() => {
    if (total > 0) {
      setButtonFunction({ loading: false, disabled: false })
    }
  }, [total])

  // console.log(offering);

  const handleButtonClick = async () => {
    try {
      setButtonFunction({ loading: true, disabled: true })

      if (!startDate || !endDate) {
        throw new Error('Please select start and end time')
      }
      if (offering.type == 'HOT_DESK' && (duration < 1 || duration > 30)) {
        throw new Error('Number of Days should be between 1 and 30')
      }
      if (offering.type == 'MEETING_ROOMS' && (duration < 1 || duration > 12)) {
        throw new Error('Number of HOURS should be between 1 to 12')
      }

      const response = await userService.post(
        '/bookings',
        {
          property: offering?.property?.id,
          customer: userData.id,
          offerings: offering?.id,
          startTime: toISOStringWithLocalTime(startDate, startTime || '00:00'),
          endTime: toISOStringWithLocalTime(endDate, endTime || '23:59'),
          status: 'PENDING',
          price: cost.price.toFixed(2),
          capacity: !(offering?.type === 'MEETING_ROOMS')
            ? capacity
            : offering?.capacity,
          confirmationCode: generateRandomCode(),
        },
        { cacheBuster: Math.random() },
        { authorization: `Bearer ${userToken}` }
      )

      const bookingId = response.data.id

      router.push(`/checkout?bookingId=${bookingId}`)
      setButtonFunction({ loading: false, disabled: true })
    } catch (error: any) {
      setButtonFunction({ loading: false, disabled: false })
      if (!userData.id) {
        router.push(`/auth/login?callbackUrl=${pathname}`)
      } else {
        toast.error(error.message)
      }
    }
  }

  const date: string = startDate?.toISOString().substring(0, 10) ?? ''
  const getTimeArrayByDate = (date: string) => {
    return timeArray.find((item: any) => item.date === date)?.times || []
  }
  const timeArrayByDate = getTimeArrayByDate(date)

  return (
    <div className="listingSectionSidebar__wrap shadow-xl">
      {/* FORM */}
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold">Book your space!</h2>
        <p>Tell us when would you like to visit this Property?</p>
      </div>
      <form className="flex flex-col  ">
        <DetailsDateRange
          selected={selected?.duration || 'DAILY'}
          onChange={(value) => {
            value && setStartDate(value.startDate)
            value && setEndDate(value.endDate)
          }}
          openingHours={openingHours}
          duration={duration}
          dateArray={dateArray}
        />

        {!(
          offering?.type === 'MEETING_ROOMS' ||
          offering?.type === 'VIRTUAL_OFFICE'
        ) && (
          <>
            <GuestsInput
              className="flex-1 z-10"
              defaultValue={filter?.primaryFilter.minCapacity}
              onChange={(value) => {
                setCapacity(value)
              }}
              maxcapacity={offering?.capacity}
            />
          </>
        )}

        <div className="p-2 border rounded-xl mt-2 text-neutral-6000 dark:text-neutral-300">
          {/* <PricingSelection
            pricing={offering?.pricing}
            onChange={(value) => {
              if (offering && offering.pricing) {
                const selectedPricing = offering.pricing.find(
                  (item: any) => item.duration === value
                )
                setSelected(selectedPricing)
              }
            }}
          /> */}
          {selected?.duration == 'HOURLY' &&
          offering.type == 'MEETING_ROOMS' ? (
            <div className="my-2 flex flex-col gap-4 md:gap-0 text-center justify-center md:justify-around">
              <div className="md:flex md:items-center">
                <label className="px-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 dark:border-neutral-700">
                  No. of hours
                </label>
                <Input
                  type="number"
                  min="1"
                  max="23"
                  defaultValue={duration}
                  value={duration}
                  onChange={(event) => {
                    setDuration(Number(event.target.value))
                  }}
                  className="w-full max-w-[15rem] text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-neutral-100 dark:bg-neutral-900 dark:border-neutral-700 md:mr-[14px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none mx-auto"
                />
              </div>
              <div className="md:flex md:items-center">
                <label className="px-2 text-sm font-medium text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400 gap-1">
                  Start time
                </label>
                <div className="my-1 block w-full py-2 px-3 border-0 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-neutral-900">
                  <SideBarTime
                    startDate={startDate}
                    startTime={startTime}
                    onChange={(value) => {
                      setStartTime(value)
                    }}
                    disabledTimes={timeArrayByDate}
                    duration={duration}
                    openingHours={openingHours}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="my-1 flex gap-2 md:gap-0 text-center items-center">
              <Clock size={36} />
              <PricingSelection
                pricing={offering?.pricing}
                onChange={(value) => {
                  if (offering && offering.pricing) {
                    const selectedPricing = offering.pricing.find(
                      (item: any) => item.duration === value
                    )
                    setSelected(selectedPricing)
                  }
                }}
              />
              {/* <label className="px-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 w-1/2">
                How many{' '}
                {selected?.duration === 'DAILY'
                  ? 'days'
                  : selected?.duration === 'MONTHLY'
                    ? 'months'
                    : selected?.duration === 'WEEKLY'
                      ? 'weeks'
                      : 'years'}{' '}
                ?
              </label> */}
              <Input
                type="number"
                min="1"
                max="30"
                defaultValue={duration}
                value={duration}
                onChange={(event) => {
                  setDuration(Number(event.target.value))
                }}
                className="w-full max-w-[4rem] text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-neutral-100 dark:bg-neutral-900 dark:border-neutral-700 md:mr-[14px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none mx-auto"
              />
            </div>
          )}
        </div>
      </form>

      {/* SUM */}
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
          <span>
            {formatCurrency(selected?.price, selected?.currency)} x{' '}
            {selected?.duration.toLowerCase()}
          </span>
          <span>{cost.price}</span>
        </div>
        <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
          <span>Taxes (18%)</span>
          <span>{cost.tax.toFixed(2)}</span>
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{total.toFixed(2)}</span>
        </div>
      </div>

      {/* SUBMIT */}
      <ButtonPrimary
        loading={buttonFunction.loading}
        disabled={
          buttonFunction.disabled ||
          offering.AvailabilityStatus === 'Booked' ||
          duration < 1
        }
        onClick={handleButtonClick}
        className={`bg-[#6115E7] ${
          offering?.AvailabilityStatus &&
          offering.AvailabilityStatus === 'Booked' &&
          'bg-red-500 cursor-not-allowed hover:bg-red-500'
        }`}
      >
        {offering?.AvailabilityStatus === 'Booked'
          ? 'Sold out'
          : `Reserve Desk - ${total.toFixed(2)}/day `}
      </ButtonPrimary>
    </div>
  )
}

export default Sidebar
