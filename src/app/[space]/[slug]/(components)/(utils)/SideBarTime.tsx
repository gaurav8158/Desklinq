import { FC, Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/solid'

interface Props {
  startDate?: Date | null
  startTime?: string | null
  onChange?: (value: string) => void
  disabledTimes?: string[] // Add disabledTimes prop
  duration?: Number
  openingHours?: {
    id?: string
    day: string
    openTime: string
    closeTime: string
  }[]
}
export const SideBarTime: FC<Props> = ({
  startDate,
  startTime,
  onChange,
  disabledTimes,
  duration,
  openingHours,
}) => {
  const getCurrentTime = () => {
    const now = new Date()
    const roundedMinutes = Math.round(now.getMinutes() / 30) * 30
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      roundedMinutes
    )
  }

  const day = startDate?.toLocaleDateString('en-US', { weekday: 'long' })
  let start = 0
  let end = 24
  if (openingHours) {
    openingHours.forEach((hour) => {
      if (hour.day === day) {
        start = parseInt(hour.openTime.split(' ')[0])
        if (hour.openTime.includes('PM') && start !== 12) {
          start += 12
        }
        end = parseInt(hour.closeTime.split(' ')[0])
        if (hour.closeTime.includes('PM') && end !== 12) {
          end += 12
        }
      }
    })
  }
  // console.table([openingHours, start, end])
  // console.log(start, end);

  const getTimeOptions = (disabledTimes: string[], duration: number) => {
    const options = []
    const now = new Date()
    const isToday = startDate
      ? startDate.toDateString() === now.toDateString()
      : false

    // Get the selected start date or use today's date if no start date is provided
    const selectedDate = startDate || now

    // Adjust start hour for startTime if provided
    let startHour = start
    if (isToday && startTime) {
      const [startTimeHour] = startTime.split(':').map(Number)
      startHour = Math.max(start, startTimeHour) // Ensure startHour is within 9 AM to 6 PM
    }

    // Generate time options within allowed range
    for (let hour = startHour; hour < end; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        // Calculate end time based on duration
        const endHour = hour + duration
        const endMinute = minute

        const startTime = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          hour,
          minute
        )
        const endTime = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          endHour,
          endMinute
        )

        // Format time for comparison with disabledTimes
        const formattedStartTime = startTime.toLocaleTimeString('en-US', {
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
        })
        const formattedEndTime = endTime.toLocaleTimeString('en-US', {
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
        })

        // Check if any time within the range is disabled
        const convertTo24HourFormat = (timeString: string) => {
          // Split the time string into hours, minutes, and period (AM/PM)
          const [time, period] = timeString.split(' ')
          const [hoursStr, minutesStr] = time.split(':')
          let hours = parseInt(hoursStr)
          const minutes = parseInt(minutesStr)

          // Adjust hours for PM times
          if (period.toLowerCase() === 'pm' && hours !== 12) {
            hours += 12
          }

          // Convert hours to string and pad with leading zero if necessary
          const hours24hr = hours.toString().padStart(2, '0')

          // Return the time in 24-hour format
          return `${hours24hr}:${minutesStr}`
        }
        const formattedTimeS24 = convertTo24HourFormat(formattedStartTime)
        const formattedTimeE24 = convertTo24HourFormat(formattedEndTime)

        const isDisabled = disabledTimes.some((time) => {
          const timeTrimmed = time.trim()
          const timeT24 = convertTo24HourFormat(timeTrimmed)
          // console.table([
          //   timeTrimmed,
          //   formattedEndTime,
          //   timeTrimmed >= formattedStartTime &&
          //     timeTrimmed <= formattedEndTime,
          // ])
          return timeT24 >= formattedTimeS24 && timeT24 <= formattedTimeE24
        })

        // Disable time options if startDate is today and time is in the past
        if (isToday && startTime <= now) {
          options.push({
            value: startTime,
            label: `${formattedStartTime} - ${formattedEndTime}`,
            disabled: true,
          })
        } else {
          options.push({
            value: startTime,
            label: `${formattedStartTime} - ${formattedEndTime}`,
            disabled: isDisabled,
          })
        }
      }
    }

    return options
  }

  const [selectedTime, setSelectedTime] = useState(getCurrentTime())

  useEffect(() => {
    onChange &&
      onChange(
        selectedTime
          .toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
          })
          .slice(0, 6)
      )
  }, [selectedTime, onChange])

  return (
    <Listbox value={selectedTime} onChange={setSelectedTime}>
      <div className="relative">
        <Listbox.Button className="w-full max-w-[15rem] py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-neutral-100 dark:bg-neutral-900 dark:border-neutral-700">
          {selectedTime.toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:text-neutral-200 dark:bg-neutral-900">
            {getTimeOptions(disabledTimes || [], duration?.valueOf() || 1).map(
              (option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-white dark:bg-neutral-900' : 'text-gray-500'
                    }  ${
                      option.disabled
                        ? 'cursor-not-allowed opacity-50'
                        : 'cursor-pointer'
                    }`
                  }
                  value={option.value}
                  disabled={option.disabled}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          active ? 'font-extrabold ' : 'font-normal'
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              )
            )}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

export default SideBarTime
