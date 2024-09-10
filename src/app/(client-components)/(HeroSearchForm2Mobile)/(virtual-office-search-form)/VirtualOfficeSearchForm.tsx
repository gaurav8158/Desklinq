'use client'

import React, { useState } from 'react'
import LocationInput from '../LocationInput'
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks'
import { PrimaryFilterType } from '@/type/FilterTypes'

const VirtualOfficeSearchForm = () => {
  const [fieldNameShow, setFieldNameShow] = useState<'location'>('location')
  const [locationInput, setLocationInput] = useState('')
  const dispatch = useAppDispatch()
  const primaryFilter: PrimaryFilterType = useAppSelector(
    (state: any) => state.filter.primaryFilter
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
            }}
          />
        )}
      </div>
    )
  }
  return (
    <div>
      <div className="w-full space-y-5">
        {/*  */}
        {renderInputLocation()}
      </div>
    </div>
  )
}

export default VirtualOfficeSearchForm
