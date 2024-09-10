'use client'

import React, { FC, useEffect, useState } from 'react'
import facebookSvg from '@/images/Facebook.svg'
import twitterSvg from '@/images/Twitter.svg'
import googleSvg from '@/images/Google.svg'
import Input from '@/shared/Input'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Image from 'next/image'
import Link from 'next/link'
import userService from '@/service/user.service'
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { updateToken, updateUser } from '@/redux/user/userSlice'
import { Route } from 'next'
import { toast } from 'react-toastify'

export interface PageSignUpProps {}

const loginSocials = [
  {
    name: 'Continue with Facebook',
    href: '#',
    icon: facebookSvg,
  },
  {
    name: 'Continue with Google',
    href: '#',
    icon: googleSvg,
  },
]

const PageSignUp: FC<PageSignUpProps> = () => {
  const [inputs, setInputs] = useState({})
  const [callbackUrl, setCallbackUrl] = useState('/')

  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search)
      const callbackUrl = searchParams.get('callbackUrl')
      setCallbackUrl(callbackUrl || '/')
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    if (name === 'phone')
      return setInputs((values) => ({
        ...values,
        phone: '+91' + value,
      }))
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    userService
      .post(
        'auth/register',
        { ...inputs, role: '64a0fc4f8e2e8b60cd2e1909' },
        {},
        {}
      )
      .then((response) => {
        response.data &&
          response.data.token &&
          localStorage.setItem('token', JSON.stringify(response.data.token))
        dispatch(updateUser(response.user))
        dispatch(updateToken(response.token))
        ;(() => toast.success('Account created successfully !'))()
        router.push(callbackUrl as Route)
      })
      .catch((error) => {
        if (error.message !== 'NEXT_REDIRECT') {
          ;(() => toast.error(error.message))()
          localStorage.setItem('token', '')
        }
      })
  }

  //

  return (
    <div className={`nc-PageSignUp  `}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <div className="mt-1 flex justify-between gap-1">
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  First Name
                </span>
                <Input
                  type="text"
                  placeholder="John"
                  name="firstName"
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Last Name
                </span>
                <Input
                  type="text"
                  placeholder="Doe"
                  name="lastName"
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
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
                  onChange={handleChange}
                  style={{ paddingLeft: '3rem' }}
                  required
                />
              </div>
            </label>
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
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type="password"
                className="mt-1"
                name="password"
                onChange={handleChange}
                required
              />
            </label>

            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link
              href={`/auth/login?callbackUrl=${callbackUrl}` as Route}
              className="font-semibold underline"
            >
              Sign in
            </Link>
          </span>
        </div>
        <div className="text-center mt-6">
          <p className="text-xs text-neutral-700 dark:text-neutral-300">
            We are committed to protecting your privacy and will never share
            your email with any third-party vendors
          </p>
        </div>
      </div>
    </div>
  )
}

export default PageSignUp
