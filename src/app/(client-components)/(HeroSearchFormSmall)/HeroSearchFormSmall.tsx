'use client'

import React, { FC, useEffect, useState } from 'react'
import { StaySearchFormFields } from '../type'
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks'
import { updatePrimaryFilter } from '@/redux/filters/filterSlice'
import HotDeskSearchForm from './(hot-desk-search-form)/HotDeskSearchForm'
import CabinSearchForm from './(cabins-search-form)/CabinSearchForm'
import MeetingSearchForm from './(meeting-search-form)/MeetingSearchForm'
import VirtualOfficeSearchForm from './(virtual-office-search-form)/VirtualOfficeSearchForm'

export type SearchTab = 'Hot desk' | 'Meeting rooms' | 'Virtual office'

export interface HeroSearchFormSmallProps {
  className?: string
  defaultTab?: SearchTab
  onTabChange?: (tab: SearchTab) => void
  defaultFieldFocus?: StaySearchFormFields
}
const TABS: SearchTab[] = [
  'Hot desk',
  'Meeting rooms',
  // "Cabins",
  'Virtual office',
]

const HeroSearchFormSmall: FC<HeroSearchFormSmallProps> = ({
  className = '',
  onTabChange,
}) => {
  const primaryFilter = useAppSelector(
    (state: any) => state.filter.primaryFilter
  )
  const [tabActive, setTabActive] = useState<SearchTab>(primaryFilter.space)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const filter =
      tabActive == 'Meeting rooms'
        ? { space: tabActive, capacity: 0 }
        : { space: tabActive }
    dispatch(updatePrimaryFilter(filter))
  }, [tabActive, dispatch])

  const renderTab = () => {
    return (
      <ul
        className="h-[38px] flex justify-start  md:justify-center 
    
      "
      >
        {TABS.map((tab) => {
          const active = tab === tabActive
          return (
            <li
              onClick={() => {
                setTabActive(tab)
                onTabChange && onTabChange(tab)
              }}
              className={`relative   bg-white flex-shrink-0 flex items-center cursor-pointer text-base ${
                active
                  ? 'text-neutral-900 bg-[#FAFAFC]  font-medium'
                  : 'text-neutral-500 dark:text-neutral-300 bg-[#FAFAFC]'
              } `}
              key={tab}
            >
              <div className="relative select-none text-[#7065F0]">
                <span className="px-6 py-2">{tab}</span>
                {active && (
                  <span className="absolute top-full mt-1 block w-full h-0.5 rounded-full bg-[#7065F0] dark:bg-[#7065F0] mr-2" />
                )}
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderForm = () => {
    switch (tabActive) {
      case 'Hot desk':
        return <HotDeskSearchForm />
      // case "Cabins":
      //   return <CabinSearchForm />;
      case 'Meeting rooms':
        return <MeetingSearchForm />
      case 'Virtual office':
        return <VirtualOfficeSearchForm />

      default:
        return null
    }
  }

  return (
    <div
      className={`nc-HeroSearchFormSmall ${className}`}
      data-nc-id="HeroSearchFormSmall"
    >
      {renderTab()}
      <div>{renderForm()}</div>
    </div>
  )
}

export default HeroSearchFormSmall
