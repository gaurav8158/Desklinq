import React, { FC } from 'react'
import LocationInput from '../LocationInput'
import ButtonSubmit from '../ButtonSubmit'

const VirtualOfficeSearchForm: FC<{}> = ({}) => {
  const renderForm = () => {
    return (
      <div className="flex justify">
        <form className="w-2/5 relative mt-8 flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 ">
          <LocationInput className="flex-[1.5]" />
          <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
          <div className="pr-2 xl:pr-4 flex items-center">
            <ButtonSubmit href={'/listing-stay-map'} />
          </div>
        </form>
      </div>
    )
  }

  return renderForm()
}

export default VirtualOfficeSearchForm
