'use client'
import React, { useEffect, useState } from 'react'
import NcInputNumber from '@/components/NcInputNumber'
import { FC } from 'react'

export interface GuestsInputProps {
  defaultValue?: number
  onChange?: (data: number) => void
  className?: string
}

const GuestsInput: FC<GuestsInputProps> = ({
  defaultValue,
  onChange,
  className = '',
}) => {
  const [guest, setGuest] = useState(defaultValue || 0)

  useEffect(() => {
    setGuest(defaultValue || 0)
  }, [defaultValue])

  const handleChangeData = (value: number) => {
    setGuest(value)
    onChange && onChange(value)
  }

  return (
    <div className={`flex flex-col relative p-5 ${className}`}>
      <span className="mb-5 block font-semibold text-xl sm:text-2xl">
        {`Co-workers`}
      </span>
      <NcInputNumber
        className="w-full"
        defaultValue={guest}
        onChange={(value) => handleChangeData(value)}
        max={100}
        min={1}
        label="Number of Co-workers"
        // desc="Ages 13 or above"
      />
    </div>
  )
}

export default GuestsInput
