'use client'

import React, { Fragment, useState, FC, useEffect } from 'react'
import { Popover, Listbox, Transition } from '@headlessui/react'
import { CalendarIcon } from '@heroicons/react/24/outline'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'
import DatePicker from 'react-datepicker'
import Select from 'react-select'

export interface StayDatesRangeInputProps {
  className?: string
  onDatesSelected: (
    totalDays: number,
    startDate: Date | null,
    endDate: Date | null
  ) => void
  duration: string
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  className = 'flex-1',
  onDatesSelected,
  duration,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(new Date())
  const [selectedHours, setSelectedHours] = useState<number[]>([])

  useEffect(() => {
    setEndDate((prevEndDate) => {
      if (!prevEndDate) {
        return new Date()
      }
      return prevEndDate
    })
  }, [])

  useEffect(() => {
    if (startDate && duration === 'MONTHLY') {
      const end = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000)
      setEndDate(end)
      const totalDays =
        Math.floor(
          (end.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1
      onDatesSelected(totalDays, startDate, end)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate])

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setStartDate(start)

    if (duration === 'HOURLY') {
      setEndDate(null)
    } else if (duration === 'MONTHLY' && start) {
      const end = new Date(start.getTime() + 30 * 24 * 60 * 60 * 1000)
      setEndDate(end)
    } else {
      setEndDate(end)
    }
    if (start && end) {
      const totalDays =
        Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) +
        1
      onDatesSelected(totalDays, start, end)
    }
  }

  const onHourSelected = (checked: boolean, hour: number) => {
    if (checked) {
      setSelectedHours((prevHours) => {
        if (!prevHours.includes(hour)) {
          return [...prevHours, hour].sort((a, b) => a - b)
        }
        return prevHours
      })
    } else {
      setSelectedHours((prevHours) => prevHours.filter((h) => h !== hour))
    }
  }

  useEffect(() => {
    if (selectedHours.length > 0 && startDate) {
      const startDateWithHour = new Date(startDate.setHours(selectedHours[0]))
      const endDateWithHour = new Date(
        startDate.setHours(selectedHours[selectedHours.length - 1] + 1)
      )
      onDatesSelected(selectedHours.length, startDateWithHour, endDateWithHour)
    }
  }, [startDate, selectedHours, onDatesSelected])
  ;<Select
    isMulti
    className="mt-2"
    placeholder="Select hours"
    isSearchable={false}
    options={Array.from({ length: 24 }, (_, i) => {
      const startHour = i
      const endHour = (i + 1) % 24
      const label = `${
        startHour === 0
          ? '12am'
          : startHour < 12
            ? startHour + 'am'
            : startHour - 12 + 'pm'
      }-${
        endHour === 0
          ? '12am'
          : endHour < 12
            ? endHour + 'am'
            : endHour - 12 + 'pm'
      }`
      return {
        value: i,
        label: label,
      }
    })}
    value={selectedHours.map((hour) => ({
      value: hour,
      label: getTimeSlotLabel(hour),
    }))}
    onChange={(selectedOptions) => {
      let selectedHourValues = selectedOptions.map((option) => option.value)
      let newlySelectedHours = selectedHourValues.filter(
        (x) => !selectedHours.includes(x)
      )
      let removedHours = selectedHours.filter(
        (x) => !selectedHourValues.includes(x)
      )
      newlySelectedHours.forEach((hour) => onHourSelected(true, hour))
      removedHours.forEach((hour) => onHourSelected(false, hour))
    }}
  />

  function getTimeSlotLabel(hour: number): string {
    const startHour = hour
    const endHour = (hour + 1) % 24
    const label = `${
      startHour === 0
        ? '12 am'
        : startHour < 12
          ? startHour + ' am'
          : startHour - 12 + ' pm'
    } - ${
      endHour === 0
        ? '12 am'
        : endHour < 12
          ? endHour + ' am'
          : endHour - 12 + ' pm'
    }`
    return label
  }

  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold">
            {startDate?.toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
            }) || 'Add dates'}
            {endDate
              ? ' - ' +
                endDate?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                })
              : ''}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {'Check in - Check out'}
          </span>
        </div>
      </>
    )
  }

  return (
    <>
      <Popover
        className={`StayDatesRangeInput z-10 relative flex ${className}`}
      >
        {({ open }) => (
          <>
            <Popover.Button
              className={`flex-1 flex relative p-3 items-center space-x-3 focus:outline-none ${
                open ? 'shadow-lg' : ''
              }`}
            >
              {renderInput()}
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-auto xl:-right-10 right-0 z-10 mt-3 top-full w-screen max-w-sm px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
                  <DatePicker
                    selected={startDate}
                    onChange={onChangeDate}
                    startDate={startDate}
                    endDate={duration === 'HOURLY' ? startDate : endDate}
                    selectsRange
                    monthsShown={2}
                    minDate={new Date()}
                    showPopperArrow={false}
                    inline
                    renderCustomHeader={(p) => (
                      <DatePickerCustomHeaderTwoMonth {...p} />
                    )}
                    renderDayContents={(day, date) => (
                      <DatePickerCustomDay dayOfMonth={day} date={date} />
                    )}
                  />
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      {duration === 'HOURLY' && (
        <Select
          isMulti
          className="mt-2"
          placeholder="Select hours"
          isSearchable={false}
          options={Array.from({ length: 24 }, (_, i) => {
            const startHour = i
            const endHour = (i + 1) % 24
            const label = `${
              startHour === 0
                ? '12 am'
                : startHour < 12
                  ? startHour + ' am'
                  : startHour - 12 + ' pm'
            }  ${
              endHour === 0
                ? '12 am'
                : endHour < 12
                  ? endHour + ' am'
                  : endHour - 12 + ' pm'
            }`
            return {
              value: i,
              label: label,
            }
          })}
          value={selectedHours.map((hour) => ({
            value: hour,
            label: getTimeSlotLabel(hour),
          }))}
          onChange={(selectedOptions) => {
            let selectedHourValues = selectedOptions.map(
              (option) => option.value
            )
            let newlySelectedHours = selectedHourValues.filter(
              (x) => !selectedHours.includes(x)
            )
            let removedHours = selectedHours.filter(
              (x) => !selectedHourValues.includes(x)
            )
            newlySelectedHours.forEach((hour) => onHourSelected(true, hour))
            removedHours.forEach((hour) => onHourSelected(false, hour))
          }}
        />
      )}
    </>
  )
}

export default StayDatesRangeInput
