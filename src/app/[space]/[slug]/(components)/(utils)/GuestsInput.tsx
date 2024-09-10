'use client'

import React, { Fragment, FC, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import NcInputNumber from '@/components/NcInputNumber'
import { UserPlusIcon } from '@heroicons/react/24/outline'

export interface GuestsInputProps {
  className?: string
  defaultValue?: number
  onChange?: (data: number) => void
  maxcapacity?: number
}

const GuestsInput: FC<GuestsInputProps> = ({
  className = 'flex-1',
  defaultValue,
  onChange,
  maxcapacity,
}) => {
  const [guest, setGuest] = useState(defaultValue || 0)

  const handleChangeData = (value: number) => {
    setGuest(value)
    onChange && onChange(value)
  }

  return (
    <Popover className={`flex relative  border rounded-2xl ${className}`}>
      {({ open }) => (
        <>
          <div
            className={`flex-1 flex items-center focus:outline-none rounded-b-3xl ${
              open ? 'shadow-lg' : ''
            }`}
          >
              <button
              className={`relative z-10 flex-1 flex text-left items-center p-3 space-x-3 focus:outline-none`}
            >
              <div className="text-neutral-300 dark:text-neutral-400">
                <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className="flex-grow">
                <span className="block xl:text-lg font-semibold">
                  {guest || ''} Co-workers
                </span>
                <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                  {guest ? 'Co-workers' : 'Add co-workers'}
                </span>
              </div>
              <div>

             
              <NcInputNumber
                className="w-full"
                defaultValue={guest}
                onChange={(value) => handleChangeData(value)}
                max={maxcapacity}
                min={1}
                label="Number of Co-workers"
                // desc="Ages 16 or above"
              />
               </div>
            </button>
            {/* <Popover.Button
              className={`relative z-10 flex-1 flex text-left items-center p-3 space-x-3 focus:outline-none`}
            >
              <div className="text-neutral-300 dark:text-neutral-400">
                <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className="flex-grow">
                <span className="block xl:text-lg font-semibold">
                  {guest || ''} Co-workers
                </span>
                <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                  {guest ? 'Co-workers' : 'Add co-workers'}
                </span>
              </div>
              <div>

             
              <NcInputNumber
                className="w-full"
                defaultValue={guest}
                onChange={(value) => handleChangeData(value)}
                max={maxcapacity}
                min={1}
                label="Number of Co-workers"
                // desc="Ages 16 or above"
              />
               </div>
            </Popover.Button> */}
          </div>

          {/* <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-50 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl ring-1 ring-black ring-opacity-5 ">
              <NcInputNumber
                className="w-full"
                defaultValue={guest}
                onChange={(value) => handleChangeData(value)}
                max={maxcapacity}
                min={1}
                label="Number of Co-workers"
                // desc="Ages 16 or above"
              />
            </Popover.Panel>
          </Transition> */}
        </>
      )}
    </Popover>
  )
}

export default GuestsInput
