import { configureStore } from '@reduxjs/toolkit'
import listingReducer from '../listing/listingSlice'
import filterReducer from '../filters/filterSlice'
import userDataReducer from '../user/userSlice'

const store = configureStore({
  reducer: {
    listing: listingReducer,
    filter: filterReducer,
    userData: userDataReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
