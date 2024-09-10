import React, { FC, useState, useEffect, useRef } from 'react'
import { useAppSelector } from '@/redux/app/hooks'
import LoadingIndicator from '@/components/LoadingIndicator'
import Chart from 'chart.js/auto'
import FilterDropdown from './FilterDropdown'

export interface LineChartWeeklyRevenueProps {}

const LineChartWeeklyRevenue: FC<LineChartWeeklyRevenueProps> = () => {
  const userData = useAppSelector((state) => state.userData)
  const myToken = userData?.token?.access?.token
  const [isLoading, setIsLoading] = useState(false)
  const [revenueData, setRevenueData] = useState<any>({})

  const [startDate, setStartDate] = useState('2022-01-01T09:00:00Z')
  const [endDate, setEndDate] = useState('2089-06-15T18:00:00Z')
  const [noOfWeeks, setNoOfWeeks] = useState(6)

  const chartRef = useRef<HTMLCanvasElement | any>(null)

  const getRevenueData = async () => {
    try {
      setIsLoading(true)

      const res = await fetch(
        `https://api-dev.desklinq.com/v1/analytics/weeklyRevenue?startTime=${startDate}&endTime=${endDate}&cacheBuster=${Math.random()}`,
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

      setRevenueData(resData?.data)
    } catch (err) {
      console.error('Error fetching', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getRevenueData()
  }, [startDate, endDate])

  // Graph parameters
  useEffect(() => {
    let chartLabels: any[] = []
    let chartData: any[] = []

    revenueData?.length &&
      revenueData
        ?.slice(0, noOfWeeks + 1)
        ?.reverse()
        ?.map((data: any) => {
          chartLabels.push(
            data?._id === 0 ? 'Current week' : `${data?._id} Weeks ago`
          )
          chartData.push(data?.totalRevenue)
        })

    let config: any = {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: 'Weekly Revenue',
            fill: false,
            backgroundColor: '#ff9800',
            borderColor: '#ff9800',
            data: chartData,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: 'Sales Charts',
          fontColor: 'white',
        },
        legend: {
          labels: {
            fontColor: 'white',
          },
          align: 'end',
          position: 'bottom',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: 'rgba(255,255,255,.7)',
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Month',
                fontColor: 'white',
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: 'rgba(33, 37, 41, 0.3)',
                zeroLineColor: 'rgba(0, 0, 0, 0)',
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: 'rgba(255,255,255,.7)',
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Value',
                fontColor: 'white',
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: 'rgba(255, 255, 255, 0.15)',
                zeroLineColor: 'rgba(33, 37, 41, 0)',
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
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
  }, [revenueData, noOfWeeks])

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Growth
              </h6>
              <h3 className="text-blueGray-700 text-xl font-semibold">
                Weekly Revenue
              </h3>
            </div>
            <div className="relative w-[50%] px-4 max-w-[50%] text-right flex-grow flex-1 flex items-center justify-end gap-2">
              For last
              <FilterDropdown
                setStartDateTime={setStartDate}
                setEndDateTime={setEndDate}
                setNumber={setNoOfWeeks}
                filter="number"
              />
              weeks
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

export default LineChartWeeklyRevenue
