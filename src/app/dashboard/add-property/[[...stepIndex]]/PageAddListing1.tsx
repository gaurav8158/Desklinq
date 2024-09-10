import React, { FC, ChangeEvent, useEffect, useState } from 'react'
import Input from '@/shared/Input'
import FormItem from '../FormItem'
import Textarea from '@/shared/Textarea'
import OpeningHoursDropdown from '../../components/Dropdowns/OpeningHoursDropdown'

export interface PageAddListing1Props {
  inputs: { [key: string]: any }
  setInputs: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>
  propertyId: null | string
}

const PageAddListing1: FC<PageAddListing1Props> = ({
  inputs,
  setInputs,
  propertyId,
}) => {
  const listingDataString = localStorage.getItem(
    `desklink_listingData_${propertyId}`
  )
  const listingData = listingDataString ? JSON.parse(listingDataString) : {}

  // Availability
  const [dayInput, setDayInput] = useState<
    {
      day:
        | 'Monday'
        | 'Tuesday'
        | 'Wednesday'
        | 'Thursday'
        | 'Friday'
        | 'Saturday'
        | 'Sunday'
      openTime: string
      closeTime: string
    }[]
  >(listingData?.openingHours || [])
  const [options, setOptions] = useState<any>([
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }

  useEffect(() => {
    setInputs((values) => ({ ...values, openingHours: dayInput }))

    // Remove selected options
    setOptions(() => {
      const daysToRemove = dayInput.map((item) => item.day)
      return options.filter((item: any) => !daysToRemove.includes(item))
    })
  }, [dayInput])

  useEffect(() => {
    handleInputChange({
      target: { name: 'name', value: listingData?.name },
    } as ChangeEvent<HTMLInputElement>)
    handleInputChange({
      target: { name: 'description', value: listingData?.description },
    } as ChangeEvent<HTMLTextAreaElement>)
  }, [])

  // availability
  const addAdditionalPrice = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setDayInput(
      (values) =>
        [
          ...values,
          {
            day: options[0],
            openTime: null,
            closeTime: null,
          },
        ] as any
    )

    // console.log(dayInput)
  }

  const removePricing = (i: number) => {
    setDayInput((values) => {
      let data = [...values]
      data.splice(i, 1)
      return [...data]
    })
  }

  const onPricingChange = (
    data: {
      selectedOption:
        | 'Monday'
        | 'Tuesday'
        | 'Wednesday'
        | 'Thursday'
        | 'Friday'
        | 'Saturday'
        | 'Sunday'
      openTime: string
      closeTime: string
    },
    index: number
  ) => {
    const { selectedOption, openTime, closeTime } = data
    const newData = [...dayInput]
    newData[index].day = selectedOption
    newData[index].openTime = openTime
    newData[index].closeTime = closeTime
    setDayInput(newData)
  }

  return (
    <>
      <h2 className="text-2xl font-semibold">
        Your property name and description
      </h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <FormItem
          label="Property name *"
          desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
        >
          <Input
            defaultValue={listingData?.name}
            required
            placeholder="Property name"
            name="name"
            onChange={handleInputChange}
          />
        </FormItem>

        {/* ITEM */}
        <FormItem
          label="Property description"
          desc="Compose a compelling description – a snapshot of your space's personality. Be vivid, be concise, and make every word count, inviting guests into an experience they won't want to miss."
        >
          <Textarea
            defaultValue={listingData?.description}
            required
            placeholder="..."
            rows={10}
            name="description"
            onChange={handleInputChange}
          />
        </FormItem>
      </div>

      {/* availability */}
      <h2 className="text-2xl font-semibold mt-10">
        Availability (Working hours)
      </h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      {dayInput &&
        dayInput.map((item, i: number) => {
          return (
            <div key={i} className="flex flex-col justify-between gap-3 mb-2">
              <OpeningHoursDropdown
                priceObject={item}
                removeItem={() => removePricing(i)}
                onChange={(data) => onPricingChange(data, i)}
                // options={options}
                avaibleOptions={options}
              />
            </div>
          )
        })}
      {options.length > 0 && (
        <button
          onClick={(e) => addAdditionalPrice(e)}
          className="text-white justify-center flex items-center bg-green-700 hover:bg-green-800 w-auto focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 mx-auto mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <i className="las la-plus-circle text-xl mr-2.5"></i> Add
        </button>
      )}
    </>
  )
}

export default PageAddListing1
