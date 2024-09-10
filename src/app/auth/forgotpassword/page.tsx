'use client'

import React, { FC, Fragment, useState } from 'react'
import Input from '@/shared/Input'
import ButtonPrimary from '@/shared/ButtonPrimary'
import userService from '@/service/user.service'
import { Route } from 'next'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Tab } from '@headlessui/react'
import Alerts from '@/components/Alert'

export interface PageLoginProps {}

const ForgotPassword: FC<PageLoginProps> = () => {
  const [inputs, setInputs] = useState({})
  const router = useRouter()
  const [buttonFunction, setButtonFunction] = useState<{
    loading: boolean
    disabled: boolean
  }>({ loading: false, disabled: true })
  const [alert, setAlert] = useState<{
    message: string
    type: 'success' | 'error' | undefined
  }>({
    message: '',
    type: undefined,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    if (name === 'phone')
      return setInputs((values) => ({
        phone: '+91' + value,
      }))
    setInputs((values) => ({ [name]: value }))
    setButtonFunction({ loading: false, disabled: false })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setButtonFunction({ loading: true, disabled: true })
    await userService
      .post(`auth/forgot-password`, inputs, {})
      .then((res) => {
        if (res.data)
          router.push(
            `/auth/reset-password?otpToken=${res.data.otpToken}` as Route
          )
        setAlert({
          message:
            'The link has been sent to your email, check your inbox or spam folder.',
          type: 'success',
        })
      })
      .catch((err) => {
        setAlert({ message: err.message, type: 'error' })
        localStorage.setItem('token', '')
      })
      .finally(() => {
        setTimeout(() => {
          setAlert({ message: '', type: undefined })
        }, 5000)
        setButtonFunction({ loading: false, disabled: false })
      })
  }

  //

  return (
    <>
      <div className="max-w-lg mx-auto">
        {alert.type && (
          <div className="absolute">
            <Alerts
              message={alert.message}
              type={alert.type}
              classname="z-50"
              color={alert.type}
              variant="filled"
            />
          </div>
        )}
      </div>
      <div className={`nc-PageLogin`}>
        <div className="container mb-24 lg:mb-32">
          <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Forgot password
          </h2>
          <div className="max-w-md mx-auto space-y-6">
            <Tab.Group>
              <Tab.List className="flex space-x-1 overflow-x-auto">
                {['Email'].map((item) => (
                  <Tab key={item} as={Fragment}>
                    {({ selected }: { selected: boolean }) => (
                      <button
                        className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                          selected
                            ? 'bg-secondary-900 text-secondary-50 '
                            : 'text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        } `}
                      >
                        {item}
                      </button>
                    )}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels>
                {/* <Tab.Panel className="mt-8">
                <form
                  className="grid grid-cols-1 gap-6"
                  onSubmit={handleSubmit}
                >
                  <label className="block">
                    <span className="text-neutral-800 dark:text-neutral-200">
                      Phone Number
                    </span>
                    <div>
                      <div className="absolute pl-3 flex items-center pointer-events-none mt-[0.6rem] ">
                        <span className="text-gray-500">+91</span>
                      </div>
                      <Input
                        type="text"
                        placeholder="XXXXXXXXXX"
                        className="mt-1"
                        name="phone"
                        style={{ paddingLeft: "3rem" }}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </label>
                  <ButtonPrimary type="submit">
                    Send An Otp
                  </ButtonPrimary>
                </form>
              </Tab.Panel> */}
                <Tab.Panel className="mt-8">
                  <form
                    className="grid grid-cols-1 gap-6"
                    onSubmit={handleSubmit}
                  >
                    <label className="block">
                      <span className="text-neutral-800 dark:text-neutral-200">
                        Email address
                      </span>
                      <Input
                        type="email"
                        placeholder="example@example.com"
                        className="mt-1"
                        name="email"
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <ButtonPrimary
                      type="submit"
                      disabled={buttonFunction.disabled}
                      loading={buttonFunction.loading}
                    >
                      Send An Otp
                    </ButtonPrimary>
                  </form>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
