'use client'

import React, { FC } from 'react'
import LocationInput from '../LocationInput'
import { Route } from 'next'
import ButtonSubmit from '../ButtonSubmit'

export interface VirtualOfficeSearchFormProps {
  // defaultFieldFocus?: StaySearchFormFields;
}

const VirtualOfficeSearchForm: FC<VirtualOfficeSearchFormProps> = () => {
  const renderForm = () => {
    return (
      <form className="relative flex rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
        <LocationInput
          // onInputDone={() => setDateFocused("startDate")}
          className="flex-[1.5]"
          // autoFocus={defaultFieldFocus === "location"}
        />
        {/* <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div> */}
        <div className="pr-2 flex items-center">
          <ButtonSubmit href={'/listing-stay-map' as Route} />
        </div>
      </form>
    )
  }

  return renderForm()
}

export default VirtualOfficeSearchForm
