const { createSlice } = require('@reduxjs/toolkit')
import {
  FilterTypes,
  PrimaryFilterType,
  SecondaryFilterType,
} from '@/type/FilterTypes'
import { PayloadAction } from '@reduxjs/toolkit'

const nextDay = new Date()
nextDay?.setDate(nextDay.getDate() + 2)

const initialState: FilterTypes = {
  primaryFilter: {
    space: 'Hot desk',
    coordinates: [77.5945627, 12.9715987],
    dateTime: {
      fromDate: new Date().toISOString(),
      fromTime: '00:00',
      toDate: new Date(nextDay).toISOString(),
      toTime: '23:59',
    },
    minCapacity: 1,
    page: 1,
  },
  secondaryFilter: {
    budget: [],
    radius: 30,
    duration: 0,
    amenities: [],
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updatePrimaryFilter: (
      state: FilterTypes,
      action: PayloadAction<PrimaryFilterType>
    ) => {
      state.primaryFilter = {
        ...state.primaryFilter,
        ...action.payload,
      }
    },
    updateSecondaryFilter: (
      state: FilterTypes,
      action: PayloadAction<SecondaryFilterType>
    ) => {
      state.secondaryFilter = {
        ...state.secondaryFilter,
        ...action.payload,
      }
    },
  },
})

export const { updatePrimaryFilter, updateSecondaryFilter } =
  filterSlice.actions
export default filterSlice.reducer
