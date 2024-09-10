import React, { useEffect, useState } from 'react'

interface ChildComponentProps {
  onChange: (startTime: string, endTime: string) => void
  startTime?: string
  endTime?: string
}

const TimeInput: React.FC<ChildComponentProps> = ({
  onChange,
  startTime = '00:00',
  endTime = '23:59',
}) => {
  const [hourStartTime, setHourStartTime] = useState<string>(startTime)
  const [hourEndTime, setHourEndTime] = useState<string>(endTime)

  useEffect(() => {
    onChange(hourStartTime, hourEndTime)
  }, [hourStartTime, hourEndTime, onChange])

  return (
    <>
      <div className="my-2 flex gap-4 md:gap-0 text-center justify-center md:justify-around">
        <div className="md:flex md:items-center">
          <label className="px-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
            From
          </label>
          <input
            type="time"
            value={hourStartTime}
            onChange={(event) => setHourStartTime(event.target.value)}
            className="my-1 block w-full py-2 px-3 border border-0 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="md:flex md:items-center">
          <label className="px-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
            To
          </label>
          <input
            type="time"
            value={hourEndTime}
            min={hourStartTime}
            onChange={(event) => setHourEndTime(event.target.value)}
            className="my-1 block w-full py-2 px-3 border border-0 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </>
  )
}

export default TimeInput
