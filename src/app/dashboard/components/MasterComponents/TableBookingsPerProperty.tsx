import React, { FC, useState, useEffect, Key } from 'react'
import { useAppSelector } from '@/redux/app/hooks'
import LoadingIndicator from '@/components/LoadingIndicator'
import BaseCard from './BaseCard'

export interface TableBookingsPerPropertyProps {}

const TableBookingsPerProperty: FC<TableBookingsPerPropertyProps> = () => {
  const userData = useAppSelector((state) => state.userData)
  const myToken = userData?.token?.access?.token

  const [isLoading, setIsLoading] = useState(false)
  const [bookingsPerPropertyData, setBookingsPerPropertyData] = useState<any>(
    {}
  )

  const [startDate, setStartDate] = useState('2009-06-10T09:00:00Z')
  const [endDate, setEndDate] = useState('2089-06-15T18:00:00Z')

  const getBookingsPerPropertyData = async () => {
    try {
      setIsLoading(true)

      const res = await fetch(
        `https://api-dev.desklinq.com/v1/analytics/bookingsPerProperty?startTime=${startDate}&endTime=${endDate}&cacheBuster=${Math.random()}`,
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

      setBookingsPerPropertyData(resData?.data)
    } catch (err) {
      console.error('Error fetching', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getBookingsPerPropertyData()
  }, [startDate, endDate])

  // Card Body
  const TableBookingsPerPropertyBody = () => {
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
                    Property Name
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Bookings
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookingsPerPropertyData.length &&
                  bookingsPerPropertyData.map((data: any, index: Key) => {
                    return (
                      <tr
                        key={index}
                        className="hover:cursor-pointer hover:bg-[#f8fafc]"
                      >
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          {data?.name?.length < 30
                            ? data?.name
                            : data?.name?.substring(0, 30) + '...'}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {data?.bookings?.length}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </>
        )}
      </>
    )
  }

  return (
    <BaseCard
      title="Bookings Per Property"
      body={<TableBookingsPerPropertyBody />}
      setStartDateTime={setStartDate}
      setEndDateTime={setEndDate}
    />
  )
}

export default TableBookingsPerProperty
