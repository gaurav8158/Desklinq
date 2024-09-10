'use client'

import React, { FC, useEffect, useState } from 'react'
import DashboardNav from '../components/DashboardNav.jsx'
import AnalyticsCards from '../components/AnalyticsCards.jsx'
import DashTable from '@/components/DashTable'
import { useSearchParams } from 'next/navigation'
import { UserData } from '@/type/UserTypes'
import { usePathname } from 'next/navigation'
import { useAppSelector } from '@/redux/app/hooks'
import LoadingIndicator from '@/components/LoadingIndicator'

import CardLineChart from '../components/MasterComponents/CardLineChart.jsx'
import CardBarChart from '../components/MasterComponents/CardBarChart.jsx'
import CardPageVisits from '../components/MasterComponents/CardPageVisits.jsx'
import CardSocialTraffic from '../components/MasterComponents/CardSocialTraffic.jsx'
import CardProfile from '../components/MasterComponents/CardProfile.jsx'
import CardSettings from '../components/MasterComponents/CardSettings.jsx'
import CardStats from '../components/MasterComponents/CardStats.jsx'
import CardTable from '../components/MasterComponents/CardTable.jsx'

import BaseCard from '../components/MasterComponents/BaseCard'
import TableGeneralData from '../components/MasterComponents/TableGeneralData'
import TableRepeatCustomers from '../components/MasterComponents/TableRepeatCustomers'
import TableBookingsPerProperty from '../components/MasterComponents/TableBookingsPerProperty'
import TableBookingsPerOffering from '../components/MasterComponents/TableBookingsPerOffering'
import TableCancellationsPerProperty from '../components/MasterComponents/TableCancellationsPerProperty'
import TableCancellationsPerOffering from '../components/MasterComponents/TableCancellationsPerOffering'
import PieChartUsers from '../components/MasterComponents/PieChartUsers'
import PieChartBookings from '../components/MasterComponents/PieChartBookings'
import BarChartMonthlyRevenue from '../components/MasterComponents/BarChartMonthlyRevenue'
import LineChartWeeklyRevenue from '../components/MasterComponents/LineChartWeeklyRevenue'
import PriceOrder from '../components/MasterComponents/PriceOrder'

export interface MasterProps {}
const Master: FC<MasterProps> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [analyticsStats, setAnalyticsStats] = useState({})

  const pathname = usePathname()
  const showComponent = pathname == '/dashboard/master'
  const userData = useAppSelector((state) => state.userData)
  const myToken = userData?.token?.access?.token

  // const getanAlyticsData = async () => {
  //   try {
  //     setIsLoading(true)

  //     const res = await fetch(`https://api-dev.desklinq.com/v1/analytics?cacheBuster=${Date.now()}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         authorization: `Bearer ${myToken}`,
  //       },
  //     })

  //     const resData = await res.json()
  //     setAnalyticsStats(resData?.data?.stats)

  //     console.log(resData?.data?.stats)
  //   } catch (err) {
  //     console.error('Error fetching', err)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   getanAlyticsData()
  // }, [])

  return (
    <>
      {showComponent && (
        <>
          <DashboardNav />

          {isLoading ? (
            <LoadingIndicator className="mt-20" />
          ) : (
            <>
              {/* <AnalyticsCards cardStats={analyticsStats} /> */}

              <div className="flex flex-wrap md:pt-28 pt-5">
                <div className="w-full xl:w-4/12 mb-12 xl:mb-0 px-4">
                  <TableGeneralData />
                </div>
                <div className="w-full xl:w-8/12 px-4">
                  <TableRepeatCustomers />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
                  <PieChartUsers />
                </div>
                <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
                  <PieChartBookings />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
                  <TableBookingsPerProperty />
                </div>
                <div className="w-full xl:w-6/12 px-4">
                  <TableCancellationsPerProperty />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
                  <TableBookingsPerOffering />
                </div>
                <div className="w-full xl:w-6/12 px-4">
                  <TableCancellationsPerOffering />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
                  <BarChartMonthlyRevenue />
                </div>
                <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
                  <LineChartWeeklyRevenue />
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full mb-12 xl:mb-0 px-4">
                  <PriceOrder />
                </div>
              </div>

              {/* <div className="flex flex-wrap">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                  <CardLineChart />
                </div>
                <div className="w-full xl:w-4/12 px-4">
                  <CardBarChart />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
                  <DashTable />
                </div>
              </div> */}
            </>
          )}
        </>
      )}
    </>
  )
}

export default Master
