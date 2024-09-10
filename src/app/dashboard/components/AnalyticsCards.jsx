import React from 'react'
import DashBoardCard from '../../../components/DashBoardCard.tsx'

export default function Header({ cardStats }) {
  return (
    <div className="relative md:pt-32 pb-16 pt-12 w-[100%]">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <div className="">
          <DashBoardCard
            statSubtitle="Number Of Users"
            statTitle={cardStats?.numberOfUsers}
            statIconName="las la-users md:text-4xl text-2xl"
          />
        </div>
        <div className="">
          <DashBoardCard
            statSubtitle="Properties Onboarded"
            statTitle={cardStats?.numberOfSpaces?.properties}
            statIconName="las la-chart-bar md:text-4xl text-2xl"
          />
        </div>
        <div className="">
          <DashBoardCard
            statSubtitle="Offerings Onboarded"
            statTitle={cardStats?.numberOfSpaces?.offerings}
            statIconName="las la-chart-pie md:text-4xl text-2xl"
          />
        </div>
        <div className="">
          <DashBoardCard
            statSubtitle="Meeting Rooms Onboarded"
            statTitle={cardStats?.offeringsType?.MEETING_ROOMS}
            statIconName="las la-chart-bar md:text-4xl text-2xl"
          />
        </div>
        <div className="">
          <DashBoardCard
            statSubtitle="Hot Desks Onboarded"
            statTitle={cardStats?.offeringsType?.HOT_DESK}
            statIconName="las la-chart-pie md:text-4xl text-2xl"
          />
        </div>
        <div className="">
          <DashBoardCard
            statSubtitle="Total Bookings"
            statTitle={
              cardStats?.bookingStatusType?.IN_PROGRESS +
              cardStats?.bookingStatusType?.CANCELLED
            }
            statIconName="las la-users md:text-4xl text-2xl"
          />
        </div>
        <div className="">
          <DashBoardCard
            statSubtitle="Bookings (In Progress)"
            statTitle={cardStats?.bookingStatusType?.IN_PROGRESS}
            statIconName="las la-user-clock md:text-4xl text-2xl"
          />
        </div>
        <div className="">
          <DashBoardCard
            statSubtitle="Bookings (Cancelled)"
            statTitle={cardStats?.bookingStatusType?.CANCELLED}
            statIconName="las la-user-times md:text-4xl text-2xl"
          />
        </div>
      </div>
    </div>
  )
}
