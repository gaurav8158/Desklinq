import { StarIcon } from '@heroicons/react/24/solid'
import React, { FC } from 'react'

export interface StartRatingProps {
  className?: string

  rating?: number
}

const StartRating: FC<StartRatingProps> = ({
  className = '',

  rating = 0,
}) => {
  let wholeStarCount = Math.floor(rating)

  let stars = []

  if (wholeStarCount) {
    for (let i = 0; i < wholeStarCount; i++) {
      stars.push(
        <StarIcon key={i} className="w-[18px] h-[18px] text-orange-500" />
      )
    }
    for (let i = 0; i < 5 - wholeStarCount; i++) {
      stars.push(
        <StarIcon key={i} className="w-[18px] h-[18px] text-gray-400" />
      )
    }
  } else
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon key={i} className="w-[18px] h-[18px] text-gray-400" />
      )
    }
  return (
    <div
      className={`nc-StartRating flex items-center space-x-1 text-sm  ${className}`}
      data-nc-id="StartRating"
    >
      <span className="font-medium ">{rating}</span> {/* use the rating prop */}
      <div className="pb-[2px] flex">{stars}</div>
    </div>
  )
}

export default StartRating
