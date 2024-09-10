import React, { FC, useState, useEffect, useRef } from 'react'
import { useAppSelector } from '@/redux/app/hooks'
import LoadingIndicator from '@/components/LoadingIndicator'
import Chart from 'chart.js/auto'
import FilterDropdown from './FilterDropdown'

export interface BarChartMonthlyRevenueProps {}

const BarChartMonthlyRevenue: FC<BarChartMonthlyRevenueProps> = () => {
  const userData = useAppSelector((state) => state.userData)
  const myToken = userData?.token?.access?.token
  const [isLoading, setIsLoading] = useState(false)
  const [revenueData, setRevenueData] = useState<any>({})

  const [startDate, setStartDate] = useState('2022-01-01T09:00:00Z')
  const [endDate, setEndDate] = useState('2089-06-15T18:00:00Z')
  const [noOfMonths, setNoOfMonths] = useState(6)

  const chartRef = useRef<HTMLCanvasElement | any>(null)

  const getRevenueData = async () => {
    try {
      setIsLoading(true)

      const res = await fetch(
        `https://api-dev.desklinq.com/v1/analytics/monthlyRevenue?startTime=${startDate}&endTime=${endDate}&cacheBuster=${Math.random()}`,
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
        ?.slice(
          revenueData.length > noOfMonths ? revenueData.length - noOfMonths : 0
        )
        ?.map((data: any) => {
          // chartLabels.push(`${data?.month}/${data?.year}`);
          chartLabels.push(`${data?.monthName}-${data?.year}`)
          chartData.push(data?.totalRevenue)
        })

    let config: any = {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [
          {
            label: 'Monthly Revenue',
            fill: false,
            backgroundColor: '#4c51bf',
            borderColor: '#4c51bf',
            data: chartData,
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: 'Orders Chart',
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: 'rgba(0,0,0,.4)',
          },
          align: 'end',
          position: 'bottom',
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: 'Month',
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: 'rgba(33, 37, 41, 0.3)',
                zeroLineColor: 'rgba(33, 37, 41, 0.3)',
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Value',
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: 'rgba(33, 37, 41, 0.2)',
                zeroLineColor: 'rgba(33, 37, 41, 0.15)',
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
  }, [revenueData, noOfMonths])

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
                Monthly Revenue
              </h3>
            </div>
            <div className="relative w-[50%] px-4 max-w-[50%] text-right flex-grow flex-1 flex items-center justify-end gap-2">
              For last
              <FilterDropdown
                setStartDateTime={setStartDate}
                setEndDateTime={setEndDate}
                setNumber={setNoOfMonths}
                filter="number"
              />
              months
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

export default BarChartMonthlyRevenue
