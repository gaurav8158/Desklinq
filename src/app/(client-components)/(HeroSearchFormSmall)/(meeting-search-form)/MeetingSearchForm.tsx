'use client'

import React, { FC } from 'react'
import LocationInput from '../LocationInput'
import GuestsInput from '../GuestsInput'
import { Route } from 'next'
import MeetingDatesRangeInput from './MeetingDatesRangeInput'
import ButtonSubmit from '../ButtonSubmit'

export interface MeetingSearchFormProps {
  // defaultFieldFocus?: StaySearchFormFields;
}

const MeetingSearchForm: FC<MeetingSearchFormProps> = () => {
  const renderForm = () => {
    return (
      <form className="relative w-full grid grid-cols-2 lg:grid-cols-4 items-center rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
        <LocationInput
          // onInputDone={() => setDateFocused("startDate")}
          className="flex-[1.5]"
          // autoFocus={defaultFieldFocus === "location"}
        />
        {/* <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div> */}
        <MeetingDatesRangeInput className="flex-[1.2]" />

        {/* <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div> */}
        <GuestsInput
          className="flex-1"
          // autoFocus={defaultFieldFocus === "guests"}
          submitLink={'/listing-stay-map' as Route}
        />
        <div className="pr-2">
          <ButtonSubmit href={'/listing-stay-map' as Route} />
        </div>
      </form>
    )
  }

  return renderForm()
}

export default MeetingSearchForm
