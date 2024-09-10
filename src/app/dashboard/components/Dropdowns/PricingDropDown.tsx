import { durationsOffer } from '@/type/BookingsTypes'
import { Transition } from '@headlessui/react'
import React, { Fragment, use, useEffect, useState } from 'react'

interface PricingDropDownProps {
  options?: string[]
  offering: string
  priceObject: {
    context: 'DURATION'
    duration: durationsOffer
    area: string
    currency: string
    price: number
    info: string
  }
  removeItem: () => void
  onChange: (data: {
    selectedOption: durationsOffer
    inputValue: number
  }) => void
  avaibleOptions?: string[]
}

const PricingDropDown: React.FC<PricingDropDownProps> = ({
  offering,
  options = ['HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'],
  priceObject,
  removeItem,
  onChange,
  avaibleOptions = ['HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'],
}) => {
  console.log(offering)
  const [selectedOption, setSelectedOption] = useState<durationsOffer>(
    priceObject.duration
  )
  const [inputValue, setInputValue] = useState<number>(priceObject.price)

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value as durationsOffer)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value)
    setInputValue(isNaN(value) ? 0 : value)
  }

  const removePricingItem = () => {
    return () => {
      removeItem && removeItem()
    }
  }
  useEffect(() => {
    setSelectedOption(priceObject.duration)
    setInputValue(priceObject.price)
  }, [priceObject])

  useEffect(() => {
    onChange && onChange({ selectedOption, inputValue })
  }, [selectedOption, inputValue])

  return (
    <div className="border border-0 rounded-xl p-3">
      <div className="flex items-center justify-between mb-2">
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="relative w-full rounded-lg focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white h-10 cursor-pointer dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900"
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-neutral-900 py-1 text-base shadow-lg sm:text-sm z-30"
              disabled={!avaibleOptions.includes(option)}
            >
              {option}
            </option>
          ))}
        </select>
        <button onClick={removePricingItem()} className="px-2" type="button">
          <i className="las la-trash text-2xl text-red-600 hover:text-red-800"></i>
        </button>
      </div>

      <div className="relative py-2">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500">₹</span>
        </div>
        <input
          value={inputValue}
          onChange={handleInputChange}
          type="number"
          name="price"
          className="!pl-8 !pr-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          // placeholder="0.00"
          required
        />
      </div>
    </div>
  )
}

export default PricingDropDown
