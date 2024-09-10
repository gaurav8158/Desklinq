import React, { FC, ChangeEvent, useEffect, useState } from 'react'
import Input from '@/shared/Input'
import FormItem from '../../add-property/FormItem'
import Textarea from '@/shared/Textarea'

export interface PageAddListing1Props {
  inputs: { [key: string]: any }
  setInputs: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>
  // propertyId: null | string
}

const PageAddListing1: FC<PageAddListing1Props> = ({
  inputs,
  setInputs,
  // propertyId,
}) => {
  const listingDataString =
    localStorage.getItem(`desklink_listingCouponData_`) || null
  const listingData = listingDataString ? JSON.parse(listingDataString) : {}
  const [couponCode, setCouponCode] = useState('')
  const [desc, setDesc] = useState('')
  const [validFrom, setValidFrom] = useState<Date | null>(new Date())
  const [validUpto, setValidUpto] = useState<Date | null>(new Date())

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const name = e.target.name
    let value = e.target.value

    if (name === 'validFrom' || name === 'validUpto') {
      const date = new Date(value)
      if (date instanceof Date && !isNaN(date.valueOf())) {
        if (name === 'validFrom') {
          setValidFrom(date)
          setInputs((values) => ({ ...values, [name]: date.toISOString() }))
        } else if (name === 'validUpto') {
          setValidUpto(date)
          setInputs((values) => ({ ...values, [name]: date.toISOString() }))
        }
      }
    } else {
      setInputs((values) => ({ ...values, [name]: value }))
    }
  }

  useEffect(() => {
    handleInputChange({
      target: { name: 'couponCode', value: listingData?.couponCode },
    } as ChangeEvent<HTMLInputElement>)
    handleInputChange({
      target: { name: 'desc', value: listingData?.desc },
    } as ChangeEvent<HTMLTextAreaElement>)
    handleInputChange({
      target: { name: 'validFrom', value: listingData?.validFrom },
    } as ChangeEvent<HTMLInputElement>)
    handleInputChange({
      target: { name: 'validUpto', value: listingData?.validUpto },
    } as ChangeEvent<HTMLInputElement>)
  }, [])
  useEffect(() => {
    if (validFrom instanceof Date && !isNaN(validFrom.valueOf())) {
      setInputs((values) => ({ ...values, validFrom: validFrom.toISOString() }))
    }
    if (validUpto instanceof Date && !isNaN(validUpto.valueOf())) {
      setInputs((values) => ({ ...values, validUpto: validUpto.toISOString() }))
    }
  }, [])

  // const handleInputChange = (
  //   e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ): void => {
  //   const { name, value } = e.target
  //   switch (name) {
  //     case 'couponCode':
  //       setCouponCode(value)
  //       break
  //     case 'desc':
  //       setDesc(value)
  //       break
  //     case 'validFrom':
  //       setValidFrom(new Date(value + 'T23:59:59.000+00:00'))
  //       break
  //     case 'validUpto':
  //       setValidUpto(new Date(value + 'T23:59:59.000+00:00'))
  //       break
  //     default:
  //       break
  //   }
  // }

  // useEffect(() => {
  //   if (validFrom && validUpto) {
  //     setInputs((values) => ({
  //       ...values,
  //       couponCode,
  //       desc,
  //       validFrom,
  //       validUpto,
  //     }))
  //   }
  // }, [couponCode, desc, validFrom, validUpto, setInputs])

  return (
    <>
      <h2 className="text-2xl font-semibold">
        Your Coupon Code and description
      </h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      {/* FORM */}
      <div className="space-y-8">
        {/* ITEM */}
        <FormItem label="Coupon *">
          <Input
            defaultValue={listingData?.couponCode}
            required
            placeholder="Coupon Code"
            name="couponCode"
            onChange={handleInputChange}
          />
        </FormItem>

        {/* ITEM */}
        <FormItem label="Coupon description">
          <Textarea
            defaultValue={listingData?.desc}
            required
            placeholder="..."
            rows={10}
            name="desc"
            onChange={handleInputChange}
          />
        </FormItem>

        <FormItem label={`Valid From*:`}>
          <input
            type="date"
            id="validFrom"
            name="validFrom"
            value={
              validFrom instanceof Date && !isNaN(validFrom.valueOf())
                ? validFrom.toISOString().substring(0, 10)
                : ''
            }
            onChange={handleInputChange}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </FormItem>

        <FormItem label={`Valid Upto*:`}>
          <input
            type="date"
            id="validUpto"
            name="validUpto"
            value={
              validUpto instanceof Date && !isNaN(validUpto.valueOf())
                ? validUpto.toISOString().substring(0, 10)
                : ''
            }
            onChange={handleInputChange}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </FormItem>
      </div>
    </>
  )
}

export default PageAddListing1
