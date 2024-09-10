import React, { FC, Fragment, useEffect, useState } from 'react'
import { Transition, Listbox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import FilterDropdown from './FilterDropdown'
import NcInputNumber from '@/components/NcInputNumber'

// base card

export interface BaseCardProps {
  title?: string
  titleSpace?: string
  body?: any
  setStartDateTime?: any
  setEndDateTime?: any
  setNumber?: any
  filter?: string
}

const dateValues = [
  {
    id: 1,
    name: 'All',
    value: 'all',
  },
  {
    id: 2,
    name: 'Today',
    value: 'today',
  },
  {
    id: 3,
    name: 'Yesterday',
    value: 'yesterday',
  },
  {
    id: 4,
    name: 'This Week',
    value: 'thisWeek',
  },
  {
    id: 5,
    name: 'Last Week',
    value: 'lastWeek',
  },
  {
    id: 6,
    name: 'This Month',
    value: 'thisMonth',
  },
  {
    id: 7,
    name: 'Last Month',
    value: 'lastMonth',
  },
  {
    id: 8,
    name: 'This Year',
    value: 'thisYear',
  },
  {
    id: 9,
    name: 'Last Year',
    value: 'lastYear',
  },
]

const numberValues = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: i + 1,
  value: i + 1,
}))

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const BaseCard: FC<BaseCardProps> = ({
  title,
  titleSpace = 0,
  body,
  setStartDateTime,
  setEndDateTime,
  setNumber,
  filter = 'time',
}) => {
  const [startDate, setStartDate] = useState('2009-06-10T09:00:00Z')
  const [endDate, setEndDate] = useState('2089-06-15T18:00:00Z')
  const [selectedDateFilter, setSelectedDateFilter] = useState<any>(
    filter === 'time' ? dateValues[0] : numberValues[5]
  )

  // Filter Dropdown Component
  const FilterDropdown = () => {
    return (
      <Listbox value={selectedDateFilter} onChange={setSelectedDateFilter}>
        {({ open }) => (
          <>
            <div className={'relative'}>
              <Listbox.Button
                className={`relative w-${
                  filter === 'number' ? 'auto' : 'full'
                } cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6`}
              >
                <span className="flex items-center">
                  <span className="ml-3 block truncate">
                    {selectedDateFilter?.name}
                  </span>
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
                <Listbox.Options className="absolute right-0 z-10 min-w-fit w-full mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filter === 'time'
                    ? dateValues.map((type) => (
                        <Listbox.Option
                          key={type.id}
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
                                    selected ? 'font-semibold' : 'font-normal',
                                    'ml-3 block truncate'
                                  )}
                                >
                                  {type.name}
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
                    : numberValues.map((type) => (
                        <Listbox.Option
                          key={type.id}
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
                                    selected ? 'font-semibold' : 'font-normal',
                                    'ml-3 block truncate'
                                  )}
                                >
                                  {type.name}
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

  // No. of Customers Filter Component
  // const CustomersNumberFilter = () => {
  //     return (
  //         <NcInputNumber
  //             label="Bookings:"
  //             defaultValue={10}
  //             // setCount={setNumber}
  //             onChange={(value) => setNumber(value)}
  //             className="justify-end"
  //         />
  //     )
  // }

  // Date Selection Function
  const handleDateFilterSelect = (selectedValue: string) => {
    let newStartDate = startDate
    let newEndDate = endDate

    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    switch (selectedValue) {
      case 'today':
        newStartDate = currentDate.toISOString()
        newEndDate = new Date(currentDate.getTime() + 86399000).toISOString()
        console.log(`${newStartDate}   ${newEndDate}`)
        break
      case 'yesterday':
        const yesterdayDate = new Date(currentDate.getTime() - 86400000)
        newStartDate = yesterdayDate.toISOString()
        newEndDate = new Date(yesterdayDate.getTime() + 86399000).toISOString()
        console.log(`${newStartDate}   ${newEndDate}`)
        break
      case 'thisWeek':
        const startOfWeek = new Date(currentDate)
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
        startOfWeek.setHours(0, 0, 0, 0)
        newStartDate = startOfWeek.toISOString()
        newEndDate = new Date(currentDate.getTime() + 86399000).toISOString()
        console.log(`${newStartDate}   ${newEndDate}`)
        break
      case 'lastWeek':
        const startOfLastWeek = new Date(currentDate)
        startOfLastWeek.setDate(
          currentDate.getDate() - currentDate.getDay() - 6
        )
        startOfLastWeek.setHours(0, 0, 0, 0)
        newStartDate = startOfLastWeek.toISOString()
        const endOfLastWeek = new Date(startOfLastWeek)
        endOfLastWeek.setDate(startOfLastWeek.getDate() + 6)
        newEndDate = new Date(endOfLastWeek.getTime() + 86399000).toISOString()
        console.log(`${newStartDate}   ${newEndDate}`)
        break
      case 'thisMonth':
        const startOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        )
        startOfMonth.setHours(0, 0, 0, 0)
        newStartDate = startOfMonth.toISOString()
        newEndDate = new Date(currentDate.getTime() + 86399000).toISOString()
        console.log(`${newStartDate}   ${newEndDate}`)
        break
      case 'lastMonth':
        const startOfLastMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          1
        )
        startOfLastMonth.setHours(0, 0, 0, 0)
        const endOfLastMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          0
        )
        newStartDate = startOfLastMonth.toISOString()
        newEndDate = new Date(endOfLastMonth.getTime() + 86399000).toISOString()
        console.log(`${newStartDate}   ${newEndDate}`)
        break
      case 'thisYear':
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1)
        startOfYear.setHours(0, 0, 0, 0)
        newStartDate = startOfYear.toISOString()
        newEndDate = new Date(currentDate.getTime() + 86399000).toISOString()
        console.log(`${newStartDate}   ${newEndDate}`)
        break
      case 'lastYear':
        const startOfLastYear = new Date(currentDate.getFullYear() - 1, 0, 1)
        startOfLastYear.setHours(0, 0, 0, 0)
        const endOfLastYear = new Date(currentDate.getFullYear() - 1, 11, 31)
        newStartDate = startOfLastYear.toISOString()
        newEndDate = new Date(endOfLastYear.getTime() + 86399000).toISOString()
        console.log(`${newStartDate}   ${newEndDate}`)
        break
      case 'all':
        // default start and end date is set 'all'
        newStartDate = '2009-06-10T00:00:00Z'
        newEndDate = '2089-06-15T23:59:59Z'
        console.log(`${newStartDate}   ${newEndDate}`)
        break
      default:
        newStartDate = startDate
        newEndDate = endDate
        break
    }

    setStartDate(newStartDate)
    setEndDate(newEndDate)

    filter === 'number' && setNumber(selectedValue)
  }

  useEffect(() => {
    handleDateFilterSelect(selectedDateFilter?.value)
  }, [selectedDateFilter])

  useEffect(() => {
    console.log(`Dates -> ${startDate}   ${endDate}`)
    setStartDateTime && setStartDateTime(startDate)
    setEndDateTime && setEndDateTime(endDate)
  }, [startDate, endDate])

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className={`flex flex-wrap items-center gap-[${titleSpace}%]`}>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                {title}
              </h3>
            </div>
            <div className="relative w-[50%] px-4 max-w-[50%] flex-grow flex-1 text-right">
              {filter === 'time' ? (
                <FilterDropdown />
              ) : (
                <div className="flex items-center justify-end gap-2">
                  Minumum
                  <FilterDropdown />
                  bookings
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="block w-full h-72 overflow-x-auto">
          {/* Card Body */}
          {body}
        </div>
      </div>
    </>
  )
}

export default BaseCard
