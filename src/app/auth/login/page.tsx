'use client'

import React, { FC, useEffect, useState } from 'react'
import Input from '@/shared/Input'
import ButtonPrimary from '@/shared/ButtonPrimary'
import Link from 'next/link'
import userService from '@/service/user.service'
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks'
import { updateToken, updateUser } from '@/redux/user/userSlice'
import { Route } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'

export interface PageLoginProps {}

const Login: FC<PageLoginProps> = () => {
  const [inputs, setInputs] = useState<{
    email: string | null
    password: string | null
  }>({ email: '', password: '' })
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await userService
      .post(`auth/login`, inputs, {})
      .then((res) => {
        dispatch(updateToken(res.data.token))
        dispatch(updateUser(res.data.user))
        ;(() => toast.success('Login success'))()
        localStorage.setItem('token', JSON.stringify(res.data.token))
        //routing to callbackUrl
        router.push(callbackUrl as Route)
      })
      .catch((err) => {
        ;(() => toast.error(err.message))()
        localStorage.setItem('token', '')
      })
  }

  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                name="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                autoComplete="username"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link
                  href={
                    `/auth/forgotpassword?callbackUrl=${callbackUrl}` as Route
                  }
                  className="text-sm underline font-medium"
                >
                  Forgot password?
                </Link>
              </span>
              <Input
                type="password"
                className="mt-1"
                name="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                autoComplete="current-password"
              />
            </label>

            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user?
            <Link
              href={`/auth/signup?callbackUrl=${callbackUrl}` as Route}
              className="font-semibold underline"
            >
              Create an account
            </Link>
          </span>
        </div>
        <div className="text-center mt-6">
          <p className=" text-xs text-neutral-700 dark:text-neutral-300">
            For your security, we will never share your email. Your privacy is
            important to us
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
