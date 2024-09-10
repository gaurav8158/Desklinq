import { OfferingData } from '@/data/lisiting-details'
import React from 'react'

interface Props {
  offerings: OfferingData
}

const DescriptionSection: React.FC<Props> = ({ offerings }) => {
  return (
    <div className="listingSection__wrap">
      <h2 className="text-2xl font-semibold">Description</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="text-neutral-6000 dark:text-neutral-300">
        <span>{offerings?.description}</span>
      </div>
    </div>
  )
}

export default DescriptionSection
