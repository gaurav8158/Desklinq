'use client'

import DatePicker from 'react-datepicker'
import React, { FC, Fragment, useCallback, useEffect, useState } from 'react'
import DatePickerCustomHeaderTwoMonth from '@/components/DatePickerCustomHeaderTwoMonth'
import DatePickerCustomDay from '@/components/DatePickerCustomDay'
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks'
import { updatePrimaryFilter } from '@/redux/filters/filterSlice'

export interface DatesRangeInputProps {
  className?: string
}

const DatesRangeInput: FC<DatesRangeInputProps> = ({ className = '' }) => {
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

  useEffect(() => {
    dispatch(
      updatePrimaryFilter({
        dateTime: {
          fromDate: startDate?.toISOString() || '',
          fromTime: `00:00`,
          toDate: endDate?.toISOString() || '',
          toTime: `23:59`,
        },
      })
    )
  }, [startDate, endDate, dispatch])

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
        <span className="block font-semibold text-xl sm:text-2xl">{` Choose booking dates`}</span>
      </div>
      <div
        className={`relative flex-shrink-0 flex justify-center z-10 py-5 ${className} `}
      >
        <DatePicker
          selected={startDate}
          onChange={onChangeDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          monthsShown={2}
          showPopperArrow={false}
          inline
          renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
          renderDayContents={(day, date) => (
            <DatePickerCustomDay dayOfMonth={day} date={date} />
          )}
        />
      </div>
    </div>
  )
}

export default DatesRangeInput
