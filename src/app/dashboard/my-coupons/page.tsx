'use client'

import ButtonPrimary from '@/shared/ButtonPrimary'
import Heading from '@/shared/Heading'
import Link from 'next/link'
import React from 'react'

function Page() {
  return (
    <div className="min-h-[95vh]">
      <Heading isCenter={true} className="pt-8 mb-8">
        My Coupons
      </Heading>
      <Link href={'/dashboard/add-coupon' as any}>
        <ButtonPrimary
          sizeClass="px-6 py-3 lg:px-8 lg:py-4 rounded-xl"
          fontSize="text-sm sm:text-base lg:text-lg font-medium"
        >
          <i className="las la-plus-circle text-xl mr-2.5"></i> Add Coupons
        </ButtonPrimary>
      </Link>
    </div>
  )
}

export default Page
