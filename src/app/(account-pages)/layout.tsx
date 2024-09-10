'use client'

import React, { FC, use } from 'react'
import { Nav } from './(components)/Nav'
import withAuthRedirect from '../(HOC)/withAuthRedirect'

export interface CommonLayoutProps {
  children?: React.ReactNode
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div className="nc-CommonLayoutAccount bg-neutral-50 dark:bg-neutral-900">
      <div className="border-b border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
        <Nav />
      </div>
      <div className="container pt-5 sm:pt-10 pb-14 lg:pb-20">{children}</div>
    </div>
  )
}

export default withAuthRedirect(CommonLayout)
