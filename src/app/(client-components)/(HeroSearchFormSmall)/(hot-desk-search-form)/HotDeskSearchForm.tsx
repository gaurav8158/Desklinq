import React, { FC } from 'react'
import LocationInput from '../LocationInput'
import GuestsInput from '../GuestsInput'
import { StaySearchFormFields } from '../../type'
import { Route } from 'next'
import DatesRangeInput from '../DatesRangeInput'
import ButtonSubmit from '../ButtonSubmit'

export interface HotDeskSearchFormProps {
  defaultFieldFocus?: StaySearchFormFields
}

const HotDeskSearchForm: FC<HotDeskSearchFormProps> = ({
  defaultFieldFocus,
}) => {
  const renderForm = () => {
    return (
      <form className="relative w-full grid grid-cols-2 lg:grid-cols-4 justify-center  items-center rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
        <LocationInput
          // onInputDone={() => setDateFocused("startDate")}
          className="lg:flex-[1.5]"
          autoFocus={defaultFieldFocus === 'location'}
        />
        {/* <div className="hidden lg:block self-center border-r border-slate-200 dark:border-slate-700 h-8"></div> */}
        <DatesRangeInput className="lg:flex-[1.2]" />

        {/* <div className="hidden lg:block self-center border-r border-slate-200 dark:border-slate-700 h-8"></div> */}
        <GuestsInput
          className="lg:flex-1"
          autoFocus={defaultFieldFocus === 'co-workers'}
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

export default HotDeskSearchForm
