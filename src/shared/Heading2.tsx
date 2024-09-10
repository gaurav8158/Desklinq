import { dateRender2 } from '@/function/fuction'
import React from 'react'
import { ReactNode } from 'react'

export interface Heading2Props {
  heading?: ReactNode
  subHeading?: ReactNode
  className?: string
  numOfListing?: number
  capacity?: number
  fromDate?: string
  toDate?: string
}

const Heading2: React.FC<Heading2Props> = ({
  className = '',
  heading = 'Stays in Bengaluru',
  subHeading,
  numOfListing = 0,
  capacity = 0,
  fromDate = new Date().toISOString(),
  toDate = new Date().toISOString(),
}) => {
  return (
    <div className={`mb-12 lg:mb-16 ${className}`}>
      <h2 className="text-4xl font-semibold">{heading}</h2>
      {subHeading ? (
        subHeading
      ) : (
        <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
          {numOfListing} listing
          <span className="mx-2">·</span>
          {dateRender2(fromDate, toDate)}
          <span className="mx-2">·</span>
          {capacity} Guests
        </span>
      )}
    </div>
  )
}

export default Heading2
