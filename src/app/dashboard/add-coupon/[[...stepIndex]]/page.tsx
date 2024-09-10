'use client'

import React, { FC, useState } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'

import PageAddListing1 from './PageAddListing1'
import PageAddListing2 from './PageAddListing2'
import PageAddListing3 from './PageAddListing3'
import PageAddListing4 from './PageAddListing4'
import PageAddListing5 from './PageAddListing5'
import { useAppSelector } from '@/redux/app/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { Route } from '@/routers/types'

function Page({
  params,
  searchParams,
}: {
  params: { stepIndex: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const { push } = useRouter()

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
      // case 5:
      //   ContentComponent = PageAddListing5
      break
    default:
      ContentComponent = PageAddListing1
      break
  }

  // Routes
  const index = Number(params.stepIndex) || 1
  const nextHref = (
    index < 4 ? `/dashboard/add-coupon/${index + 1}` : `/dashboard/my-coupons`
  ) as Route
  const backtHref = (
    index > 1
      ? `/dashboard/add-coupon/${index - 1}`
      : `/dashboard/add-coupon/${1}`
  ) as Route
  const nextBtnText = index >= 4 ? 'Publish Coupon' : 'Continue'

  const handleSubmit = async () => {
    const key = `desklink_listingCouponData_`
    const listingDataString = localStorage.getItem(key)
    const listingData = listingDataString ? JSON.parse(listingDataString) : {}
    // console.table([key, listingData])

    switch (index) {
      case 1:
        if (localStorage[key]) {
          const data_0 = listingData
          data_0.couponCode = inputs.couponCode //
          data_0.desc = inputs.desc
          data_0.validFrom = inputs.validFrom //
          data_0.validUpto = inputs.validUpto //
          if (
            data_0.couponCode.trim() == '' ||
            data_0.validFrom.trim() == '' ||
            data_0.validUpto.trim() == ''
          ) {
            toast.error('Please fill all the Mandatory fields')
            return
          }
          localStorage.setItem(key, JSON.stringify(data_0))
        } else {
          localStorage.setItem(key, JSON.stringify(inputs))
        }
        console.log(listingData)
        break

      case 2:
        if (
          inputs.couponType === 'PERCENTAGE' &&
          (inputs.couponValue < 0 || inputs.couponValue > 100)
        ) {
          toast.error(
            'Coupon value should be between 0 and 100 when coupon type is percentage'
          )
        }
        // if(inputs.couponValue.trim() ===''){
        //   toast.error('Please fill the coupon value')
        //   return;
        // }
        if (
          inputs.couponValue.trim() == '' ||
          inputs.cappedValue.trim() == '' ||
          inputs.minimumTransactionValue.trim() == ''
        ) {
          toast.error('Please fill all the Mandatory fields with *')
        }
        const data_1 = listingData
        data_1.couponType = inputs.couponType
        data_1.couponValue = inputs.couponValue //
        data_1.couponCurrency = inputs.couponCurrency
        data_1.maxLimitPerAccount = inputs.maximumLimitPerAccount
        data_1.maxLimitOfCoupon = inputs.maximumLimitOfCoupon
        data_1.cappedValue = inputs.cappedValue //
        data_1.minimumTransactionValue = inputs.minimumTransactionValue //
        data_1.minimumBookingsBeforeUse = inputs.minimumBookingBefore
        data_1.categoryOnWhichCouponValid = inputs.couponCategory
        if (
          data_1.couponValue == null ||
          data_1.cappedValue == null ||
          data_1.minimumTransactionValue == null
        ) {
          toast.error('Please fill all the Mandatory fields')
          return
        }
        localStorage.setItem(key, JSON.stringify(data_1))
        // console.log(listingData)
        console.log(data_1)
        break

      case 3:
        const data_2 = listingData
        data_2.firstTimeCustomer = inputs.firstTimeCustomer
        data_2.permittedUsers = inputs.permittedUsers
        // if(data_2.specificUser.length==0){
        //   toast.error("add specific user")
        //   return;
        // }
        localStorage.setItem(key, JSON.stringify(data_2))
        // console.log(listingData)
        break

      case 4:
        const data_4 = listingData
        data_4.offerings = inputs.offerings
        data_4.createdBy = userData.user.id
        localStorage.setItem(key, JSON.stringify(data_4))
        const myToken = userData.token.access?.token

        try {
          const res = await fetch('https://api-dev.desklinq.com/v1/coupon/', {
            method: 'POST',
            headers: {
              'Access-Control-Allow-Origin':
                'https://api-dev.desklinq.com/v1/coupon/',
              'Content-Type': 'application/json',
              authorization: `Bearer ${myToken}`,
            },
            body: JSON.stringify(data_4),
          })

          const data = await res.json()
          console.log(data)

          if (data.success) {
            ;(() => toast.success('Coupon added successfully !'))()
            push('/dashboard/my-coupons')
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
  // console.log(inputs)

  const validateFields = (index: number): boolean => {
    switch (index) {
      case 1:
        return inputs && inputs.couponCode && inputs.couponCode.trim() !== ''
      case 2:
        return (
          inputs &&
          inputs.couponValue &&
          (inputs.couponType === 'PERCENTAGE' &&
          (inputs.couponValue < 0 || inputs.couponValue > 100)
            ? false
            : true) &&
          inputs.cappedValue && // Add this line
          inputs.minimumTransactionValue
        )
      case 3:
        return inputs
      case 4:
        return (
          Array.isArray(inputs) &&
          inputs.filter((image: string) => image !== '').length >= 4
        )
      default:
        return true // Return true by default if no validation is needed for the index
    }
  }

  return (
    <div>
      <div className="listingSection__wrap mb-8">
        <ContentComponent
          inputs={inputs}
          setInputs={setInputs}
          // propertyId={null}
        />
      </div>

      <div className="flex justify-end space-x-5">
        <ButtonSecondary href={backtHref}>Go back</ButtonSecondary>
        {index < 4 ? (
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
