'use client'

import React, { FC } from 'react'
import LocationInput from '../LocationInput'
import DatesRangeInput from '../DatesRangeInput'
import GuestsInput from '../GuestsInput'
import { Route } from 'next'

export interface CabinSearchFormProps {
  // defaultFieldFocus?: StaySearchFormFields;
}

const CabinSearchForm: FC<CabinSearchFormProps> = () => {
  const renderForm = () => {
    return (
      <form className="relative flex rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
        <LocationInput
          // onInputDone={() => setDateFocused("startDate")}
          className="flex-[1.5]"
          // autoFocus={defaultFieldFocus === "location"}
        />
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <DatesRangeInput className="flex-[1.2]" />

        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
        <GuestsInput
          className="flex-1"
          // autoFocus={defaultFieldFocus === "guests"}
          submitLink={'/listing-stay-map' as Route}
        />
      </form>
    )
  }

  return renderForm()
}

export default CabinSearchForm
