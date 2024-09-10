import React, { ReactElement } from 'react'
// import { IconType } from 'react-icons';
type CardProps = {
  statTitle: string
  statSubtitle: string
  statIconName: string
}

const DashBoardCard: React.FC<CardProps> = ({
  statTitle,
  statSubtitle,
  statIconName,
}) => {
  return (
    <>
      <div className="bg-indigo-700 p-3 min-w-[240px] rounded-lg shadow-lg">
        <div className="flex gap-3  items-center">
          <div className=" rounded-full bg-white text-indigo-700 w-14 h-14 p-3 flex justify-center items-center  ">
            <i className={statIconName}></i>
          </div>
          <div className="flex flex-col gap-1 text-white  ">
            <h1 className="text-3xl text-bold">{statTitle}</h1>
            <h3 className="text-xs ">{statSubtitle}</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashBoardCard
