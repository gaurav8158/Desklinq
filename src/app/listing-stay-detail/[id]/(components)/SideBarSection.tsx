'use client'

import React, { FC, useEffect, useState } from 'react'
import { Offering, OpeningHours } from '../offering.type'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Sidebar from './(utils)/Sidebar'

interface Props {
  offering: Offering
  openingHours: OpeningHours[] | null
  device: 'Mobile' | 'Desktop'
}

const SideBarSection: FC<Props> = ({ offering, openingHours, device }) => {
  const propertyId = offering.property.id
  const offeringId = offering.id

  const [dateArray, setDateArray] = useState<Date[]>([])
  const [timeArray, setTimeArray] = useState<any>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const Dates = async () => {
      try {
        const res = await fetch(
          `https://api-dev.desklinq.com/v1/bookings/property/?propertyId=${propertyId}&offeringId=${offeringId}`
        )

        const dateData = await res.json()
        if (dateData.data.offeringType == 'HOT_DESK') {
          const unavailableDates: Date[] = []
          for (const date in dateData.data.responseData) {
            if (dateData.data.responseData[date] === 0) {
              unavailableDates.push(new Date(date))
            }
          }
          setDateArray(unavailableDates)
        } else if (dateData.data.offeringType == 'MEETING_ROOMS') {
          const dates = dateData.data.responsePayload.map((booking: any) => ({
            startTime: booking.bookingInfo.startTime,
            endTime: booking.bookingInfo.endTime,
          }))

          const bookedTimes: { date: string; times: string[] }[] = dates.reduce(
            (acc: { date: string; times: string[] }[], booking: any) => {
              const startDate = new Date(booking.startTime)
              const endDate = new Date(booking.endTime)
              const currentDate = new Date(startDate)
              const times: string[] = []

              while (currentDate <= endDate) {
                const hours = currentDate.getHours()
                const minutes = currentDate.getMinutes()
                const time = `${hours > 12 ? hours - 12 : hours}:${
                  minutes < 10 ? '0' + minutes : minutes
                } ${hours >= 12 ? 'PM' : 'AM'}`
                if (!times.includes(time)) {
                  times.push(time)
                }
                currentDate.setMinutes(currentDate.getMinutes() + 30)
              }

              const existingDate = acc.find(
                (item) => item.date === startDate.toISOString().split('T')[0]
              )
              if (existingDate) {
                existingDate.times.push(...times)
              } else {
                acc.push({ date: startDate.toISOString().split('T')[0], times })
              }

              return acc
            },
            []
          )

          setTimeArray(bookedTimes)
        }
      } catch (err) {
        console.error('Error fetching', err)
      }
    }
    Dates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  if (device === 'Desktop') {
    return (
      <div>
        <Sidebar
          offering={offering}
          dateArray={dateArray}
          timeArray={timeArray}
          openingHours={openingHours}
        />
      </div>
    )
  } else if (device === 'Mobile') {
    return (
      <div className="sticky flex items-end justify-center right-0 mb-auto mr-4 h-full w-full bottom-16 lg:hidden">
        {!isModalOpen && (
          <ButtonPrimary className="z-20 lg:hidden" onClick={toggleModal}>
            Book Now
          </ButtonPrimary>
        )}
        {isModalOpen && (
          <div
            id="default-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="overflow-y-auto pt-20 overflow-x-hidden fixed top-0 right-0 left-0 z-100  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600">
                  <button
                    type="button"
                    onClick={toggleModal}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close</span>
                  </button>
                </div>
                <div className="p-4 md:p-5 space-y-4">
                  <Sidebar
                    offering={offering}
                    dateArray={dateArray}
                    timeArray={timeArray}
                    openingHours={openingHours}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return null
}

export default SideBarSection
