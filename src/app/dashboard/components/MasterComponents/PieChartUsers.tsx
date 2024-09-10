import React, { FC, useState, useEffect, useRef } from 'react'
import { useAppSelector } from '@/redux/app/hooks'
import LoadingIndicator from '@/components/LoadingIndicator'
import Chart from 'chart.js/auto'
import FilterDropdown from './FilterDropdown'

export interface PieChartUsersProps {}

const PieChartUsers: FC<PieChartUsersProps> = () => {
  const userData = useAppSelector((state) => state.userData)
  const myToken = userData?.token?.access?.token
  const [isLoading, setIsLoading] = useState(false)
  const [usersData, setUsersData] = useState<any>({})

  const [startDate, setStartDate] = useState('2009-06-10T09:00:00Z')
  const [endDate, setEndDate] = useState('2089-06-15T18:00:00Z')

  const chartRef = useRef<HTMLCanvasElement | any>(null)

  const getUsersData = async () => {
    try {
      setIsLoading(true)

      const res = await fetch(
        `https://api-dev.desklinq.com/v1/analytics/users?startTime=${startDate}&endTime=${endDate}&cacheBuster=${Math.random()}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${myToken}`,
          },
        }
      )

      const resData = await res.json()
      console.log(resData)

      setUsersData(resData?.data)
    } catch (err) {
      console.error('Error fetching', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUsersData()
  }, [startDate, endDate])

  // Graph parameters
  useEffect(() => {
    let config: any = {
      type: 'pie',
      data: {
        labels: ['Customers', 'Vendors'],
        datasets: [
          {
            data: [usersData?.users?.length, usersData?.vendors?.length],
            backgroundColor: ['#4caf50', '#2196f3'], // Colors for Customers and Vendors respectively
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Distribution of Customers and Vendors',
        },
        legend: {
          display: true,
          position: 'bottom',
        },
      },
    }

    if (chartRef.current) {
      // Destroy existing chart instance if it exists
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy()
      }
      // Create new chart instance
      chartRef.current.chartInstance = new Chart(chartRef.current, config)
    }

    // Cleanup function
    return () => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy()
      }
    }
  }, [usersData])

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Distribution
              </h6>
              <h3 className="text-blueGray-700 text-xl font-semibold">
                Customers & Vendors
              </h3>
            </div>
            <div className="relative w-[50%] px-4 max-w-[50%] flex-grow flex-1 text-right">
              <FilterDropdown
                setStartDateTime={setStartDate}
                setEndDateTime={setEndDate}
              />
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          {isLoading ? (
            <LoadingIndicator className="my-10" />
          ) : (
            <div className="relative h-350-px">
              <canvas ref={chartRef}></canvas>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PieChartUsers
