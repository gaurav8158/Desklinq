'use client'
import converSelectedDateToString from '@/utils/converSelectedDateToString'
import React, { useState } from 'react'
import DatesRangeInput from '../DatesRangeInput'
import LocationInput from '../LocationInput'
import { PrimaryFilterType } from '@/type/FilterTypes'
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks'
import GuestsInput from '../GuestsInput'
import { updatePrimaryFilter } from '@/redux/filters/filterSlice'

const CabinsSearchForm = () => {
  //
  const [fieldNameShow, setFieldNameShow] = useState<
    'location' | 'dates' | 'guests'
  >('location')
  //
  const dispatch = useAppDispatch()
  const primaryFilter: PrimaryFilterType = useAppSelector(
    (state: any) => state.filter.primaryFilter
  )
  //
  const initialFromDate = primaryFilter.dateTime?.fromDate
    ? new Date(primaryFilter.dateTime.fromDate)
    : null
  const initialToDate = primaryFilter.dateTime?.toDate
    ? new Date(primaryFilter.dateTime.toDate)
    : null

  //
  const [locationInput, setLocationInput] = useState('')
  const [startDate, setStartDate] = useState<Date | null>(initialFromDate)
  const [endDate, setEndDate] = useState<Date | null>(initialToDate)
  const [guestInput, setGuestInput] = useState<number>(
    primaryFilter.minCapacity
  )

  //

  const renderInputLocation = () => {
    const isActive = fieldNameShow === 'location'
    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 ${
          isActive
            ? 'rounded-2xl shadow-lg'
            : 'rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow('location')}
          >
            <span className="text-neutral-400">Where</span>
            <span>{locationInput || 'Location'}</span>
          </button>
        ) : (
          <LocationInput
            defaultValue={locationInput}
            onChange={(value) => {
              setLocationInput(value)
              setFieldNameShow('dates')
            }}
          />
        )}
      </div>
    )
  }

  const renderInputDates = () => {
    const isActive = fieldNameShow === 'dates'

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${
          isActive
            ? 'rounded-2xl shadow-lg'
            : 'rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4  `}
            onClick={() => setFieldNameShow('dates')}
          >
            <span className="text-neutral-400">When</span>
            <span>
              {startDate
                ? converSelectedDateToString([startDate, endDate])
                : 'Add date'}
            </span>
          </button>
        ) : (
          <DatesRangeInput />
        )}
      </div>
    )
  }

  const renderInputGuests = () => {
    const isActive = fieldNameShow === 'guests'
    let guestSelected = ''
    if (guestInput) {
      const guest = guestInput || 0
      guestSelected += `${guest} people`
    }

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${
          isActive
            ? 'rounded-2xl shadow-lg'
            : 'rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]'
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow('guests')}
          >
            <span className="text-neutral-400">Who</span>
            <span>{guestSelected || `Add guests`}</span>
          </button>
        ) : (
          <GuestsInput
            defaultValue={guestInput}
            onChange={(value) => {
              setGuestInput(value)
              dispatch(updatePrimaryFilter({ minCapacity: value }))
            }}
          />
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="w-full space-y-5">
        {renderInputLocation()}
        {/*  */}
        {renderInputDates()}
        {/*  */}
        {renderInputGuests()}
        {/*  */}
      </div>
    </div>
  )
}

export default CabinsSearchForm
