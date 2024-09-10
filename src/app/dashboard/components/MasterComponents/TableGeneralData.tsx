import React, { FC, useState, useEffect } from 'react'
import { useAppSelector } from '@/redux/app/hooks'
import LoadingIndicator from '@/components/LoadingIndicator'
import BaseCard from './BaseCard'

export interface TableGeneralDataProps {}

const TableGeneralData: FC<TableGeneralDataProps> = () => {
  const userData = useAppSelector((state) => state.userData)
  const myToken = userData?.token?.access?.token

  const [isLoading, setIsLoading] = useState(false)
  const [generalData, setGeneralData] = useState<any>({})

  const [startDate, setStartDate] = useState('2009-06-10T09:00:00Z')
  const [endDate, setEndDate] = useState('2089-06-15T18:00:00Z')

  const getGeneralData = async () => {
    try {
      setIsLoading(true)

      const res = await fetch(
        `https://api-dev.desklinq.com/v1/analytics/general?startTime=${startDate}&endTime=${endDate}&cacheBuster=${Math.random()}`,
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

      setGeneralData(resData?.data)
    } catch (err) {
      console.error('Error fetching', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getGeneralData()
  }, [startDate, endDate])

  // Card Body
  const TableGeneralDataBody = () => {
    return (
      <>
        {isLoading ? (
          <LoadingIndicator className="my-10" />
        ) : (
          <>
            {/* General data table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Parameter Name
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:cursor-pointer hover:bg-[#f8fafc]">
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    Total Properties
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {generalData?.properties?.length}
                  </td>
                </tr>
                <tr className="hover:cursor-pointer hover:bg-[#f8fafc]">
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    Total Offerings
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {generalData?.offerings?.length}
                  </td>
                </tr>
                <tr className="hover:cursor-pointer hover:bg-[#f8fafc]">
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    Total Bookings
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {generalData?.bookings?.length}
                  </td>
                </tr>
                <tr className="hover:cursor-pointer hover:bg-[#f8fafc]">
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    Total Revenue Collected
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {generalData?.totalRevenueCollected?.toFixed(1)}
                  </td>
                </tr>
                <tr className="hover:cursor-pointer hover:bg-[#f8fafc]">
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    Total Cancelled Bookings
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {generalData?.totalCancelledBookings}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </>
    )
  }

  return (
    <BaseCard
      title="General Data"
      body={<TableGeneralDataBody />}
      setStartDateTime={setStartDate}
      setEndDateTime={setEndDate}
    />
  )
}

export default TableGeneralData
