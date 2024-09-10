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
import PageAddListing6 from './PageAddListing6'
import withAuthRedirect from '@/app/(HOC)/withAuthRedirect'
import { useAppSelector } from '@/redux/app/hooks'

interface PageAddListingProps {
  inputs: any // Replace 'any' with the actual type of 'inputs'
  setInputs: React.Dispatch<React.SetStateAction<any>> // Replace 'any' with the actual type of 'inputs'
}

const Page = ({
  params,
  searchParams,
}: {
  params: { stepIndex: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) => {
  const [inputs, setInputs] = useState({})
  const userData = useAppSelector((state) => state.userData)
  let ContentComponent: React.ComponentType<PageAddListingProps> =
    PageAddListing1

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
    case 6:
      ContentComponent = PageAddListing6
      break

    default:
      ContentComponent = PageAddListing1
      break
  }

  const index = Number(params.stepIndex) || 1
  const nextHref = (index < 6 ? `/add-listing/${index + 1}` : `/`) as Route
  const backtHref = (
    index > 1 ? `/add-listing/${index - 1}` : `/add-listing/${1}`
  ) as Route
  const nextBtnText = index > 5 ? 'Publish listing' : 'Continue'

  const handleSubmit = async () => {
    const itemFromLocalStorage = localStorage.getItem('desklink_listingData')
    const data = itemFromLocalStorage ? JSON.parse(itemFromLocalStorage) : {}

    switch (index) {
      case 1:
        localStorage.setItem('desklink_listingData', JSON.stringify(inputs))
        break

      case 2:
        data.address = inputs
        break

      case 3:
        data.amenities = inputs
        break

      case 4:
        data.description = inputs
        break

      case 5:
        data.images = inputs
        console.log(data)
        break

      case 6:
        data.vendor = '64959972b7c4592946f38112'

        const myToken = userData.token.access?.token

        try {
          const res = await fetch(
            'https://api-dev.desklinq.com/v1/properties/',
            {
              method: 'POST',
              headers: {
                // "Access-Control-Allow-Origin": "http://127.0.0.1:8080/v1/properties/",
                'Content-Type': 'application/json',
                authorization: `Bearer ${myToken}`,
              },
              body: JSON.stringify(data),
            }
          )

          if (!res.ok) {
            throw new Error('Request failed with status ' + res.status)
          }

          const responseData = await res.json()
          console.log(responseData)
        } catch (error) {
          console.error(error)
        }
        break

      default:
        break
    }
  }

  return (
    <div>
      <div className="listingSection__wrap mb-8">
        <ContentComponent inputs={inputs} setInputs={setInputs} />
      </div>

      <div className="flex justify-end space-x-5">
        <ButtonSecondary href={backtHref}>Go back</ButtonSecondary>
        <ButtonPrimary href={nextHref} onClick={handleSubmit}>
          {nextBtnText || 'Continue'}
        </ButtonPrimary>
      </div>
    </div>
  )
}

export default withAuthRedirect(Page)
