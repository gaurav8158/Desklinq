import React, { FC } from 'react'
import LocationInput from '../LocationInput'
import GuestsInput from '../GuestsInput'
import MeetingDatesTimeRangeInput from './MeetingDatesRangeInput'

const MeetingSearchForm: FC<{}> = ({}) => {
  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 rounded-[40px] xl:rounded-[49px] shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
        <div className="flex flex-1 rounded-full">
          <LocationInput className="flex-[1.5]" />
          <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
          <MeetingDatesTimeRangeInput className="flex-1" />
          <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
          <GuestsInput className="flex-1" />
        </div>
      </form>
    )
  }

  return renderForm()
}

export default MeetingSearchForm
