'use client'
import { formatCurrency } from '@/function/fuction'
import React, { FC } from 'react'
import { Pricing } from '../offering.type'
import { ArrowRight } from 'phosphor-react'

interface Props {
  pricing: Pricing[]
}

const PricingSection: FC<Props> = ({ pricing }) => {
  return (
    <div className="listingSection__wrap">
      {/* <div>
        <h2 className="text-2xl font-semibold">Pricing Plans</h2>
      </div>

      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="flow-root">
        <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 mb-4">
          {pricing.map((price, index) => (
            <div
              key={index}
              className={`p-4 ${
                index % 2 === 0 ? 'bg-neutral-100' : 'bg-white'
              } dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg my-2`}
            >
              <span>{price.duration}</span>
              <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-100">
                {formatCurrency(price.price, price.currency || 'INR')}
              </span>
            </div>
          ))}
        </div>
      </div> */}

      <section className="my-6 mt-8">
        <h2 className="text-xl mb-2 font-semibold">Pricing Options</h2>
        <p>
          Our flexible pricing option allows you to book spaces on a
          <span className="text-indigo-600 font-medium cursor-pointer">
            {' '}
            monthly{' '}
          </span>
          or
          <span className="text-indigo-600 font-medium cursor-pointer">
            {' '}
            yearly{' '}
          </span>
          basis.
        </p>

        {/* Pricing Cards */}
        <div className="border text-sm border-gray-200 rounded-lg shadow-sm mt-6 p-6">
          <div className="space-y-8">
            {/* Hot Desks */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className=" font-semibold">Hot Desks</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">starts @ ₹499</span>
                <a
                  href="#"
                  className="text-indigo-600 font-bold underline text-sm  flex items-center space-x-1"
                >
                  <span>Book now</span>
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>

            {/* Meetings Room */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className=" font-semibold">
                  Meetings Room{' '}
                  <span className="text-sm text-gray-500">(8 Seater)</span>
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">starts @ ₹2999</span>
                <a
                  href="#"
                  className="text-indigo-600 font-bold underline text-sm  flex items-center space-x-1"
                >
                  <span>Book now</span>
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>

            {/* Virtual Office */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className=" font-semibold">Virtual Office</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">starts @ ₹299</span>
                <a
                  href="#"
                  className="text-indigo-600 font-bold underline text-sm  flex items-center space-x-1"
                >
                  <span>Book now</span>
                  <ArrowRight size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PricingSection
