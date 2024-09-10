'use client'

import React, { FC, useEffect, useState } from 'react'
import Input from '@/shared/Input'
import ButtonPrimary from '@/shared/ButtonPrimary'
import userService from '@/service/user.service'
import { Route } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'

export interface PageLoginProps {}

const ResetPassword: FC<PageLoginProps> = () => {
  const [inputs, setInputs] = useState({
    password: '',
    confirmpassword: '',
    otp: '',
  })
  const [token, setToken] = useState('')
  const [otpToken, setOtpToken] = useState('')
  const [callbackUrl, setCallbackUrl] = useState('/')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search)

      const token = searchParams.get('token')
      const otpToken = searchParams.get('otpToken')
      const callbackUrl = searchParams.get('callbackUrl')
      setCallbackUrl(callbackUrl || '/')
      setToken(token || '')
      setOtpToken(otpToken || '')
    }
  }, [])

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const query = otpToken ? { otp: inputs.otp } : { token: token }
    const params = otpToken
      ? { password: inputs.password, otpToken: otpToken }
      : { password: inputs.password }
    if (inputs.password !== inputs.confirmpassword)
      return (() => toast.error('password not match'))()
    else
      await userService
        .post(`auth/reset-password`, params, query)
        .then((res) => {
          ;(() => toast.success('Reset successfully !'))()
          router.push(`/auth/login?callbackUrl=${callbackUrl}` as Route)
        })
        .catch((err) => {
          ;(() => toast.error(err.message))()
          localStorage.setItem('token', '')
        })
  }

  //

  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Reset Password
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            {otpToken && (
              <label className="block">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  OTP
                </span>
                <Input
                  type="number"
                  className="mt-1"
                  name="otp"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputs({ ...inputs, otp: e.target.value })
                  }
                />
              </label>
            )}
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type="password"
                className="mt-1"
                name="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirm Password
              </span>
              <Input
                type="password"
                className="mt-1"
                name="confirmpassword"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputs({ ...inputs, confirmpassword: e.target.value })
                }
              />
            </label>
            <ButtonPrimary type="submit">Reset Password</ButtonPrimary>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
