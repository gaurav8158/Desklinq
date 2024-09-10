'use client'

import React, { FC, useState, Fragment, useEffect } from 'react'
import { useAppSelector } from '@/redux/app/hooks'
import Heading from '@/shared/Heading'
import userService from '@/service/user.service'
import { DataGrid, GridToolbarFilterButton } from '@mui/x-data-grid'
import { vendorBooking } from '@/type/DashBoardTypes'
import { dateRenderBooking } from '@/function/fuction'
import { Box } from '@mui/material'
import { columns } from '../components/table/table'

export interface MenuBarProps {}

const MenuBar: FC<MenuBarProps> = () => {
  const userData = useAppSelector((state) => state.userData)
  const token = userData.token.access?.token
  const [bookingData, setBookingData] = useState<{
    loading: boolean
    data: vendorBooking[] | null
  }>({ loading: true, data: null })

  useEffect(() => {
    setBookingData((prev) => ({ ...bookingData, loading: true }))
    userData?.user.id &&
      (async () => {
        try {
          const response = await userService.get(
            `bookings/vendorId/${userData?.user.id}`,
            { cacheBuster: Math.random() * 10 },
            { authorization: `Bearer ${token}` },
            false
          )
          setBookingData({
            loading: false,
            data: response?.data?.map((booking: vendorBooking) => ({
              id: booking.bookingInfo.bookingId,
              PropertyDetails: {
                propertyName: booking.property.propertyName,
                offeringName: booking.offering.offeringName,
              },
              offeringType: booking.offering.offeringType
                .replace(/_/g, ' ')
                .toLowerCase()
                .replace(/\b\w/g, (char: any) => char.toUpperCase()),
              resevationTime: {
                startTime: dateRenderBooking(booking.bookingInfo.startTime),
                endTime: dateRenderBooking(booking.bookingInfo.endTime),
              },
              bookingTime: dateRenderBooking(booking.bookingInfo.updatedAt),
              payableAmount: booking.bookingInfo.price,
              bookingStatus: { status: booking.bookingInfo.status },
              customerDetails: {
                name:
                  booking.customer.firstName + ' ' + booking.customer.lastName,
                phone: booking.customer.phone,
              },
            })),
          })
        } catch (error) {
          console.log(error)
        }
      })()
  }, [token, userData?.user.id])
  console.log(bookingData)

  return (
    <div className="flex flex-wrap justify-center items-center font-sans">
      <Heading isCenter={true} className="pt-8 mb-8">
        Bookings
      </Heading>
      <div style={{ width: '100%' }} className="h-4/5 text-neutral-500">
        <Box sx={{ height: 400, width: 1 }}>
          <DataGrid
            getRowId={(row) => row.id}
            loading={bookingData?.loading}
            rows={bookingData.data || []}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            rowHeight={80}
            pageSizeOptions={[5, 10, 20]}
            sx={{
              '--DataGrid-overlayHeight': '300px',
              boxShadow: 2,
              borderRadius: 2,
              '& .MuiDataGrid-cell': {
                border: 0,
              },
              '& .MuiDataGrid-row': {
                border: 0,
              },
              '& .MuiDataGrid-columnHeader': {
                border: 0,
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                border: 0,
              },
              '& .MuiDataGrid-columnHeaderWrapper': {
                border: 0,
              },
            }}
            slots={{
              toolbar: GridToolbarFilterButton,
            }}
            // disableColumnFilter
            // disableColumnSelector
            // disableDensitySelector
            // slots={{ toolbar: GridToolbarFilterButton , noRowsOverlay: () => <div>No Rows</div>, }}
            // // filterModel={filterModel}
            // // onFilterModelChange={(newModel) => setFilterModel(newModel)}
            // slotProps={{ toolbar: { showQuickFilter: true} }}
            // columnVisibilityModel={columnVisibilityModel}
            // onColumnVisibilityModelChange={(newModel) =>
            //   setColumnVisibilityModel(newModel)
            // }
          />
        </Box>
      </div>
    </div>
  )
}

export default MenuBar
