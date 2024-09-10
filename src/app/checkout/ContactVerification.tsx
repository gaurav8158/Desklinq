'use client'

import { useAppSelector } from '@/redux/app/hooks'
import userService from '@/service/user.service'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { BookingType } from '@/type/BookingsTypes'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { PopUp } from './PopUp'
import { Tab } from '@headlessui/react'
import { dateRender } from '@/function/fuction'
import { PricingType } from './PageMain'
import { useRouter } from 'next/navigation'

interface ContactProps {
  className?: string
  bookingData: BookingType
  changePaymentOption: (value: 'FULL' | 'PARTIAL' | 'ON_PREMISE') => void
  pricing: PricingType
}

const Contact: FC<ContactProps> = ({
  className,
  bookingData,
  changePaymentOption,
  pricing,
}) => {
  const user = useAppSelector((state) => state.userData.user)
  const router = useRouter()
  const userToken = useAppSelector(
    (state) => state.userData.token.access?.token
  )
  const [alert, setAlert] = useState<{
    state: boolean
    message: string
    className: string
    title: string
  }>({
    title: '',
    state: false,
    message: '',
    className: '',
  })
  const [buttonFunction, setButtonFunction] = useState<{
    loading: boolean
    disabled: boolean
  }>({ loading: false, disabled: false })

  const { tax, totalAmount, amountToPay, discount, price } = pricing
  const amountToBePaid =
    Math.round((pricing.totalAmount - pricing.amountToPay) * 100) / 100
  const [paymentOption, setPaymentOption] = useState<
    'FULL' | 'PARTIAL' | 'ON_PREMISE'
  >('FULL')

  useEffect(() => {
    changePaymentOption(paymentOption)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentOption])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  const handelSubmit = async () => {
    if (!userToken) {
      toast.error('Please login to continue')
      return
    }

    setButtonFunction({ loading: true, disabled: true })

    const { id } = bookingData

    const body = {
      status: paymentOption === 'ON_PREMISE' ? 'BOOKED' : 'PENDING',
      paymentMode: paymentOption,
      payment: {
        mrp: price,
        total: totalAmount,
        subTotal: price,
        amountToBePaid: amountToBePaid.toFixed(2),
        charges: [
          {
            name: 'Tax',
            value: tax,
          },
        ],
      },
    }

    const res = await userService.put(
      `/bookings/`,
      id,
      body,
      { cacheBuster: Math.random() },
      { authorization: `Bearer ${userToken}` }
    )

    if (
      paymentOption === 'ON_PREMISE' &&
      res.success === true &&
      res.data.status === 'BOOKED'
    ) {
      setAlert({
        state: true,
        title: 'Booking Successful',
        message: 'Your booking was successful. Redirecting to your bookings.',
        className: 'text-green-600',
      })
      setTimeout(() => {
        setAlert({ state: false, message: '', className: '', title: '' })
        router.push(`/pay-done?bookingId=${bookingData.id}`, {
          scroll: false,
        })
      }, 5000)
    } else if (paymentOption !== 'ON_PREMISE' && res.success) {
      const bookingData = res.data

      const order = await userService.post(
        '/order',
        {
          amount: amountToPay,
          currency: 'INR',
          scope: 'BOOKING',
          refId: id,
          paymentGateway: 'RAZORPAY',
          quantity: 1,
        },
        { cacheBuster: Math.random() },
        { authorization: `Bearer ${userToken}` }
      )

      const razorpayOrderId = order.data.razorpayOrder.id
      const orderId = order.data.order.id

      const options = {
        // key: 'rzp_test_tmzx7kNFhZRrMw',
        key: 'rzp_live_lSGxjcZ6079cSD',
        amount: amountToPay * 100,
        currency: 'INR',
        name: 'Desklinq',
        description: `Booking`,
        image: 'https://desklinq.com/favicon.png',
        order_id: razorpayOrderId,
        // callback_url: 'http://localhost:3000/pay-done?bookingId=bookingData.id',
        prefill: {
          name: user.firstName + ' ' + user.lastName,
          email: user.email,
          contact: user.phone,
        },
        handler: async function (response: any) {
          setButtonFunction({ loading: true, disabled: true })
          setAlert({
            state: true,
            title: 'Processing ...',
            message: 'Please wait while we process your payment.',
            className: 'text-neutral-600',
          })
          const body = {
            bookingId: bookingData.id,
            orderId,
            razorpayOrderId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }
          const orderValidated = await userService.post(
            `/order/validate`,
            body,
            { cacheBuster: Math.random() },
            { authorization: `Bearer ${userToken}` }
          )

          if (orderValidated.success) {
            setAlert({
              state: true,
              title: 'Payment Success',
              message:
                'Your payment to Desklinq was successful. Redirecting to your bookings.',
              className: 'text-green-600',
            })
            setTimeout(() => {
              setAlert({ state: false, message: '', className: '', title: '' })
              router.push(`/pay-done?bookingId=${bookingData.id}`, {
                scroll: false,
              })
            }, 5000)
          } else {
            setAlert({
              state: true,
              title: 'Payment Failed',
              message: res.error.message,
              className: 'text-red-600',
            })
            setTimeout(() => {
              setAlert({ state: false, message: '', className: '', title: '' })
              router.push(`/mybookings`, { scroll: false })
            }, 5000)
          }

          setButtonFunction({ loading: false, disabled: false })
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      }
      const rzp1 = new (window as any).Razorpay(options)

      rzp1.open()

      const handlePaymentResponse = async (
        response: any,
        paymentStatus: string
      ) => {
        rzp1.close()
        setAlert({
          state: true,
          title: `Payment ${paymentStatus}`,
          message: response.error.description,
          className: 'text-red-600 ',
        })

        const body = {
          bookingId: bookingData.id,
          paymentStatus,
          paymentGatewayResponse: {
            code: response.error.code,
            description: response.error.description,
            source: response.error.source,
            step: response.error.step,
            reason: response.error.reason,
            metadata: {
              order_id: response.error.metadata.order_id,
              payment_id: response.error.metadata.payment_id,
            },
          },
        }

        await userService.put(
          `/order/failed`,
          orderId,
          body,
          {},
          { authorization: `Bearer ${userToken}` }
        )
        setTimeout(() => {
          setAlert({ state: false, message: '', className: '', title: '' })
          router.push(`/mybookings`, { scroll: false })
        }, 5000)
      }

      rzp1.on('payment.failed', (response: any) => {
        handlePaymentResponse(response, 'REJECTED')
      })

      rzp1.on('payment.cancel', (response: any) => {
        handlePaymentResponse(response, 'CANCELLED')
      })
    }
    setButtonFunction({ loading: false, disabled: false })
  }

  const renderPaymentSection = () => {
    return (
      <div>
        <h3 className="text-2xl font-semibold">Pay with</h3>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

        <div className="mt-6">
          <Tab.Group>
            <Tab.List className="my-5 space-y-5">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none flex ${
                      selected
                        ? 'bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900'
                        : 'text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                    onClick={() => setPaymentOption('FULL')}
                  >
                    <span className="inline-block space-x-3">
                      <i
                        className={`las ${
                          selected ? 'la-check' : 'la-circle'
                        } text-lg`}
                      ></i>
                      <span>Full Payment</span>
                    </span>
                  </button>
                )}
              </Tab>
              <Tab.Panel className="space-y-5 mx-14">
                <div className="space-y-1">
                  <div className="block font-bold">Description :</div>
                  <span className="text-sm text-neutral-500 block">
                    Reserve your coworking space for the full term! Pay in full
                    now to save time.
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="block font-bold">Total Amount :</div>
                  <span className="text-sm text-neutral-500 block">
                    ₹{totalAmount}
                  </span>
                </div>
              </Tab.Panel>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                      selected
                        ? 'bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900'
                        : ' text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                    onClick={() => setPaymentOption('PARTIAL')}
                  >
                    <span className="inline-block space-x-3">
                      <i
                        className={`las ${
                          selected ? 'la-check' : 'la-circle'
                        } text-lg`}
                      ></i>
                      <span>Partial Payment</span>
                    </span>
                  </button>
                )}
              </Tab>
              <Tab.Panel className="space-y-5 mx-14">
                <div className="space-y-1">
                  <div className="block font-bold">Description :</div>
                  <span className="text-sm text-neutral-500 block">
                    Reserve your seat with just a 10% down payment! Pay the
                    remaining payment conveniently when you arrive.
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="block font-bold">Partial Payment :</div>
                  <span className="text-sm text-neutral-500 block">
                    ₹{amountToPay}
                  </span>
                </div>
              </Tab.Panel>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                      selected
                        ? 'bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900'
                        : ' text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                    onClick={() => setPaymentOption('ON_PREMISE')}
                  >
                    <span className="inline-block space-x-3">
                      <i
                        className={`las ${
                          selected ? 'la-check' : 'la-circle'
                        } text-lg`}
                      ></i>
                      <span>On-site Payment</span>
                    </span>
                  </button>
                )}
              </Tab>
              <Tab.Panel className="space-y-5 mx-14">
                <div className="space-y-1">
                  <div className="block font-bold">Description :</div>
                  <span className="text-sm text-neutral-500 block">
                    Securely pay your coworking space fee upon arrival using
                    your preferred payment method.
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="block font-bold">Total Amount :</div>
                  <span className="text-sm text-neutral-500 block">₹ 0</span>
                </div>
              </Tab.Panel>
            </Tab.List>
          </Tab.Group>
          <div className="pt-8">
            <ButtonPrimary
              loading={buttonFunction.loading}
              onClick={handelSubmit}
              disabled={
                bookingData.status !== 'PENDING' || buttonFunction.disabled
              }
            >
              Confirm and pay
            </ButtonPrimary>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
      <div className="absolute z-10">
        <PopUp
          description={alert.message}
          isOpen={alert.state}
          setIsOpen={() => setAlert({ ...alert, state: false })}
          title={alert.title}
          className={alert.className}
        />
      </div>
      <h2 className="text-3xl lg:text-4xl font-semibold">Payment</h2>
      <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="my-5">
        <h3 className="text-2xl font-semibold">Booking details</h3>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>
        <div className="space-y-5 text-md flex flex-col">
          <div className="inline-block">
            <span className="font-bold">Start Time : </span>
            <span className="text-sm">
              {dateRender(bookingData.startTime, bookingData.offerings?.type)}
            </span>
          </div>
          <div className="inline-block">
            <span className="font-bold">End Time: </span>
            <span className="text-sm">
              {dateRender(bookingData.endTime, bookingData.offerings?.type)}
            </span>
          </div>
          <div className="inline-block">
            <span className="font-bold">Capacity: </span>
            <span className="text-sm">{bookingData.capacity}</span>
          </div>
        </div>
      </div>
      <div>{renderPaymentSection()}</div>
    </div>
  )
}

export default Contact
