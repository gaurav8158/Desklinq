'use client'

import React from 'react'
import { FC, useState } from 'react'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import { Route } from '@/routers/types'

export interface CommonLayoutProps {
  children: React.ReactNode
  params: {
    stepIndex: string
  }
}

const CommonLayout: FC<CommonLayoutProps> = ({ children, params }) => {
  const index = Number(params.stepIndex) || 1

  return (
    <div
      className={`nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32`}
    >
      <div className="space-y-11">
        <div>
          <span className="text-4xl font-semibold">{index}</span>{' '}
          <span className="text-lg text-neutral-500 dark:text-neutral-400">
            / 4
          </span>
        </div>

        {/* --------------------- */}
        <div>{children}</div>
      </div>
    </div>
  )
}

export default CommonLayout
