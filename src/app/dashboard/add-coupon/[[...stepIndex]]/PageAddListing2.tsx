import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import Input from '@/shared/Input'
import Select from '@/shared/Select'
import FormItem from '@/app/add-listing/FormItem'

interface PageAddListing2Props {
  inputs: { [key: string]: any }
  setInputs: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>
}

const PageAddListing2: FC<PageAddListing2Props> = ({ inputs, setInputs }) => {
  const [couponType, setCouponType] = useState('FLAT')
  const [couponValue, setCouponValue] = useState('')
  const [couponCurrency, setCouponCurrency] = useState('INR')
  const [maximumLimitPerAccount, setMaximumLimitPerAccount] = useState('')
  const [maximumLimitOfCoupon, setMaximumLimitOfCoupon] = useState('')
  const [cappedValue, setCappedValue] = useState('')
  const [minimumTransactionValue, setMinimumTransactionValue] = useState('')
  const [minimumBookingBefore, setMinimumBookingBefore] = useState('')
  const [couponCategory, setCouponCategory] = useState<string[]>([])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    switch (name) {
      case 'couponType':
        setCouponType(value)
        break
      case 'couponValue':
        setCouponValue(value)
        break
      case 'couponCurrency':
        setCouponCurrency(value)
        break
      case 'maximumLimitPerAccount':
        setMaximumLimitPerAccount(value)
        break
      case 'maximumLimitOfCoupon':
        setMaximumLimitOfCoupon(value)
        break
      case 'cappedValue':
        setCappedValue(value)
        break
      case 'minimumTransactionValue':
        setMinimumTransactionValue(value)
        break
      case 'minimumBookingBefore':
        setMinimumBookingBefore(value)
        break
      case 'couponCategory':
        if (
          e.target instanceof HTMLInputElement &&
          e.target.type === 'checkbox'
        ) {
          if (e.target.checked) {
            setCouponCategory((prev) => [...prev, value])
          } else {
            setCouponCategory((prev) =>
              prev.filter((category) => category !== value)
            )
          }
        }
        break
      default:
        break
    }
  }

  useEffect(() => {
    setInputs((values) => ({
      ...values,
      couponType,
      couponValue,
      couponCurrency,
      maximumLimitPerAccount,
      maximumLimitOfCoupon,
      cappedValue,
      minimumTransactionValue,
      minimumBookingBefore: minimumBookingBefore,
      couponCategory: [...couponCategory],
    }))
  }, [
    couponType,
    couponValue,
    couponCurrency,
    maximumLimitPerAccount,
    maximumLimitOfCoupon,
    cappedValue,
    minimumTransactionValue,
    minimumBookingBefore,
    couponCategory,
    setInputs,
  ])
  console.log(couponCategory)

  return (
    <>
      <h2 className="text-2xl font-semibold">Your Coupon Type and details</h2>
      <div className="mt-8">
        <FormItem label={`Coupon Type:`}>
          <Select
            id="couponType"
            name="couponType"
            value={couponType}
            onChange={handleInputChange}
          >
            <option value="FLAT">Flat</option>
            <option value="PERCENTAGE">Percentage</option>
          </Select>
        </FormItem>
      </div>
      <div>
        <FormItem label={`Coupon Value*:`}>
          <Input
            id="couponValue"
            name="couponValue"
            type="number"
            value={couponValue}
            onChange={handleInputChange}
          />
        </FormItem>
      </div>
      <div>
        <FormItem label={`Coupon Currency:`}>
          <Select
            id="couponCurrency"
            name="couponCurrency"
            value={couponCurrency}
            onChange={handleInputChange}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </Select>
        </FormItem>
      </div>
      {/* Add other input fields similarly */}
      {/* <button type="submit">Submit</button> */}
      <div>
        <FormItem label={`Maximum Limit Per Account:`}>
          <Input
            id="maximumLimitPerAccount"
            name="maximumLimitPerAccount"
            type="number"
            value={maximumLimitPerAccount}
            onChange={handleInputChange}
          />
        </FormItem>
      </div>
      <div>
        <FormItem label={`Maximum Limit Of Coupon:`}>
          <Input
            id="maximumLimitOfCoupon"
            name="maximumLimitOfCoupon"
            type="number"
            value={maximumLimitOfCoupon}
            onChange={handleInputChange}
          />
        </FormItem>
      </div>
      <div>
        <FormItem label={`Capped Value*:`}>
          <Input
            id="cappedValue"
            name="cappedValue"
            type="number"
            value={cappedValue}
            onChange={handleInputChange}
          />
        </FormItem>
      </div>
      <div>
        <FormItem label={`Minimum Transaction Value*:`}>
          <Input
            id="minimumTransactionValue"
            name="minimumTransactionValue"
            type="number"
            value={minimumTransactionValue}
            onChange={handleInputChange}
          />
        </FormItem>
      </div>
      <div>
        <FormItem label={`Minimum Booking Before:`}>
          <Input
            id="minimumBookingBefore"
            name="minimumBookingBefore"
            type="number"
            value={minimumBookingBefore}
            onChange={handleInputChange}
          />
        </FormItem>
      </div>

      <div>
        <FormItem label={`Coupon Category:`}>
          <div className="flex flex-row justify-evenly">
            <label>
              <input
                type="checkbox"
                name="couponCategory"
                value="HOT_DESK"
                checked={couponCategory.includes('HOT_DESK')}
                onChange={handleInputChange}
                className="mx-2"
              />
              Hot Desk
            </label>
            <label>
              <input
                type="checkbox"
                name="couponCategory"
                value="MEETING_ROOMS"
                checked={couponCategory.includes('MEETING_ROOMS')}
                onChange={handleInputChange}
                className="mx-2"
              />
              Meeting Room
            </label>
            <label>
              <input
                type="checkbox"
                name="couponCategory"
                value="VIRTUAL_OFFICE"
                checked={couponCategory.includes('VIRTUAL_OFFICE')}
                onChange={handleInputChange}
                className="mx-2"
              />
              Virtual Office
            </label>
            <label>
              <input
                type="checkbox"
                name="couponCategory"
                value="CABINS"
                checked={couponCategory.includes('CABINS')}
                onChange={handleInputChange}
                className="mx-2"
              />
              Cabin
            </label>
          </div>
        </FormItem>
      </div>
    </>
  )
}

export default PageAddListing2
