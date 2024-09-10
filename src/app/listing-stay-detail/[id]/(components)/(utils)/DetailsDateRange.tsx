import React, { Fragment, useState, FC, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { CalendarIcon } from '@heroicons/react/24/outline'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'
import DatePicker from 'react-datepicker'
import { useAppSelector } from '@/redux/app/hooks'

interface Props {
  selected?: 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
  onChange?: (value: { startDate: Date | null; endDate: Date | null }) => void
  duration?: number
  dateArray: any
  openingHours?: {
    id?: string
    day: string
    openTime: string
    closeTime: string
  }[]
}
const DetailsDateRange: FC<Props> = ({
  selected,
  onChange,
  duration = 1,
  dateArray,
  openingHours,
}) => {
  const dateTime = useAppSelector(
    (state: any) => state.filter.primaryFilter.dateTime
  )
  const initialFromDate = dateTime?.fromDate
    ? new Date(dateTime.fromDate)
    : null
  const initialToDate = dateTime?.toDate ? new Date(dateTime.toDate) : null
  const [startDate, setStartDate] = useState<Date | null>(initialFromDate)
  const [endDate, setEndDate] = useState<Date | null>(initialToDate)

  // console.log(openingHours)
  // console.log(dateArray);
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const openingHoursArray = daysOfWeek.map((day, index) => {
    const openingHour = openingHours?.find((hour) => hour.day === day)
    return openingHour ? -1 : index
  })
  // console.log(openingHours)

  useEffect(() => {
    if (selected === 'YEARLY') {
      const end = new Date(
        (startDate ? startDate : new Date()).getTime() +
          365 * 24 * 60 * 60 * 1000 * duration
      )
      setEndDate(end)
    } else if (selected === 'MONTHLY') {
      const end = new Date(
        (startDate ? startDate : new Date()).getTime() +
          29 * 24 * 60 * 60 * 1000 * duration
      )
      setEndDate(end)
    } else if (selected === 'WEEKLY') {
      const end = new Date(
        (startDate ? startDate : new Date()).getTime() +
          6 * 24 * 60 * 60 * 1000 * duration
      )
      setEndDate(end)
    } else if (selected === 'DAILY') {
      let end
      if (duration === 1 || !duration) {
        end = startDate ? new Date(startDate) : new Date()
      } else {
        end = new Date(
          (startDate ? startDate : new Date()).getTime() +
            (duration - 1) * 24 * 60 * 60 * 1000
        )
      }
      setEndDate(end)
    }
  }, [startDate, selected, duration])

  useEffect(() => {
    onChange && onChange({ startDate, endDate })
  }, [startDate, endDate, onChange])

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  const singledate = (date: Date | null) => {
    setStartDate(date)
    setEndDate(date)
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
            {!(selected === 'HOURLY') && endDate
              ? ' - ' +
                endDate?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                })
              : ''}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {selected === 'HOURLY' ? 'Single Date' : 'Check in - Check out'}
          </span>
        </div>
      </>
    )
  }
  // Function to check if a date is in excludeDates
  const isDateExcluded = (date: any, excludeDates: Date[]) => {
    return excludeDates.some(
      (excludedDate) =>
        excludedDate.getDate() === date.getDate() &&
        excludedDate.getMonth() === date.getMonth() &&
        excludedDate.getFullYear() === date.getFullYear()
    )
  }

  // Find the first date that is not in excludeDates
  const firstNonExcludedDate = new Date()
  while (isDateExcluded(firstNonExcludedDate, dateArray)) {
    firstNonExcludedDate.setDate(firstNonExcludedDate.getDate() + 1)
  }

  return (
    <Popover className={`StayDatesRangeInput z-10 relative flex`}>
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
            <Popover.Panel className="absolute left-auto xl:-right-10 right-0 z-20 mt-3 top-full w-screen max-w-sm px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
                {selected === 'HOURLY' ? (
                  <div>
                    <DatePicker
                      selected={startDate}
                      onChange={singledate}
                      startDate={startDate}
                      monthsShown={2}
                      minDate={new Date()}
                      showPopperArrow={false}
                      inline
                      filterDate={(date) =>
                        !openingHoursArray.includes(date.getDay())
                      }
                      renderCustomHeader={(p) => (
                        <DatePickerCustomHeaderTwoMonth {...p} />
                      )}
                      renderDayContents={(day, date) => (
                        <DatePickerCustomDay dayOfMonth={day} date={date} />
                      )}
                    />
                  </div>
                ) : (
                  <DatePicker
                    selected={
                      isDateExcluded(startDate, dateArray)
                        ? firstNonExcludedDate
                        : startDate
                    }
                    onChange={onChangeDate}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    monthsShown={2}
                    showPopperArrow={false}
                    minDate={new Date()}
                    inline
                    excludeDates={[...dateArray]}
                    // filterDate={(date) => !openingHoursArray.includes(date.getDay())}
                    renderCustomHeader={(p) => (
                      <DatePickerCustomHeaderTwoMonth {...p} />
                    )}
                    renderDayContents={(day, date) => (
                      <DatePickerCustomDay dayOfMonth={day} date={date} />
                    )}
                  />
                )}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default DetailsDateRange
