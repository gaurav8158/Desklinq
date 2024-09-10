import StartRating from '@/components/StartRating'
import Avatar from '@/shared/Avatar'
import React from 'react'

interface SideBarProps {
  property: any
}
const SideBar: React.FC<SideBarProps> = ({ property }) => {
  return (
    <div>
      <div className=" w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
        <Avatar
          hasChecked
          hasCheckedClass="w-6 h-6 -top-0.5 right-2"
          sizeClass="w-28 h-28"
        />
        <div className="space-y-3 text-center flex flex-col items-center">
          <h2 className="text-3xl font-semibold">{property?.name}</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-neutral-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="text-neutral-6000 dark:text-neutral-300">
                {property?.address?.city}
                {', '}
                {property?.address?.state}
              </span>
            </div>

            <div className="flex items-center justify-center">
              <span className="text-neutral-6000 dark:text-neutral-300">
                <StartRating rating={property?.rating} />
              </span>
            </div>
          </div>
        </div>
        <p
          className="text-neutral-500 dark:text-neutral-400"
          dangerouslySetInnerHTML={{
            __html: property?.description.replace(/\n/g, '<br>') || '',
          }}
        ></p>
        <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>
      </div>
    </div>
  )
}

export default SideBar
