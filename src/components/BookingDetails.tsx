import * as React from 'react'
import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import TablePagination from '@mui/material/TablePagination'
import { useAppSelector } from '@/redux/app/hooks'
import { vendorBooking } from '@/type/DashBoardTypes'
import { dateRenderBooking } from '@/function/fuction'
import userService from '@/service/user.service'
import LoadingIndicator from '@/components/LoadingIndicator'

export default function BookingDetails({
  propertyId,
  offeringId,
  startDate,
  endDate,
  status,
}: {
  propertyId: string
  offeringId: string
  startDate: string
  endDate: string
  status: string
}) {
  const [orderBy, setOrderBy] = useState('')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [data, setData] = useState<any[]>([])

  const userData = useAppSelector((state) => state.userData)
  // console.log(userData);
  const token = userData.token.access?.token
  const [bookingData, setBookingData] = useState<{
    loading: boolean
    data: vendorBooking[] | null
  }>({ loading: true, data: null })
  const myToken = userData?.token?.access?.token
  const vId = userData?.user?.id
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // console.log(vId);
  // console.log(`${propertyId} ${offeringId} ${startDate} ${endDate} ${status}`)
  const getanAlyticsData = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(
        `https://api-dev.desklinq.com/v1/bookings/vendorId/${vId}?propertyId=${propertyId}&offeringId=${offeringId}&startTime=2000-06-10T09:00:00Z&endTime=2089-06-15T18:00:00Z&status=IN_PROGRESS`,

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
      console.log(analyticsData)
      if (analyticsData.data) {
        const transformedData = analyticsData.data
          .filter((item: any) => {
            const updatedAtDate = new Date(item.bookingInfo.updatedAt)
            const startDateDate = new Date(startDate)
            const endDateDate = new Date(endDate)
            return (
              updatedAtDate >= startDateDate && updatedAtDate <= endDateDate
            )
          })
          .map((item: any) => {
            console.log(item)

            const {
              offering,
              property: { propertyName },
              bookingInfo: { price, startTime, endTime, status, updatedAt },
              customer: { firstName, lastName, phone },
            } = item

            // Check if 'offering' is defined before accessing its properties
            const offeringName = offering?.offeringName || 'N/A'
            const offeringType = offering?.offeringType || 'N/A'

            // Exclude items with offeringName as "N/A" or undefined
            if (offeringName === 'N/A' || typeof offeringName === 'undefined') {
              return null
            }

            // Convert start time and end time to date and time format
            const startTimeFormatted = new Date(startTime)
              .toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
              .replace(/am|pm/gi, (match) => match.toUpperCase())

            const endTimeFormatted = new Date(endTime)
              .toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })
              .replace(/am|pm/gi, (match) => match.toUpperCase())
            return {
              offeringName,
              offeringType,
              propertyName,
              status,
              price,
              startTime: startTimeFormatted,
              endTime: endTimeFormatted,
              updatedAt,
              customerDetail: `${firstName} ${lastName} ${phone}`,
            }
          })
          .filter((item: any) => item !== null) // Remove null items from the array

        setData(transformedData)
        console.log(transformedData)
      } else {
        console.error(
          'Data property is missing or undefined in the API response'
        )
      }
    } catch (err) {
      console.error('Error fetching', err)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getanAlyticsData()
  }, [propertyId, offeringId, startDate, endDate, status])

  useEffect(() => {
    setData(bookingData.data || [])
  }, [bookingData.data])

  const handleSortRequest = (property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const getComparator = (prop: string) => {
    return (a: any, b: any) => {
      if (order === 'asc') {
        return a[prop] < b[prop] ? -1 : 1
      } else {
        return a[prop] > b[prop] ? -1 : 1
      }
    }
  }

  const sortedData = orderBy ? data.slice().sort(getComparator(orderBy)) : data

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleDateFilterSelect = (selectedValue: string) => {
    let newStartDate = startDate
    let newEndDate = endDate

    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
  }

  return (
    <>
      {isLoading && <LoadingIndicator />}
      {!isLoading && (
        <Paper className="border border-purple-600">
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="bg-indigo-700">
                  <TableCell align="left" colSpan={8}>
                    <h1 className="text-white" style={{ fontSize: '30px' }}>
                      Booking Details
                    </h1>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-gray-200">
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'propertyName'}
                      direction={orderBy === 'propertyName' ? order : 'asc'}
                      onClick={() => handleSortRequest('propertyName')}
                    >
                      Property Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === 'offeringName'}
                      direction={orderBy === 'offeringName' ? order : 'asc'}
                      onClick={() => handleSortRequest('offeringName')}
                    >
                      Offering Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === 'offeringType'}
                      direction={orderBy === 'offeringType' ? order : 'asc'}
                      onClick={() => handleSortRequest('offeringType')}
                    >
                      Offering Type
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === 'date'}
                      direction={orderBy === 'date' ? order : 'asc'}
                      onClick={() => handleSortRequest('date')}
                    >
                      From Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === 'date'}
                      direction={orderBy === 'date' ? order : 'asc'}
                      onClick={() => handleSortRequest('date')}
                    >
                      To Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === 'amount'}
                      direction={orderBy === 'amount' ? order : 'asc'}
                      onClick={() => handleSortRequest('amount')}
                    >
                      Amount
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === 'paymentStatus'}
                      direction={orderBy === 'paymentStatus' ? order : 'asc'}
                      onClick={() => handleSortRequest('paymentStatus')}
                    >
                      Payment Status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === 'customerDetails'}
                      direction={orderBy === 'customerDetails' ? order : 'asc'}
                      onClick={() => handleSortRequest('customerDetails')}
                    >
                      Customer Details
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.propertyName}
                      </TableCell>
                      <TableCell align="center">{row.offeringName}</TableCell>
                      <TableCell align="center">{row.offeringType}</TableCell>
                      <TableCell align="center">{row.startTime}</TableCell>
                      <TableCell align="center">{row.endTime}</TableCell>
                      <TableCell align="center">{row.price}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">{row.customerDetail}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </>
  )
}
