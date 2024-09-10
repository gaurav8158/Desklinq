'use client'

import { useAppDispatch, useAppSelector } from '@/redux/app/hooks'
import {
  initialState,
  updateRedirectURL,
  updateToken,
  updateUser,
} from '@/redux/user/userSlice'
import userService from '@/service/user.service'
import { Route } from 'next'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useLocation } from 'react-use'

const withAuthRedirect = (
  WrappedComponent: React.ComponentType<any>,
  auth: boolean = true
) => {
  const HocComponent = (props: any) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const userData = useAppSelector((state) => state.userData)
    const pathname = usePathname()

    useEffect(() => {
      const token = localStorage.getItem('token')
      if (!userData.user.id && userData.token.access?.token && token) {
        //refresh token
        if (new Date(userData.token.access.expires) < new Date()) {
          if (new Date(userData.token.refresh?.expires || '') > new Date()) {
            userService
              .post(
                `auth/refresh-tokens?cachebuster=${Math.random() * 10}`,
                { refreshToken: userData.token.refresh?.token },
                { 'cache-buster': Math.random() * 10 }
              )
              .then((res) => {
                dispatch(updateToken(res.data))
              })
              .catch((err) => {
                console.log(err)
                auth && router.push(`/auth/login?callbackUrl=${pathname}`)
              })
          } else auth && router.push(`/auth/login?callbackUrl=${pathname}`)
        }
        userService
          .get(
            `users/token?cachebuster=${Math.random() * 10}`,
            {},
            { authorization: `Bearer ${userData.token.access?.token}` },
            false
          )
          .then((res) => {
            dispatch(updateUser(res.data))
          })
          .catch((err) => {
            console.log(err)
            auth && router.push(`/auth/login?callbackUrl=${pathname}`)
          })
      } else if (!userData.token.access?.token) {
        auth && router.push(`/auth/login?callbackUrl=${pathname}`)
      }
    })

    return <WrappedComponent {...props} />
  }

  return HocComponent
}

export default withAuthRedirect
