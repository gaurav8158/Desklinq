import React, { FC, useEffect } from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

export type PricingInfo = {
  context: 'DURATION'
  duration: 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
  area: string
  currency: string
  price: number
  info: string
}

interface Props {
  pricing: PricingInfo[] | null
  onChange?: (
    value: 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
  ) => void
}

const PricingSelection: FC<Props> = ({ pricing, onChange }) => {
  const [selected, setSelected] = useState((pricing && pricing[0]) || null)

  useEffect(() => {
    onChange &&
      onChange(
        selected?.duration ||
          (pricing && pricing[0] && pricing[0].duration) ||
          'HOURLY'
      )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, onChange])

  return (
    <div className="mx-auto w-2/3">
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <div className="relative mt-1 ">
            <div className="flex flex-col ml-2 gap-1 items-start justify-start">
              <span className="font-semibold  text-black"> Booking Type</span>

              <Listbox.Button className="relative text-[#6115E7] text-sm  items-center gap-4 flex flex-row rounded-lg focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white  cursor-pointer dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ">
                <span className="w-[24px] relative ">
                  {selected?.duration ||
                    (pricing && pricing[0] && pricing[0].duration) ||
                    'HOURLY'}
                </span>
                <span className="pointer-events-none  flex items-center ">
                  <ChevronUpDownIcon
                    className={`h-5 w-5 ${open ? 'transform rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-neutral-900 py-1 text-base shadow-lg sm:text-sm z-30">
                {pricing &&
                  pricing.map((item, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-white dark:bg-neutral-900'
                            : 'text-gray-500'
                        }`
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {item.duration}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  )
}

export default PricingSelection
