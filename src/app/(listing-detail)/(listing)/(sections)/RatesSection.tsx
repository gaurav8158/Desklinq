import { Pricing } from '@/data/lisiting-details'
import { formatCurrency } from '@/function/fuction'
import React, { FC } from 'react'

interface Props {
  pricing: Pricing[]
}

const RatesSection: FC<Props> = ({ pricing }) => {
  return (
    <div className="listingSection__wrap">
      {/* HEADING */}
      <div>
        <h2 className="text-2xl font-semibold">Rates</h2>
      </div>

      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* CONTENT */}
      <div className="flow-root">
        <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 mb-4">
          {pricing &&
            pricing.map((price, index) => (
              <div
                key={index}
                className={`p-4 ${
                  index % 2 === 0 ? 'bg-neutral-100' : 'bg-white'
                } dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg my-2`}
              >
                <span>{price.duration}</span>
                <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-100">
                  {formatCurrency(price.price, price.currency || 'USD')}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default RatesSection
