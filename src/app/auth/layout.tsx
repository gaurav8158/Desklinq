'use client'

import React, { FC } from 'react'

export interface CommonLayoutProps {
  children?: React.ReactNode
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div className="nc-CommonLayoutAccount bg-neutral-50 dark:bg-neutral-900">
      <div className="container pt-5 sm:pt-10 pb-14 lg:pb-20">{children}</div>
    </div>
  )
}

export default CommonLayout
