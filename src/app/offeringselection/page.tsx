'use client'

import React, { FC, useState, useEffect } from 'react'
import { OfferingData } from '@/data/lisiting-details'
import withAuthRedirect from '../(HOC)/withAuthRedirect'
import Sidebar from '../listing-stay-detail/[id]/(components)/(utils)/Sidebar'
import userService from '@/service/user.service'
export interface PayPageProps {}

const PayPage: FC<PayPageProps> = () => {
  const [offeringId, setOfferingId] = useState('')
  const [offerings, setOfferings] = useState<OfferingData | undefined>()

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    setOfferingId(searchParams.get('offeringId') || '')
  }, [offeringId])

  useEffect(() => {
    if (!offeringId) return
    ;(async () => {
      try {
        await userService
          .get(
            `/offerings/${offeringId}`,
            { cacheBuster: Math.random() * 10 },
            {},
            false
          )
          .then((response) => {
            setOfferings(response.data)
          })
      } catch (error) {
        console.error('Error fetching offering details:', error)
      }
    })()
  }, [offeringId])

  return (
    <div className="container">
      <main className="container mt-11 mb-24 lg:mb-32 ">
        {/* <div className="max-w-4xl mx-auto">{renderContent()}</div> */}
        <div>
          {/* <Sidebar offering={offerings} dateArray={[]} timeArray={[]} /> */}
        </div>
      </main>
    </div>
  )
}

export default withAuthRedirect(PayPage)
