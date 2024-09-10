import React, { FC } from 'react'
import { Offering } from '../offering.type'

interface Props {
  offerings: Offering
}
const OtherSection: FC<Props> = ({ offerings }) => {
  const { additionalInfo } = offerings

  if (!additionalInfo) return null

  return (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">
        {additionalInfo.title || 'Things to Know'}
      </h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div>
        <h4 className="text-lg font-semibold">
          {additionalInfo?.rules?.title || 'Rules'}
        </h4>
        <ul className="list-disc list-inside mt-3 text-neutral-500 dark:text-neutral-400">
          {additionalInfo?.rules?.data.map((rule, index) => (
            <li key={index} className="mb-2">
              {rule}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div>
        <h4 className="text-lg font-semibold">
          {additionalInfo?.cancellationPolicy?.title || 'Cancellation Policy'}
        </h4>
        <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
          {additionalInfo?.cancellationPolicy?.data.map((policy, index) => (
            <p key={index} className="mb-2">
              {policy}
            </p>
          ))}
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
      <div>
        <h4 className="text-lg font-semibold">
          {additionalInfo?.specialNote?.title || 'Special Note'}
        </h4>
        <div className="prose sm:prose">
          <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
            {additionalInfo?.specialNote?.data.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default OtherSection
