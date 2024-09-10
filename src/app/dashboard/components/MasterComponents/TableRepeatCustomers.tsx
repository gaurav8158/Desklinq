import React, { FC, useState, useEffect, Key } from 'react'
import { useAppSelector } from '@/redux/app/hooks'
import LoadingIndicator from '@/components/LoadingIndicator'
import BaseCard from './BaseCard'

export interface TableRepeatCustomersProps {}

const TableRepeatCustomers: FC<TableRepeatCustomersProps> = () => {
  const userData = useAppSelector((state) => state.userData)
  const myToken = userData?.token?.access?.token

  const [isLoading, setIsLoading] = useState(false)
  const [repeatCustomerData, setRepeatCustomerData] = useState<any>({})

  const [bookingsCount, setBookingsCount] = useState(10)

  const getRepeatCustomerData = async () => {
    try {
      setIsLoading(true)

      const res = await fetch(
        `https://api-dev.desklinq.com/v1/analytics/repeatCustomer?bookingCount=${bookingsCount}&cacheBuster=${Math.random()}`,
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

      setRepeatCustomerData(resData?.data)
    } catch (err) {
      console.error('Error fetching', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log(bookingsCount)
    getRepeatCustomerData()
  }, [bookingsCount])

  // Card Body
  const TableRepeatCustomersBody = () => {
    return (
      <>
        {isLoading ? (
          <LoadingIndicator className="my-10" />
        ) : (
          <>
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Customer Name
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Phone
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Email
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Bookings
                  </th>
                </tr>
              </thead>
              <tbody>
                {repeatCustomerData?.length ? (
                  repeatCustomerData?.map((data: any, index: Key) => {
                    return (
                      <tr
                        key={index}
                        className="hover:cursor-pointer hover:bg-[#f8fafc]"
                      >
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          {data?.firstName} {data?.lastName}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {data?.phone}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {data?.email}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {data?.bookings}
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-center whitespace-nowrap p-4">
                    <td colSpan={4}>No Data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </>
    )
  }

  return (
    <BaseCard
      title="Repeat Customers"
      body={<TableRepeatCustomersBody />}
      setNumber={setBookingsCount}
      filter="number"
    />
  )
}

export default TableRepeatCustomers
