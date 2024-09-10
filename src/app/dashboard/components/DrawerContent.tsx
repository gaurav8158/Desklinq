'use client'

import React, { useState, useEffect, ChangeEvent } from 'react'
import { toast } from 'react-toastify'
import ButtonClose from '@/shared/ButtonClose'
import NcInputNumber from '@/components/NcInputNumber'
import Checkbox from '@/shared/Checkbox'
import { amenitiesData } from '@/config/config'
import SelectInput from './SelectInput'
import { useAppSelector } from '@/redux/app/hooks'
import PricingDropDown from './Dropdowns/PricingDropDown'
import { durationsOffer } from '@/type/BookingsTypes'
import ImageInput from '@/components/ImageInput'
import { useTour } from '@reactour/tour'
import { offeringDrawerSteps } from '@/config/tourGuide/tourGuideSteps'
import userService from '@/service/user.service'

export interface DrawerContentProps {
  title?: string
  onClickClose?: () => void
  propertyName?: string | null
  propertyId: string | null
  vendorId: string | null
  propertyAddress?: Object
  setOfferings?: Function
  offeringId?: string | null
}

// Define a type for the keys of the Amenities object
// type AmenityKeys = keyof typeof Amenities;

type amenitiesType = {
  id: string
  Name: string
  Image: string
  info: string
  category: string
}

type InputState = {
  status: string
  vendor: string | null
  property: string | null
  type: string | null
  name: string
  description: string
  capacity: number
  capacityUnit: string
  amenities: string[]
  pricing: {
    context: 'DURATION'
    duration: 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
    area: string
    currency: string
    price: number
    info: string
  }[]
  images: string[]
  address: any
  additionalInfo: {
    rules: {
      title: string
      data: string[]
    }
    cancellationPolicy: {
      title: string
      data: string[]
    }
    specialNote: {
      title: string
      data: string[]
    }
  }
}

const durationOffer: durationsOffer[] = [
  'HOURLY',
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'YEARLY',
]

const DrawerContent: React.FC<DrawerContentProps> = ({
  title,
  onClickClose,
  propertyName,
  propertyId,
  vendorId,
  propertyAddress,
  setOfferings,
  offeringId,
}) => {
  const userData = useAppSelector((state) => state.userData)

  const [totalImages, setTotalImages] = useState<number[]>([])
  const [imageFields, setImageFields] = useState<string[]>([])
  const { setSteps, setCurrentStep } = useTour()

  useEffect(() => {
    setCurrentStep(0)
    setSteps && setSteps(offeringDrawerSteps)
  }, [setCurrentStep, setSteps])

  const [additionalInfo, setAdditionalInfo] = useState({
    rules: {
      title: 'Rules',
      data: [''],
    },
    cancellationPolicy: {
      title: 'Cancellation Policy',
      data: [''],
    },
    specialNote: {
      title: 'Special Note',
      data: [''],
    },
  })
  const [priceInput, setPriceInput] = useState<
    {
      context: 'DURATION'
      duration: 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
      area: string
      currency: string
      price: number
      info: string
    }[]
  >([])

  const [input, setInput] = useState<InputState>({
    status: 'DISABLED',
    vendor: vendorId,
    property: propertyId,
    type: null,
    name: '',
    description: '',
    capacity: 0,
    capacityUnit: 'People',
    amenities: [''],
    pricing: [],
    images: imageFields,
    address: propertyAddress,
    additionalInfo: additionalInfo,
  })

  // Getting offering data by ID
  const getOfferingById = async () => {
    try {
      const offerings = await userService.get(
        `offerings/${offeringId}`,
        { cacheBuster: Math.random() },
        {},
        false
      )
      if (offerings.success) {
        setInput(offerings.data)
        setInput((values) => ({
          ...values,
          property: (input?.property as any)?.id,
          amenities: offerings.data.amenities.map((item: any) => item.id),
        }))
        setImageFields(offerings.data.images)
        setAdditionalInfo(offerings.data.additionalInfo)
        setPriceInput(offerings.data.pricing)
      } else {
        ;(() => toast.error('Error while fetching offering'))()
      }
    } catch (err) {
      console.error('Error fetching offering:', err)
    }
  }

  useEffect(() => {
    offeringId && getOfferingById()
  }, [offeringId])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const name = e.target.name
    const value = e.target.value
    setInput((values) => ({ ...values, [name]: value }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    let data: any = [...imageFields]
    data[i] = e.target.value
    setImageFields(data)
    setInput((values) => ({ ...values, images: data }))
  }

  const addFields = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setImageFields([...imageFields, ''])
    // setTotalImages([...totalImages, 1])
  }

  const removeFields = (i: number) => {
    let data = [...imageFields]
    data.splice(i, 1)
    setImageFields(data)

    // let newTot = [...totalImages]
    // newTot.splice(i, 1)
    // setTotalImages(newTot)

    setInput((values) => ({ ...values, images: data }))
  }

  const handleAdditionalInfoChange = (
    e: ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const name = e.target.name as keyof typeof additionalInfo
    const value = e.target.value
    const newData = [...additionalInfo[name].data]
    newData[i] = value

    const updatedAdditionalInfo = {
      ...additionalInfo,
      [name]: {
        ...additionalInfo[name],
        data: newData,
      },
    }
    setAdditionalInfo(updatedAdditionalInfo)
    setInput((values) => ({ ...values, additionalInfo: additionalInfo }))
  }

  const addAdditionalInfo = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    propertyName: keyof typeof additionalInfo
  ) => {
    e.preventDefault()
    setAdditionalInfo(
      (values) =>
        ({
          ...values,
          [propertyName]: {
            ...values[propertyName],
            data: [...values[propertyName].data, ''],
          },
        }) as any
    )
  }

  const removeAdditionalInfo = (
    i: number,
    propertyName: keyof typeof additionalInfo
  ) => {
    let data = [...(additionalInfo[propertyName].data as any)]
    data.splice(i, 1)
    setAdditionalInfo(
      (values) =>
        ({
          ...values,
          [propertyName]: { ...values[propertyName], data: data },
        }) as any
    )
    setInput((values) => ({ ...values, additionalInfo: additionalInfo }))
  }

  // publish offering
  const handlePublishOffering = async (e: any) => {
    e.preventDefault()
    setInput((values) => ({ ...values, additionalInfo: additionalInfo }))

    const req = {
      ...input,
      // pricing: price,
      amenities: input.amenities.filter((item: any) => item !== ''),
    }

    const myToken = userData?.token?.access?.token
    try {
      const data = await userService.post(
        '/offerings',
        req,
        { cacheBuster: Math.random() },
        { authorization: `Bearer ${myToken}` }
      )

      if (data.success) {
        ;(() => toast.success('Offering created successfully !'))()
        setOfferings && setOfferings((values: any) => [...values, input])
        onClickClose && onClickClose()
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Handle edit offering
  const handleEditOffering = async (e: any) => {
    e.preventDefault()
    const myToken = userData?.token?.access?.token
    try {
      const data = await userService.put(
        `/offerings/`,
        offeringId,
        input,
        { cacheBuster: Math.random() },
        { authorization: `Bearer ${myToken}` }
      )

      if (data.success) {
        ;(() => toast.success('Offering Edited successfully !'))()
        setOfferings && setOfferings((values: any) => [...values, input])
        onClickClose && onClickClose()
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const [options, setOptions] = useState<durationsOffer[]>([
    'HOURLY',
    'DAILY',
    'WEEKLY',
    'MONTHLY',
    'YEARLY',
  ])
  const [isButtonClicked, setIsButtonClicked] = useState(false)

  const addAdditionalPrice = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (input.type === 'MEETING_ROOMS' && isButtonClicked) {
      return
    }
    setIsButtonClicked(true)
    setPriceInput(
      (values) =>
        [
          ...values,
          {
            context: 'DURATION',
            area: 'SQ_FT',
            currency: 'INR',
            duration: options[0],
            info: '',
            price: 0,
          },
        ] as any
    )
  }

  const removePricing = (i: number) => {
    setPriceInput((values) => {
      let data = [...values]
      data.splice(i, 1)
      return [...data]
    })
  }

  const onPricingChange = (
    data: {
      selectedOption: 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
      inputValue: number
    },
    index: number
  ) => {
    const { selectedOption, inputValue } = data
    const newData = [...priceInput]
    newData[index].duration = selectedOption
    newData[index].price = inputValue
    setPriceInput(newData)
  }

  useEffect(() => {
    setInput((values) => ({ ...values, pricing: priceInput }))
    setOptions((prevOptions) => {
      const durationsToRemove = priceInput.map((item) => item.duration)
      return durationOffer.filter((item) => !durationsToRemove.includes(item))
    })
  }, [priceInput])

  const handleSubmit = (e: any) => {
    e.preventDefault()

    // Check if image fields are filled
    const areImageFieldsFilled = imageFields.every((image) => image !== '')

    // Check if at least 4 images are added
    const minimumImagesAdded =
      imageFields.filter((image) => image !== '').length >= 4

    if (!areImageFieldsFilled || !minimumImagesAdded) {
      // Display error message

      toast.error('Please add at least 4 images for your offering.')
      return // Prevent form submission
    }

    // Proceed with form submission
    if (title === 'edit') {
      handleEditOffering(e)
    } else {
      handlePublishOffering(e)
    }
  }

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        {/* <Logo /> */}
        <h5
          id="drawer-label"
          className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          <svg
            className="w-3.5 h-3.5 mr-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm14-7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm-5-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4Z" />
          </svg>
          {title === 'edit' ? 'Edit Offering' : 'Create New Offering'}
        </h5>
        <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
          <form action="#" className="mb-6" onSubmit={handleSubmit}>
            {/* type */}
            <div className="mb-6" data-tour-offering="step-1">
              <SelectInput
                label="Choose an offering type"
                setInput={setInput}
                defaultValue={input.type}
              />
            </div>
            {/* name */}
            <div className="mb-6" data-tour-offering="step-2">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Offering name*
              </label>
              <input
                defaultValue={input.name}
                type="text"
                id="image"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Meeting Keynote"
                name="name"
                onChange={handleInputChange}
                required
              />
            </div>
            {/* description */}
            <div className="mb-6" data-tour-offering="step-3">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Offering Description*
              </label>
              <textarea
                defaultValue={input?.description}
                id="description"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write property description..."
                name="description"
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            {/* capacity */}
            <div className="relative mb-6" data-tour-offering="step-4">
              <NcInputNumber
                label="Capacity of offering"
                defaultValue={input.capacity ? input.capacity : 4}
                setInput={setInput}
              />
            </div>

            {/*pricing */}
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              data-tour-offering="step-5"
            >
              Pricing
            </label>
            {priceInput &&
              priceInput.map((item, i: number) => {
                return (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-3 mb-2"
                  >
                    <PricingDropDown
                      offering={input.type ?? ''}
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
                disabled={input.type === 'MEETING_ROOMS' && isButtonClicked}
                className="text-white justify-center flex items-center bg-green-700 hover:bg-green-800 w-auto focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 mx-auto mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <i className="las la-plus-circle text-xl mr-2.5"></i> Add
              </button>
            )}

            {/* amenities */}
            <div className="mb-6 mt-6" data-tour-offering="step-6">
              <div className="space-y-4">
                {Object.keys(amenitiesData)
                  .filter((value: string, key: number) => value === 'SPACE')
                  .map((value: string, key: number) => {
                    return (
                      <div key={key}>
                        <label
                          className="text-base font-semibold text-gray-900 dark:text-white"
                          htmlFor=""
                        >
                          {value} Amenities
                        </label>
                        <div className="mt-3 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                          {amenitiesData[
                            value as keyof typeof amenitiesData
                          ].map((item: amenitiesType) => {
                            console.log(input.amenities.includes(item.id))
                            return (
                              <Checkbox
                                key={item.id}
                                name={item.Name}
                                label={item.Name}
                                context="OFFERING"
                                defaultChecked={
                                  !!input.amenities.includes(item.id)
                                }
                                onChange={(checked) =>
                                  checked
                                    ? setInput((input) => ({
                                        ...input,
                                        amenities: [
                                          ...input.amenities,
                                          item.id,
                                        ],
                                      }))
                                    : setInput((input) => ({
                                        ...input,
                                        amenities: input.amenities.filter(
                                          (amenity) => amenity !== item.id
                                        ),
                                      }))
                                }
                              />
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>

            {/* images */}
            <div className="mb-6" data-tour-offering="step-7">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Images
              </label>

              {imageFields.map((input: string, i: number) => {
                // Use a unique identifier for the key
                const uniqueKey = `<span class="math-inline">${i}-</span>${
                  Math.random() + Math.random()
                }`
                return (
                  <div
                    key={uniqueKey}
                    className="flex justify-between gap-3 mb-2"
                  >
                    <ImageInput
                      i={i}
                      imageFields={imageFields}
                      setImageFields={setImageFields}
                      setInput={setInput}
                    />
                    <button onClick={() => removeFields(i)}>
                      <i className="las la-trash text-2xl text-red-600 hover:text-red-800"></i>
                    </button>
                  </div>
                )
              })}
              {imageFields.length < 4 && ( // Ensure minimum 4 images are added
                <p className="text-red-500">Please add at least 4 images.</p>
              )}
              <button
                onClick={addFields}
                className={`text-white justify-center flex items-center bg-green-700 hover:bg-green-800 w-auto focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 mx-auto mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
                  imageFields[imageFields.length - 1] === ''
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                disabled={imageFields[imageFields.length - 1] === ''}
              >
                <i className="las la-plus-circle text-xl mr-2.5"></i> Add
              </button>
            </div>

            {/* rules */}
            <div className="mb-6" data-tour-offering="step-8">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Rules*
              </label>
              {additionalInfo &&
                additionalInfo?.rules.data.map((input: string, i: number) => {
                  return (
                    <div key={i} className="flex justify-between gap-3 mb-2">
                      <input
                        value={input}
                        required
                        type="text"
                        id="image"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={`Rule ${i + 1}`}
                        name="rules"
                        onChange={(e) => handleAdditionalInfoChange(e, i)}
                      />
                      <button onClick={() => removeAdditionalInfo(i, 'rules')}>
                        <i className="las la-trash text-2xl text-red-600 hover:text-red-800"></i>
                      </button>
                    </div>
                  )
                })}
              <button
                onClick={(e) => addAdditionalInfo(e, 'rules')}
                className="text-white justify-center flex items-center bg-green-700 hover:bg-green-800 w-auto focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 mx-auto mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <i className="las la-plus-circle text-xl mr-2.5"></i> Add
              </button>
            </div>
            {/* cancellationPolicy */}
            <div className="mb-6" data-tour-offering="step-9">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Cancellation Policy*
              </label>
              {additionalInfo &&
                additionalInfo?.cancellationPolicy?.data?.map(
                  (input: string, i: number) => {
                    return (
                      <div key={i} className="flex justify-between gap-3 mb-2">
                        <input
                          value={input}
                          required
                          type="text"
                          id="image"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={`Cancellation Policy ${i + 1}`}
                          name="cancellationPolicy"
                          onChange={(e) => handleAdditionalInfoChange(e, i)}
                        />
                        <button
                          onClick={() =>
                            removeAdditionalInfo(i, 'cancellationPolicy')
                          }
                        >
                          <i className="las la-trash text-2xl text-red-600 hover:text-red-800"></i>
                        </button>
                      </div>
                    )
                  }
                )}
              <button
                onClick={(e) => addAdditionalInfo(e, 'cancellationPolicy')}
                className="text-white justify-center flex items-center bg-green-700 hover:bg-green-800 w-auto focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 mx-auto mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <i className="las la-plus-circle text-xl mr-2.5"></i> Add
              </button>
            </div>
            {/* specialNote */}
            <div className="mb-6" data-tour-offering="step-10">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Special Note*
              </label>
              {additionalInfo &&
                additionalInfo?.specialNote?.data?.map(
                  (input: string, i: number) => {
                    return (
                      <div key={i} className="flex justify-between gap-3 mb-2">
                        <input
                          value={input}
                          required
                          type="text"
                          id="image"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder={`Special Note ${i + 1}`}
                          name="specialNote"
                          onChange={(e) => handleAdditionalInfoChange(e, i)}
                        />
                        <button
                          onClick={() => removeAdditionalInfo(i, 'specialNote')}
                        >
                          <i className="las la-trash text-2xl text-red-600 hover:text-red-800"></i>
                        </button>
                      </div>
                    )
                  }
                )}
              <button
                onClick={(e) => addAdditionalInfo(e, 'specialNote')}
                className="text-white justify-center flex items-center bg-green-700 hover:bg-green-800 w-auto focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 mx-auto mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <i className="las la-plus-circle text-xl mr-2.5"></i> Add
              </button>
            </div>
            {/* submit */}
            <button
              type="submit"
              className="text-white justify-center flex items-center bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              data-tour-offering="step-11"
            >
              <svg
                className="w-3.5 h-3.5 mr-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z" />
                <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z" />
              </svg>{' '}
              Save Offering
            </button>
          </form>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
    </div>
  )
}

export default DrawerContent
