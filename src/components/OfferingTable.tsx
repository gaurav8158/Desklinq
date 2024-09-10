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
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useAppSelector } from '@/redux/app/hooks'
import Header from '@/app/dashboard/components/Header'
import BookingDetails from './BookingDetails'
import LoadingIndicator from '@/components/LoadingIndicator'

export default function OfferingTable({ offId }: { offId: string }) {
  // console.log(offId);
  const [offeringData, setOfferingData] = useState<any[]>([])
  const userData = useAppSelector((state) => state.userData)
  const myToken = userData?.token?.access?.token
  const filteredData = offeringData.filter((item: any) => item.id === offId)
  // console.log(filteredData)
  //  const [totalData,setTotalData] = useState(offeringData);
  const [data, setData] = useState(filteredData)
  const [orderBy, setOrderBy] = useState('')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [startDate, setStartDate] = useState('2009-06-10T09:00:00Z')
  const [endDate, setEndDate] = useState('2089-06-15T18:00:00Z')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [selectedDateFilter, setSelectedDateFilter] = useState('all')
  const DateFilterDropdown = ({
    onSelect,
  }: {
    onSelect: (value: string) => void
  }) => {
    const handleDateSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value
      onSelect(selectedValue)
    }

    return (
      <select
        className="rounded-xl"
        onChange={handleDateSelect}
        value={selectedDateFilter}
      >
        <option value="all">All</option>
        <option value="today">Today</option>
        <option value="yesterday">Yesterday</option>
        <option value="thisWeek">This Week</option>
        <option value="lastWeek">Last Week</option>
      </select>
    )
  }

  const [selectedRow, setSelectedRow] = useState<{
    offeringId: string
    startTime: string
    endTime: string
    status: string
  } | null>(null)

  const handleRowwClick = (row: {
    offeringId: string
    startTime: string
    endTime: string
    status: string
  }) => {
    setSelectedRow(row)
  }

  const getanAlyticsData = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(
        `https://api-dev.desklinq.com/v1/bookings/analytics?context=TotalBooking,Cancelled&startTime=${startDate}&endTime=${endDate}&summary=false&groupBy=offerings&accessId=64c7cfbe9c2b6dfb245d5d9a?cachebuster=${Math.random()}`,

        //
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
      // console.log(analyticsData)
      const transformedData = await analyticsData.data.map(
        (item: any, index: number) => {
          const {
            groupBy: { property, offering },
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
            id: property.id,
            offeringId: offering._id,
            properties: offering.name,
            type: offering.type,
            totalBookings,
            cancelledBookings,
            upcomingBookings,
            completedBookings,
            totalRevenue,
            AmountToBeCollected,
          }
        }
      )
      setOfferingData(transformedData)
    } catch (err) {
      console.error('Error fetching', err)
    } finally {
      setIsLoading(false)
    }
  }
  // Call getanAlyticsData when the component mounts
  useEffect(() => {
    getanAlyticsData()
  }, [startDate, endDate])

  // Update filteredData when offeringData changes
  useEffect(() => {
    const filteredData = offeringData.filter((item: any) => item.id === offId)
    setData(filteredData)
  }, [offeringData, offId])

  // useEffect(() => {
  //   setData(filteredData)
  // }, [filteredData])

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

    switch (selectedValue) {
      case 'today':
        newStartDate = currentDate.toISOString()
        newEndDate = new Date(currentDate.getTime() + 86399000).toISOString()
        console.log(`${newStartDate}   ${newEndDate}`)
        break
      case 'yesterday':
        const yesterdayDate = new Date(currentDate.getTime() - 86400000)
        newStartDate = yesterdayDate.toISOString()
        newEndDate = new Date(yesterdayDate.getTime() + 86399000).toISOString()
        console.log(`${newStartDate}   ${newEndDate}`)
        break
      case 'thisWeek':
        const startOfWeek = new Date(currentDate)
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
        startOfWeek.setHours(0, 0, 0, 0)
        newStartDate = startOfWeek.toISOString()
        newEndDate = new Date(currentDate.getTime() + 86399000).toISOString()
        console.log(`${newStartDate}   ${newEndDate}`)
        break
      case 'lastWeek':
        const startOfLastWeek = new Date(currentDate)
        startOfLastWeek.setDate(
          currentDate.getDate() - currentDate.getDay() - 6
        )
        startOfLastWeek.setHours(0, 0, 0, 0)
        newStartDate = startOfLastWeek.toISOString()
        const endOfLastWeek = new Date(startOfLastWeek)
        endOfLastWeek.setDate(startOfLastWeek.getDate() + 6)
        newEndDate = new Date(endOfLastWeek.getTime() + 86399000).toISOString()
        console.log(`${newStartDate}   ${newEndDate}`)
        break
      case 'all':
        newStartDate = '2009-06-10T00:00:00Z'
        newEndDate = '2089-06-15T23:59:59Z'
        break
      default:
        newStartDate = startDate
        newEndDate = endDate
        break
    }

    setStartDate(newStartDate)
    setEndDate(newEndDate)
    setSelectedDateFilter(selectedValue)

    // Call the function that fetches data based on the new dates
    // e.g., getPropertyData() or getAnalyticsData()
  }
  const formattedStartDate = new Date(startDate)
  formattedStartDate.setDate(formattedStartDate.getDate() - 1)
  const formattedStartDateString = formattedStartDate.toLocaleDateString(
    'en-GB',
    {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }
  )
  const formattedEndDate = new Date(endDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  // const [clickedRowId, setClickedRowId] = useState('')

  const handleRowClick = () => {
    setIsHeaderVisible(true)
    // setClickedRowId(id)
  }

  return (
    <>
      {isLoading && <LoadingIndicator />}
      {!isLoading && isHeaderVisible && (
        <>
          <BookingDetails
            propertyId={offId}
            offeringId={selectedRow?.offeringId || ''}
            startDate={startDate}
            endDate={endDate}
            status={selectedRow?.status || ''}
          />
        </>
      )}

      {!isLoading && !isHeaderVisible && (
        <Paper className="border border-indigo-700">
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="bg-indigo-700 ">
                  <TableCell align="left" colSpan={3}>
                    <h1 className="text-white" style={{ fontSize: '30px' }}>
                      Your Offering
                    </h1>
                    <p className="text-white">
                      ~{' '}
                      {formattedStartDateString == '09/06/2009'
                        ? 'All Dates'
                        : `${formattedStartDateString} to ${formattedEndDate}`}
                    </p>
                  </TableCell>
                  <TableCell align="right" colSpan={5}>
                    <DateFilterDropdown onSelect={handleDateFilterSelect} />
                  </TableCell>
                </TableRow>
                <TableRow className="bg-gray-200">
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'properties'}
                      direction={orderBy === 'properties' ? order : 'asc'}
                      onClick={() => handleSortRequest('properties')}
                    >
                      Your Offering
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'type'}
                      direction={orderBy === 'type' ? order : 'asc'}
                      onClick={() => handleSortRequest('type')}
                    >
                      Type
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'totalBookings'}
                      direction={orderBy === 'totalBookings' ? order : 'asc'}
                      onClick={() => handleSortRequest('totalBookings')}
                    >
                      Total Bookings
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === 'cancelledBookings'}
                      direction={
                        orderBy === 'cancelledBookings' ? order : 'asc'
                      }
                      onClick={() => handleSortRequest('cancelledBookings')}
                    >
                      Cancelled Bookings
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === 'upcomingBookings'}
                      direction={orderBy === 'upcomingBookings' ? order : 'asc'}
                      onClick={() => handleSortRequest('upcomingBookings')}
                    >
                      Upcoming Bookings
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === 'completedBookings'}
                      direction={
                        orderBy === 'completedBookings' ? order : 'asc'
                      }
                      onClick={() => handleSortRequest('completedBookings')}
                    >
                      Completed Bookings
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === 'totalRevenue'}
                      direction={orderBy === 'totalRevenue' ? order : 'asc'}
                      onClick={() => handleSortRequest('totalRevenue')}
                    >
                      Total Revenue
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel
                      active={orderBy === 'AmountToBeCollected'}
                      direction={
                        orderBy === 'AmountToBeCollected' ? order : 'asc'
                      }
                      onClick={() => handleSortRequest('AmountToBeCollected')}
                    >
                      Amount To Be Collected
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => (
                    <TableRow
                      key={row.id}
                      className="hover:bg-gray-100"
                      onClick={() => {
                        handleRowClick()
                        handleRowwClick({
                          offeringId: row.offeringId,
                          startTime: '2009-06-10T09:00:00Z',
                          endTime: '2089-06-15T18:00:00Z',
                          status: row.type,
                        })
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.properties}
                      </TableCell>
                      <TableCell align="center">{row.type}</TableCell>
                      <TableCell align="center">{row.totalBookings}</TableCell>
                      <TableCell align="center">
                        {row.cancelledBookings}
                      </TableCell>
                      <TableCell align="center">
                        {row.upcomingBookings}
                      </TableCell>
                      <TableCell align="center">
                        {row.completedBookings}
                      </TableCell>
                      <TableCell align="center">{row.totalRevenue}</TableCell>
                      <TableCell align="center">
                        {row.AmountToBeCollected}
                      </TableCell>
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
