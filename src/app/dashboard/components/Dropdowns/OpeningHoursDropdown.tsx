import React, { Fragment, use, useEffect, useState } from 'react'
import { bookingDays } from '@/type/BookingsTypes'
import { Transition, Listbox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

interface OpeningHoursDropdownProps {
  options?: string[]
  priceObject: {
    day: bookingDays
    openTime: string
    closeTime: string
  }
  removeItem: () => void
  onChange: (data: {
    selectedOption: bookingDays
    openTime: string
    closeTime: string
  }) => void
  avaibleOptions?: string[]
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const timeValues: string[] = Array.from(
  { length: 26 },
  (_, i) =>
    `${(9 + Math.floor(i / 2)) % 12 || 12}:${i % 2 === 0 ? '00' : '30'} ${
      i < 6 ? 'AM' : 'PM'
    }`
)

const OpeningHoursDropdown: React.FC<OpeningHoursDropdownProps> = ({
  options = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  priceObject,
  removeItem,
  onChange,
  avaibleOptions = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
}) => {
  const [selectedOption, setSelectedOption] = useState<bookingDays>(
    priceObject?.day
  )
  const [openTime, setOpenTime] = useState<string>(
    priceObject?.openTime || timeValues[0]
  )
  const [closeTime, setCloseTime] = useState<string>(
    priceObject?.closeTime || timeValues[timeValues.length - 1]
  )

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value as bookingDays)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    setOpenTime(value.toString())
    setCloseTime(value.toString())
  }

  const removePricingItem = () => {
    return () => {
      removeItem && removeItem()
    }
  }
  useEffect(() => {
    setSelectedOption(priceObject?.day)
    priceObject?.openTime && setOpenTime(priceObject?.openTime)
    priceObject?.closeTime && setCloseTime(priceObject?.closeTime)
  }, [priceObject])

  useEffect(() => {
    onChange && onChange({ selectedOption, openTime, closeTime })
  }, [selectedOption, openTime, closeTime])

  useEffect(() => {
    onChange && onChange({ selectedOption, openTime, closeTime })
  }, [selectedOption, openTime, closeTime])

  // Timing Dropdown Component
  const TimingDropdown = ({ time, setTime, type }: any) => {
    return (
      <Listbox value={time} onChange={setTime}>
        {({ open }) => (
          <>
            <div className={'relative'}>
              <Listbox.Button
                className={`relative cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6`}
              >
                <span className="flex items-center">
                  <span className="ml-3 block truncate">{time}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 min-w-fit mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {type === 'open'
                    ? timeValues
                        .slice(0, timeValues.indexOf(closeTime))
                        .map((type, key) => (
                          <Listbox.Option
                            key={key}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? 'bg-indigo-600 text-white'
                                  : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                              )
                            }
                            value={type}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(
                                      selected
                                        ? 'font-semibold'
                                        : 'font-normal',
                                      'ml-3 block truncate'
                                    )}
                                  >
                                    {type}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))
                    : timeValues
                        .slice(timeValues.indexOf(openTime) + 1)
                        .map((type, key) => (
                          <Listbox.Option
                            key={key}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? 'bg-indigo-600 text-white'
                                  : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                              )
                            }
                            value={type}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(
                                      selected
                                        ? 'font-semibold'
                                        : 'font-normal',
                                      'ml-3 block truncate'
                                    )}
                                  >
                                    {type}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                  >
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
          </>
        )}
      </Listbox>
    )
  }

  return (
    <div className="border border-0 rounded-xl p-3">
      <div className="flex items-center justify-between mb-2">
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="relative w-full rounded-lg focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white h-10 cursor-pointer dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900"
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-neutral-900 py-1 text-base shadow-lg sm:text-sm z-30"
              disabled={!avaibleOptions.includes(option)}
            >
              {option}
            </option>
          ))}
        </select>
        <button onClick={removePricingItem()} className="px-2" type="button">
          <i className="las la-trash text-2xl text-red-600 hover:text-red-800"></i>
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        From{' '}
        <TimingDropdown time={openTime} setTime={setOpenTime} type="open" /> to{' '}
        <TimingDropdown time={closeTime} setTime={setCloseTime} type="close" />
      </div>
    </div>
  )
}

export default OpeningHoursDropdown
