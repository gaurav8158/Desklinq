'use client'

import Label from '@/components/Label'
import Input from '@/shared/Input'
import Textarea from '@/shared/Textarea'
import React, { Fragment, useState } from 'react'
import { toast } from 'react-toastify'
import userService from '@/service/user.service'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { Tab } from '@headlessui/react'
import Image from 'next/image'

export interface PageContactProps {}

const PageBook = () => {
  const [loading, setLoading] = useState(false)
  const [inputs, setInputs] = useState<{
    content: string | null
    userName: string | null
    userPhone: string | null
    userEmail: string | null
  }>({ content: '', userEmail: '', userName: '', userPhone: '' })

  const handelClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      await userService
        .post('/sentMail/contactUs', inputs, {})
        .then((res) => {
          ;(() => toast.info(res))()
        })
        .catch((err) => {
          ;(() => toast.error(err.message))()
        })
      setLoading(false)
    } catch {
      setLoading(false)
      ;(() => toast.error('something went wrong !'))()
    }
  }

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <Image
                alt=""
                fill
                sizes="200px"
                src="https://imagedelivery.net/NTBbUGXbgnQKXhDzmZxa9Q/fd485732-7980-4af4-a7b9-364aa70c3e00/quality=65,fit=crop,width=150,height=150"
              />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {/* {propertyData?.name} */}
                Hello
              </span>
              <span className="text-base font-medium mt-1 block">
                {/* {offeringData?.name} */}
                Hello
              </span>
            </div>
            <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              {/* Total Guests {offeringData?.capacity} */}
            </span>
            <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
            {/* <StartRating rating={propertyData?.rating} /> */}
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">Price detail</h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>12 days</span>
            <span>₹ 12000</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Tax</span>
            <span>₹ 0</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹ 13000</span>
          </div>
        </div>
      </div>
    )
  }

  const RenderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-2xl font-semibold">
          Confirm and payment
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <form onSubmit={handelClick} className="space-y-5">
          <h3 className="text-lg font-semibold">Contact</h3>
          <Input
            onChange={(e) =>
              setInputs({ ...inputs, userEmail: e.target.value })
            }
            type="email"
            required
            placeholder="Email"
          />

          {/* Billing Address */}
          <h3 className="text-lg font-semibold">Billing Address</h3>
          <Input type="text" required placeholder="Full Name" />
          <Input type="text" placeholder="Company Name (optional)" />
          <Input type="text" required placeholder="Country" />
          <Input type="text" required placeholder="Address" />
          <div className="flex justify-between">
            <Input type="text" required placeholder="City" />
            <Input type="text" required placeholder="State" />
            <Input
              type="number"
              required
              placeholder="Zip Code"
              minLength={5}
              min={0}
            />
          </div>
          <Input type="text" required placeholder="Phone" />
          <div className="mt-6">
            <div className="pt-8">
              <ButtonPrimary loading={loading}>
                Continue to payment
              </ButtonPrimary>
            </div>
          </div>
        </form>
      </div>
    )
  }
  return (
    <div className={`nc-CheckOutPagePageMain `}>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">
          <RenderMain />
        </div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  )
}

export default PageBook
