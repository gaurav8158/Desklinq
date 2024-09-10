import * as React from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  {
    field: 'propertyName',
    headerName: 'Property',
    type: 'string',
    flex: 1,
  },
  {
    field: 'offeringName',
    headerName: 'Offering',
    flex: 1,
    type: 'string',
  },
  {
    field: 'offeringType',
    headerName: 'Type',
    flex: 0.8,
    type: 'string',
  },
  {
    field: 'fromTime',
    headerName: 'From Time',
    flex: 0.8,
    type: 'string',
  },
  {
    field: 'toTime',
    headerName: 'To Time',
    flex: 0.8,
    type: 'string',
  },
  {
    field: 'payableAmount',
    headerName: 'Payable Amount',
    flex: 1,
    type: 'number',
  },
  {
    field: 'paymentStatus',
    headerName: 'Payment Status',
    flex: 1,
    type: 'string',
  },
  {
    field: 'customerDetails',
    headerName: 'Customer Details',
    type: 'string',
    flex: 1.2,
    minWidth: 120,
  },
]

const rows = [
  {
    propertyName: 'Property A',
    offeringName: 'Offering X',
    offeringType: 'Type X',
    fromTime: 'From Time X',
    toTime: 'To Time X',
    payableAmount: 'Payable Amount X',
    paymentStatus: 'Payment Status X',
    customerDetails: 'Customer Details X',
  },
  {
    propertyName: 'Property B',
    offeringName: 'Offering Y',
    offeringType: 'Type Y',
    fromTime: 'From Time Y',
    toTime: 'To Time Y',
    payableAmount: 'Payable Amount Y',
    paymentStatus: 'Payment Status Y',
    customerDetails: 'Customer Details Y',
  },
]

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }} className="">
      <DataGrid
        getRowId={(row) => row.propertyName}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
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
      />
    </div>
  )
}
