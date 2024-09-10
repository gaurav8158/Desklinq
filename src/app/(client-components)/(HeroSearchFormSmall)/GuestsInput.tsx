'use client'

import React, { useEffect, useState } from 'react'
import { FC } from 'react'
import ButtonSubmit from './ButtonSubmit'
import useOutsideAlerter from '@/hooks/useOutsideAlerter'
import { PathName } from '@/routers/types'
import NcInputNumber from '@/components/NcInputNumber'
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks'
import { updatePrimaryFilter } from '@/redux/filters/filterSlice'

export interface GuestsInputProps {
  className?: string
  fieldClassName?: string
  autoFocus?: boolean
  submitLink: PathName
}

const GuestsInput: FC<GuestsInputProps> = ({
  fieldClassName = '[ nc-hero-field-padding--small ]',
  className = '',
  autoFocus = false,
  submitLink,
}) => {
  const primaryFilter = useAppSelector(
    (state: any) => state.filter.primaryFilter
  )
  const dispatch = useAppDispatch()
  const refContainer = React.createRef<HTMLDivElement>()
  const [guest, setGuest] = useState(primaryFilter.minCapacity)
  const [isOpen, setIsOpen] = useState(false)
  useOutsideAlerter(refContainer, () => setIsOpen(false))

  //
  useEffect(() => {
    setIsOpen(autoFocus)
  }, [autoFocus])

  const handleChangeData = (value: number) => {
    setGuest(value)
    dispatch(updatePrimaryFilter({ minCapacity: value }))
  }
  const totalGuests = guest

  return (
    <div className={`flex z-10 relative ${className}`} ref={refContainer}>
      <div
        className={`flex z-10 relative flex-1 text-left justify-between items-center focus:outline-none cursor-pointer ${
          isOpen ? 'nc-hero-field-focused--2' : ''
        }`}
      >
        <div
          className={`${fieldClassName} flex-1`}
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          <div className="lg:flex-1 text-left">
            <span className="block font-semibold">
              {totalGuests || ''} Co-workers
            </span>
            <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
              {totalGuests ? 'Co-workers' : 'Add co-workers'}
            </span>
          </div>
        </div>
        {/* <div className="pr-2">
          <ButtonSubmit href={submitLink} />
        </div> */}
      </div>

      {isOpen && (
        <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-10 bg-white dark:bg-neutral-800"></div>
      )}

      {isOpen && (
        <div className="absolute right-0 z-30 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
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
      )}
    </div>
  )
}

export default GuestsInput
