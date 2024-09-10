'use client'

import React, { FC, useEffect, useState } from 'react'
import DashboardNav from '../components/DashboardNav.jsx'
import Header from '../components/Header.jsx'
import DashTable from '@/components/DashTable'
import { useSearchParams } from 'next/navigation'
import { UserData } from '@/type/UserTypes'
import { usePathname } from 'next/navigation'
import { useAppSelector } from '@/redux/app/hooks'
import { useTour } from '@reactour/tour'
import { dashBoardHomeSteps } from '@/config/tourGuide/tourGuideSteps'

export interface DashboardProps {}
const Page: FC<DashboardProps> = () => {
  const [totalBookings, setTotalBookings] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState<any>(0)
  const [propertiesOnBoarded, setPropertiesOnBoarded] = useState('')
  const [bookingOnBoard, setBookingOnBoard] = useState('')
  const [propertiesData, setPropertiesData] = useState<any[]>([])
  const { setSteps, setCurrentStep } = useTour()

  const pathname = usePathname()
  const showComponent = pathname == '/dashboard/home'
  const userData = useAppSelector((state) => state.userData)
  const myToken = userData?.token?.access?.token
  const analyticsRevenue: any[] = []
  let revenue: number = 0
  let bookings: number = 0
  const getanAlyticsData = async () => {
    try {
      const res = await fetch(
        `https://api-dev.desklinq.com/v1/bookings/analytics?context=TotalBooking,Cancelled&startTime=2009-06-10T09:00:00Z&endTime=2089-06-15T18:00:00Z&summary=false&groupBy=property&accessId=64c7cfbe9c2b6dfb245d5d9a?cachebuster=${Math.random()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${myToken}`,
          },
        }
      )
      const analyticsData = await res.json()

      analyticsData.data.map(
        (p: any) => (revenue = revenue + p.stats.totalRevenue)
      )

      analyticsData.data.map(
        (p: any) => (bookings = bookings + p.stats.totalBookings)
      )

      const analyticsRevenue = analyticsData
      const transformedData = await analyticsData.data.map(
        (item: any, index: number) => {
          const {
            groupBy: { property },
            stats: {
              totalBookings,
              cancelledBookings,
              upcomingBookings,
              completedBookings,
              totalRevenue,
              AmountToBeCollected,
            },
          } = item

          return {
            id: property._id,
            properties: property.name,
            totalBookings,
            cancelledBookings,
            upcomingBookings,
            completedBookings,
            totalRevenue,
            AmountToBeCollected,
          }
        }
      )
      setPropertiesData(transformedData)

      const res2 = await fetch(
        `https://api-dev.desklinq.com/v1/properties?cachebuster=${Math.random()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const listingData = await res2.json()

      const num = listingData.data.filter(
        (listing: any) => listing.vendor === userData.user.id
      )

      const res3 = await fetch(
        `https://api-dev.desklinq.com/v1/offerings?cachebuster=${Math.random()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const offeringData = await res3.json()

      // let num2 = 0;
      const num2 = offeringData.data.filter(
        (listing: any) => listing.vendor === userData.user.id
      )

      setBookingOnBoard(num2.length)
      setPropertiesOnBoarded(num.length)
      setTotalBookings(bookings)

      setTotalRevenue(revenue.toFixed(2))

      console.log(analyticsRevenue.data)
    } catch (err) {
      console.error('Error fetching', err)
    }
  }

  useEffect(() => {
    getanAlyticsData()
  }, [bookingOnBoard, propertiesOnBoarded])

  useEffect(() => {
    setCurrentStep(0)

    setSteps && setSteps(dashBoardHomeSteps)
  }, [setCurrentStep, setSteps])

  return (
    <>
      {showComponent && (
        <>
          <DashboardNav />
          <Header
            totalBookings={totalBookings}
            totalRevenue={totalRevenue}
            propertiesOnboarded={propertiesOnBoarded}
            bookingOnboarded={bookingOnBoard}
          />

          <DashTable />
        </>
      )}
    </>
  )
}

export default Page
