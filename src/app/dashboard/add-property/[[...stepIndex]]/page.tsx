'use client'

import React, { FC, useState } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { Route } from '@/routers/types'

import PageAddListing1 from './PageAddListing1'
import PageAddListing2 from './PageAddListing2'
import PageAddListing3 from './PageAddListing3'
import PageAddListing4 from './PageAddListing4'
import PageAddListing5 from './PageAddListing5'
import { useAppSelector } from '@/redux/app/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'

const Page = ({
  params,
  searchParams,
}: {
  params: { stepIndex: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const { push } = useRouter()
  const queryParams = useSearchParams()
  const propertyId = queryParams.get('id')

  const userData = useAppSelector((state) => state.userData)
  const [inputs, setInputs] = useState<object | any>(null)

  let ContentComponent = PageAddListing1

  // Pages
  switch (Number(params.stepIndex)) {
    case 1:
      ContentComponent = PageAddListing1
      break
    case 2:
      ContentComponent = PageAddListing2
      break
    case 3:
      ContentComponent = PageAddListing3
      break
    case 4:
      ContentComponent = PageAddListing4
      break
    case 5:
      ContentComponent = PageAddListing5
      break

    default:
      ContentComponent = PageAddListing1
      break
  }

  // Routes
  const index = Number(params.stepIndex) || 1
  const nextHref = (
    index < 5
      ? `/dashboard/add-property/${index + 1}${
          propertyId ? `?id=${propertyId}` : ''
        }`
      : `/dashboard/my-properties`
  ) as Route
  const backtHref = (
    index > 1
      ? `/dashboard/add-property/${index - 1}?id=${propertyId}`
      : `/dashboard/add-property/${1}?id=${propertyId}`
  ) as Route
  const nextBtnText = index >= 5 ? 'Publish property' : 'Continue'

  // Submit
  const handleSubmit = async () => {
    const key = `desklink_listingData_${propertyId}`
    const listingDataString = localStorage.getItem(key)
    const listingData = listingDataString ? JSON.parse(listingDataString) : {}
    // console.table([key, listingData])

    switch (index) {
      case 1:
        // Check if the property name is empty
        if (!inputs.name || inputs.name.trim() === '') {
          const propertyNameInput = document.querySelector("input[name='name']")
          if (propertyNameInput) {
            propertyNameInput.classList.add('border-red-500')
            toast.error('Property name is required')
            return
          }
        }
        if (localStorage[key]) {
          const data_0 = listingData
          data_0.name = inputs.name
          data_0.description = inputs.description
          data_0.openingHours = inputs.openingHours
          localStorage.setItem(key, JSON.stringify(data_0))
        } else {
          localStorage.setItem(key, JSON.stringify(inputs))
        }
        console.log(listingData)
        break

      case 2:
        // setInputs(values => ({
        //   ...values,
        //   "location": {
        //     "type": "Point",
        //     "coordinates": coords
        //   }
        // }));
        // Check if the property address description is empty
        if (!inputs.address || inputs.address.description.trim() === '') {
          const propertyAddressInput = document.querySelector('#desc')
          console.log(propertyAddressInput)
          if (propertyAddressInput) {
            propertyAddressInput.classList.add('border-red-500')
            toast.error('Property address is required')
            return
          }
        }

        const data_1 = listingData
        data_1.address = inputs.address
        localStorage.setItem(key, JSON.stringify(data_1))
        console.log(listingData)
        break

      case 3:
        if (inputs.length == 0) {
          toast.error('Please select at least one amenity')
          return
        }
        const data_2 = listingData
        data_2.amenities = inputs
        localStorage.setItem(key, JSON.stringify(data_2))
        console.log(listingData)
        break

      case 4:
        if (inputs.filter((image: string) => image !== '').length < 4) {
          toast.error('Please add at least 4 images')
          return
        }
        const data_4 = listingData
        // const arrayOfStrings = inputs?.map((obj: any) => obj.uri)
        data_4.images = inputs?.images || inputs
        localStorage.setItem(key, JSON.stringify(data_4))
        console.log(listingData)
        break

      case 5:
        const bodyData = listingData
        bodyData.vendor = userData.user.id
        const myToken = userData.token.access?.token

        try {
          const res = await fetch(
            'https://api-dev.desklinq.com/v1/properties/',
            {
              method: 'POST',
              headers: {
                'Access-Control-Allow-Origin':
                  'https://api-dev.desklinq.com/v1/properties/',
                'Content-Type': 'application/json',
                authorization: `Bearer ${myToken}`,
              },
              body: JSON.stringify(bodyData),
            }
          )

          const data = await res.json()
          console.log(data)

          if (data.success) {
            ;(() => toast.success('Property added successfully !'))()
            push('/dashboard/my-properties')
            localStorage.clear()
          }
        } catch (error) {
          console.error(error)
        }
        break

      default:
        break
    }
  }
  const validateFields = (index: number): boolean => {
    switch (index) {
      case 1:
        return inputs && inputs.name && inputs.name.trim() !== ''
      case 2:
        return (
          inputs &&
          inputs.address.description &&
          inputs.address.description.trim() !== ''
        )
      case 3:
        return inputs && inputs.length > 0
      // Add cases for other indices as needed
      case 4:
        return (
          Array.isArray(inputs) &&
          inputs.filter((image: string) => image !== '').length >= 4
        )
      default:
        return true // Return true by default if no validation is needed for the index
    }
  }
  // console.log(inputs)
  // console.log(inputs?.length)
  // console.log(inputs?.length < 4)

  return (
    <div>
      <div className="listingSection__wrap mb-8">
        <ContentComponent
          inputs={inputs}
          setInputs={setInputs}
          propertyId={propertyId}
        />
      </div>

      <div className="flex justify-end space-x-5">
        <ButtonSecondary href={backtHref}>Go back</ButtonSecondary>
        {index < 5 ? (
          <ButtonPrimary
            onClick={handleSubmit}
            href={validateFields(index) ? nextHref : undefined}
          >
            {nextBtnText || 'Continue'}
          </ButtonPrimary>
        ) : (
          <ButtonPrimary onClick={handleSubmit}>
            {nextBtnText || 'Continue'}
          </ButtonPrimary>
        )}
      </div>
    </div>
  )
}

export default Page
