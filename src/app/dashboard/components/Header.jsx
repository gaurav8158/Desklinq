import React from 'react'

// components

import CardStats from './Card.jsx'
import DashBoardCard from '../../../components/DashBoardCard.tsx'

export default function Header({
  totalBookings,
  totalRevenue,
  propertiesOnboarded,
  bookingOnboarded,
}) {
  return (
    <>
      <div className="relative  md:pt-32 pb-16 pt-12">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="">
            <DashBoardCard
              statSubtitle="Properties Uploaded"
              statTitle={propertiesOnboarded}
              statIconName="las la-chart-bar md:text-4xl text-2xl"
            />
          </div>
          <div className="">
            <DashBoardCard
              statSubtitle="Offerings Uploaded"
              statTitle={bookingOnboarded}
              statIconName="las la-chart-pie md:text-4xl text-2xl"
            />
          </div>
          <div className="">
            <DashBoardCard
              statSubtitle="Total Bookings"
              statTitle={totalBookings}
              statIconName="las la-users md:text-4xl text-2xl"
            />
          </div>
          <div className="">
            <DashBoardCard
              statSubtitle="Total Revenue"
              statTitle={totalRevenue}
              statIconName="las la-percent md:text-4xl text-2xl"
            />
          </div>
        </div>
      </div>
    </>
  )
}
