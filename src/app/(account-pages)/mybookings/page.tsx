'use client'

import { Tab } from '@headlessui/react'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useAppSelector } from '@/redux/app/hooks'
import userService from '@/service/user.service'
import PropertyCardH from '@/components/PropertyCardH'
import { BookingType } from '@/type/BookingsTypes'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import LoadingIndicator from '@/components/LoadingIndicator'

interface InitialStateTypes {
  data?: {
    upcomingDates?: BookingType[]
    pastDates?: BookingType[]
    currentDates?: BookingType[]
    cancelledDates?: BookingType[]
  }
  loading: boolean
  error: string
}
const initialState = {
  data: {},
  loading: false,
  error: '',
} as InitialStateTypes

const MyBookings = () => {
  let [categories] = useState(['Current', 'Past', 'Cancelled'])
  const userData = useAppSelector((state) => state.userData.user)
  const token = useAppSelector((state) => state.userData.token.access?.token)
  const [bookingsData, setBookingData] =
    useState<InitialStateTypes>(initialState)
  const [refreshData, setRefreshData] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const cancelBooking = async (id: string) => {
    const { value } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Cancellation reason',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here',
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
    })
    // status: 'CANCELLED',
    if (value) {
      try {
        await userService.put(
          '/bookings/cancelbooking/',
          id,
          { reason: value },
          {}
        )

        Swal.fire('Booking canceled', '', 'success')
        setRefreshData(true)
      } catch (error) {
        Swal.fire('Booking cancel failed An error occurred', 'error')
      }
    }
  }

  useEffect(() => {
    if (userData.id || refreshData) {
      setIsLoading(true)

      userService
        .get(
          `/bookings/userId/${userData.id}`,
          { cacheBuster: Math.random() * 10 },
          { authorization: `Bearer ${token}` },
          false
        )
        .then((response) => {
          const bookingDate: {
            upcomingDates: BookingType[]
            pastDates: BookingType[]
            currentDates: BookingType[]
            cancelledDates?: BookingType[]
          } = {
            upcomingDates: [],
            pastDates: [],
            currentDates: [],
            cancelledDates: [],
          }

          response.data.forEach((booking: BookingType) => {
            const checkIn = new Date(booking.startTime)
            const checkOut = new Date(booking.endTime)
            const currentDate = new Date()

            if (
              booking.status === 'CANCELLED' ||
              booking.status === 'CANCELLATION_REQUESTED'
            ) {
              bookingDate?.cancelledDates &&
                bookingDate.cancelledDates.unshift(booking)
            } else if (currentDate < checkIn) {
              bookingDate.upcomingDates.unshift(booking)
            } else if (currentDate >= checkOut) {
              bookingDate.pastDates.unshift(booking)
            } else {
              bookingDate.currentDates.unshift(booking)
            }
          })
          setBookingData({
            ...bookingsData,
            data: bookingDate,
            error: '',
            loading: false,
          })
        })
        .catch((error) => setBookingData({ ...bookingsData, error: error }))
        .finally(() => setIsLoading(false))
    }
    setRefreshData(false) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.id, refreshData])

  const renderSection1 = () => {
    return (
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
            {/* present bookings */}
            <Tab.Panel className="">
              <div className="mt-8 grid gap-6 md:block sm:grid-cols-2">
                {bookingsData?.data?.currentDates &&
                  bookingsData?.data?.currentDates?.length > 0 && (
                    <div className="flex justify-center items-center">
                      <div className="text-2xl px- font-semibold text-center">
                        Ongoing
                      </div>
                      <div className="w-full px-2 border-b border-neutral-200 dark:border-neutral-700"></div>
                    </div>
                  )}
                {bookingsData?.data?.currentDates?.map((booking) => {
                  return (
                    <PropertyCardH
                      key={booking.id}
                      className="md:m-3"
                      data={booking}
                    />
                  )
                })}
                {bookingsData?.data?.upcomingDates &&
                  bookingsData?.data?.upcomingDates?.length > 0 && (
                    <div className="flex justify-center items-center">
                      <div className="text-2xl px- font-semibold text-center">
                        Upcoming
                      </div>
                      <div className="w-full px-2 border-b border-neutral-200 dark:border-neutral-700"></div>
                    </div>
                  )}
                {bookingsData?.data?.upcomingDates?.map((booking) => {
                  if (
                    new Date(booking.startTime).getTime() -
                      new Date().getTime() >
                      4 * 60 * 60 * 1000 &&
                    booking.status === 'BOOKED'
                  ) {
                    return (
                      <PropertyCardH
                        key={booking.id}
                        className="md:m-3"
                        data={booking}
                        cancelBooking={cancelBooking}
                      />
                    )
                  }
                  return (
                    <PropertyCardH
                      key={booking.id}
                      className="md:m-3"
                      data={booking}
                    />
                  )
                })}
              </div>

              {isLoading ? (
                <LoadingIndicator className="mt-20" />
              ) : (
                <div className="flex mt-11 justify-center items-center">
                  {bookingsData.data?.currentDates?.length ||
                  (bookingsData?.data?.upcomingDates &&
                    bookingsData?.data?.upcomingDates?.length > 0) ||
                  0 > 0 ? (
                    // <ButtonSecondary>Show me more</ButtonSecondary>
                    <></>
                  ) : (
                    <div>No booking found</div>
                  )}
                </div>
              )}
            </Tab.Panel>

            {/* past bookings */}
            <Tab.Panel className="">
              <div className="mt-8 grid gap-6 md:block sm:grid-cols-2">
                {bookingsData?.data?.pastDates?.map((booking) => {
                  return (
                    <PropertyCardH
                      key={booking.id}
                      className="md:m-3"
                      data={booking}
                    />
                  )
                })}
              </div>

              {isLoading ? (
                <LoadingIndicator className="mt-20" />
              ) : (
                <div className="flex mt-11 justify-center items-center">
                  {bookingsData.data?.pastDates?.length || 0 > 0 ? (
                    // <ButtonSecondary>Show me more</ButtonSecondary>
                    <></>
                  ) : (
                    <div>No booking found</div>
                  )}
                </div>
              )}
            </Tab.Panel>

            {/* cancelled bookings */}
            <Tab.Panel className="">
              {isLoading ? (
                <LoadingIndicator className="mt-20" />
              ) : (
                <div>
                  <div className="mt-8 grid gap-6 md:block sm:grid-cols-2">
                    {bookingsData?.data?.cancelledDates?.map((booking) => {
                      return (
                        <PropertyCardH
                          key={booking.id}
                          className="md:m-3"
                          data={booking}
                        />
                      )
                    })}
                  </div>
                  <div className="flex mt-11 justify-center items-center">
                    {bookingsData.data?.cancelledDates?.length || 0 > 0 ? (
                      // <ButtonSecondary>Show me more</ButtonSecondary>
                      <></>
                    ) : (
                      <div>No booking found</div>
                    )}
                  </div>
                </div>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    )
  }
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* HEADING */}
      <h2 className="text-3xl font-semibold">Bookings</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="w-full lg:w-3/4 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
        {renderSection1()}
      </div>
    </div>
  )
}

export default MyBookings
