import userService from '@/service/user.service'
import {
  PropertiesDataType,
  offeringsListingType,
} from '@/type/propertiesTypes'
import { PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getFilter } from './parameter'
const { createSlice } = require('@reduxjs/toolkit')

interface InitialState {
  loading: Boolean
  data: offeringsListingType[]
  error: string
}

const initialState = {
  loading: false,
  data: [],
  error: '',
} as InitialState

export const fetchListing = createAsyncThunk(
  'listing/fetchLisiting',
  (_, { getState }: any) => {
    const state = getState().filter
    const filterProperties = getFilter(state)

    return userService
      .get(
        `offerings/filter?cacheBuster=${Math.random() * 1000}`,
        filterProperties,
        {},
        false
      )
      .then((response) => response.data)
  }
)

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(fetchListing.pending, (state: InitialState) => {
      state.loading = true
    })
    builder.addCase(
      fetchListing.fulfilled,
      (state: InitialState, action: PayloadAction<offeringsListingType[]>) => {
        state.loading = false
        state.data = action.payload
        state.error = ''
      }
    )
    builder.addCase(
      fetchListing.rejected,
      (state: InitialState, action: any) => {
        state.loading = true
        state.data = []
        state.error = action.error.message || 'Something went wrong'
      }
    )
  },
})

export default listingSlice.reducer
