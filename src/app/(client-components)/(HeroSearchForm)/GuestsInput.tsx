'use client'

import React, { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import NcInputNumber from '@/components/NcInputNumber'
import { FC } from 'react'
import ButtonSubmit from './ButtonSubmit'
import { PathName } from '@/routers/types'
import { UserPlusIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks'
import { updatePrimaryFilter } from '@/redux/filters/filterSlice'
import { Route } from 'next'

export interface GuestsInputProps {
  fieldClassName?: string
  className?: string
  buttonSubmitHref?: PathName
  hasButtonSubmit?: boolean
  // getFilterProperty?: (params: any) => any
}

const GuestsInput: FC<GuestsInputProps> = ({
  fieldClassName = '[ nc-hero-field-padding ]',
  className = '[ nc-flex-1 ]',
  buttonSubmitHref = '/listing-stay-map',
  hasButtonSubmit = true,
}) => {
  const primaryFilter = useAppSelector(
    (state: any) => state.filter.primaryFilter
  )
  const dispatch = useAppDispatch()
  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(
    primaryFilter.minCapacity
  )

  const handleChangeData = (value: number) => {
    setGuestAdultsInputValue(value)
    dispatch(updatePrimaryFilter({ minCapacity: value }))
  }
  const totalGuests = guestAdultsInputValue

  return (
    <Popover className={`flex relative ${className}`}>
      {({ open }) => (
        <>
          <div
            className={`flex-1 z-10 flex items-center focus:outline-none ${
              open ? 'nc-hero-field-focused' : ''
            }`}
          >
            <Popover.Button
              className={`relative z-10 flex-1 flex text-left items-center ${fieldClassName} space-x-3 focus:outline-none`}
            >
              <div className="text-neutral-300 dark:text-neutral-400">
                <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className="flex-grow">
                <span className="block xl:text-lg font-semibold">
                  {totalGuests || ''} Co-workers
                </span>
                <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                  {totalGuests ? 'Co-workers' : 'Add co-workers'}
                </span>
              </div>
            </Popover.Button>

            {/* BUTTON SUBMIT OF FORM */}
            {hasButtonSubmit && (
              <div className="pr-2 xl:pr-4">
                <ButtonSubmit href={buttonSubmitHref as Route} />
              </div>
            )}
          </div>

          {open && (
            <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-0.5 bg-white dark:bg-neutral-800"></div>
          )}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
              <NcInputNumber
                className="w-full"
                defaultValue={guestAdultsInputValue}
                onChange={(value) => handleChangeData(value)}
                max={100}
                min={1}
                label="Number of Co-workers"
                // desc="Ages 18 or above"
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default GuestsInput
