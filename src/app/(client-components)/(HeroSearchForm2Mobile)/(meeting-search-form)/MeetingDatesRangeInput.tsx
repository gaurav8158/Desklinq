'use client'

import DatePicker from 'react-datepicker'
import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks'
import { updatePrimaryFilter } from '@/redux/filters/filterSlice'
import TimeInput from '@/components/TimeInput'
import { toUTCTimeString } from '@/function/time'

export interface MeetingDatesRangeInputProps {
  className?: string
}

const MeetingDatesRangeInput: FC<MeetingDatesRangeInputProps> = ({
  className = '',
}) => {
  const dispatch = useAppDispatch()
  const dateTime = useAppSelector(
    (state: any) => state.filter.primaryFilter.dateTime
  )
  const initialFromDate = dateTime?.fromDate
    ? new Date(dateTime.fromDate)
    : null
  const initialToDate = dateTime?.toDate ? new Date(dateTime.toDate) : null
  const [startDate, setStartDate] = useState<Date | null>(initialFromDate)
  const [endDate, setEndDate] = useState<Date | null>(initialToDate)
  const [startTime, setStartTime] = useState<any>(dateTime?.fromTime)
  const [endTime, setEndTime] = useState<any>(dateTime?.toTime)

  useEffect(() => {
    dispatch(
      updatePrimaryFilter({
        dateTime: {
          fromDate: startDate?.toISOString() || '',
          fromTime: toUTCTimeString(startTime),
          toDate: endDate?.toISOString() || '',
          toTime: toUTCTimeString(endTime),
        },
      })
    )
  }, [startDate, endDate, startTime, endTime, dispatch])

  const onChangeDate = useCallback(
    (dates: [Date | null, Date | null]) => {
      const [start, end] = dates
      setStartDate(start)
      setEndDate(end)
    },
    [dispatch]
  )

  return (
    <div>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">{` When's your trip?`}</span>
      </div>
      <div
        className={`relative flex-shrink-0 flex justify-center z-10 py-5 ${className} `}
      >
        <div className="">
          <TimeInput
            onChange={(startTime, endTime) => {
              setEndTime(endTime)
              setStartTime(startTime)
            }}
          />
          <DatePicker
            selected={startDate}
            onChange={onChangeDate}
            startDate={startDate}
            endDate={endDate}
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
      </div>
    </div>
  )
}

export default MeetingDatesRangeInput
