import { changeString } from '@/function/fuction'
import Badge from '@/shared/Badge'
import {
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from '@mui/x-data-grid'

const CustomCells = (
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
) => {
  const { phone, name } = params.value
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>{name}</span>
      <span>{phone}</span>
    </div>
  )
}

const PropertyCell = (
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
) => {
  const { propertyName, offeringName } = params.value
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span className="capitalize text-lg font-sans">{offeringName}</span>
      <span className="capitalize text-xs text-gray-500">{propertyName}</span>
    </div>
  )
}
const TimeCell = (
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
) => {
  const { startTime, endTime } = params.value // Add null check for params.value
  return (
    <div className="flex items-center space-x-1">
      <span className="text-xs dark:text-neutral-400">
        {startTime}
        <br />
        {endTime}
      </span>
    </div>
  )
}

const statusCell = (
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
) => {
  const { status } = params.value
  return (
    <Badge
      name={
        <div className="flex items-center">
          <i className="text-sm las la-circle"></i>
          <span className="ml-1">{changeString(status)}</span>
        </div>
      }
      // , 'UNAVAILABLE', 'CHECKED_OUT', 'IN_PROGRESS'
      color={
        status === 'BOOKED' ? 'green' : status == 'CANCELLED' ? 'gray' : 'red'
      }
    />
  )
}

export const columns: GridColDef[] = [
  {
    field: 'PropertyDetails',
    headerName: 'Property',
    renderCell: PropertyCell,
    flex: 1.2,
    type: 'string',
    filterOperators: [],
  },
  {
    field: 'bookingTime',
    headerName: 'Booking Time',
    flex: 1,
    type: 'string',
  },
  {
    field: 'resevationTime',
    headerName: 'Reservation',
    renderCell: TimeCell,
    flex: 1,
    type: 'string',
  },
  {
    field: 'bookingStatus',
    headerName: 'Status',
    renderCell: statusCell,
    flex: 0.8,
    type: 'string',
    align: 'center',
  },
  {
    field: 'payableAmount',
    headerName: 'Payable Amount',
    flex: 0.8,
    type: 'number',
    align: 'center',
  },
  {
    field: 'customerDetails',
    headerName: 'Customer Details',
    renderCell: CustomCells,
    type: 'singleSelect',
    flex: 1.2,
    minWidth: 120,
  },
  {
    field: 'action',
    headerName: '',
    maxWidth: 50,
    type: 'string',
    align: 'center',
    renderCell: (
      params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
    ) => {
      return (
        <button className="flex items-center justify-center">
          <i className="text-sm las la-ellipsis-v"></i>
        </button>
      )
    },
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
]
