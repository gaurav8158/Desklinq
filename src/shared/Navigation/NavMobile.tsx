'use client'

import React, { useState } from 'react'
import ButtonClose from '@/shared/ButtonClose'
import Logo from '@/shared/Logo'
import { Disclosure } from '@headlessui/react'
import { NavItemType } from './NavigationItem'
import { NAVIGATION_DEMO } from '@/data/navigation'
import ButtonPrimary from '@/shared/ButtonPrimary'
import SocialsList from '@/shared/SocialsList'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import SwitchDarkMode from '@/shared/SwitchDarkMode'
import Link from 'next/link'
import LangDropdown from '@/app/(client-components)/(Header)/LangDropdown'
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks'
import { initialState, updateToken, updateUser } from '@/redux/user/userSlice'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
const cityList = [
  'Ahmedabad',
  'New Delhi',
  'Gurgaon',
  'Mumbai',
  'Pune',
  'Kolkata',
  'Hyderabad',
]

export interface NavMobileProps {
  data?: NavItemType[]
  onClickClose?: () => void
}

const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION_DEMO,
  onClickClose,
}) => {
  const userData = useAppSelector((state) => state?.userData.user)
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen1, setIsOpen1] = useState(false)
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  const handleToggle1 = () => {
    setIsOpen1(!isOpen1)
  }
  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {item.children?.map((i, index) => (
          <Disclosure key={i.href + index} as="li">
            <Link
              href={{
                pathname: i.href || undefined,
              }}
              className="flex px-4 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5"
            >
              <span
                className={`py-2.5 pr-3 ${!i.children ? 'block w-full' : ''}`}
              >
                {i.name}
              </span>
              {i.children && (
                <span
                  className="flex-1 flex"
                  onClick={(e) => e.preventDefault()}
                >
                  <Disclosure.Button
                    as="span"
                    className="py-2.5 flex justify-end flex-1"
                  >
                    <ChevronDownIcon
                      className="ml-2 h-4 w-4 text-neutral-500"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </span>
              )}
            </Link>
            {i.children && (
              <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    )
  }

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure
        key={item.id}
        as="li"
        className="text-neutral-900 dark:text-white"
      >
        <Link
          className="flex w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
          href={{
            pathname: item.href || undefined,
          }}
        >
          <span
            className={`py-2.5 pr-3 ${!item.children ? 'block w-full' : ''}`}
          >
            {item.name}
          </span>
          {item.children && (
            <span className="flex-1 flex" onClick={(e) => e.preventDefault()}>
              <Disclosure.Button
                as="span"
                className="py-2.5 flex items-center justify-end flex-1 "
              >
                <ChevronDownIcon
                  className="ml-2 h-4 w-4 text-neutral-500"
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </span>
          )}
        </Link>
        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    )
  }

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800 lg:hidden">
      <div className="py-6 px-5">
        <Logo />
        <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
          <div>
            {/* Mobile Drawer Button */}

            {/* Drawer */}
            <ul className="ml-4">
              <li className="mb-4">
                <button
                  className="flex items-center gap-2"
                  onClick={handleToggle}
                >
                  Workspaces
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isOpen && (
                  <ul className="mt-2 ml-4">
                    <li className="py-2  px-4 rounded-md hover:bg-gray-100 cursor-pointer">
                      Hot Desks
                    </li>
                    <li className="py-2  px-4 rounded-md hover:bg-gray-100 cursor-pointer">
                      Meeting Rooms
                    </li>
                    <li className="py-2  px-4 rounded-md hover:bg-gray-100 cursor-pointer">
                      Co-working Spaces
                    </li>
                  </ul>
                )}
              </li>
              <li className="mb-4">
                <button
                  className="flex items-center gap-2"
                  onClick={handleToggle1}
                >
                  Places
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isOpen1 ? 'rotate-180' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isOpen1 && (
                  <ul className="mt-2 ml-4">
                    {cityList.map((city) => (
                      <li
                        key={city}
                        className="py-2 px-4 rounded-md hover:bg-gray-100 cursor-pointer"
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li className="mb-4">
                <a href="#" className="block py-2">
                  About us
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="block py-2">
                  Contact Us
                </a>
              </li>
              <li className="mb-4 flex gap-4 ">
                <button className="px-6 py-4  text-sm font-medium  rounded-xl w-[130px] text-center border border-gray-500">
                  Log In
                </button>

                <ButtonPrimary
                  // onClick={() => dispatch({ type: 'show' })}
                  sizeClass="px-6 py-4  rounded-xl"
                  fontSize="text-sm font-medium"
                >
                  Book a Tour
                </ButtonPrimary>
              </li>
            </ul>

            {/* Desktop View */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Existing desktop code here */}
            </div>
          </div>

          <span className="mt-4">
            Check out a variety of work environments such as cabins, Hot desks,
            meeting rooms and virtual offices.
          </span>

          <div className="flex justify-between items-center mt-4">
            <SocialsList itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300" />
            <span className="block">
              <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
            </span>
          </div>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      {/* <ul className=""> */}
      {userData?.id ? (
        <div
          className="flex flex-col py-6 px-4 space-y-1"
          onClick={async () => {
            onClickClose?.()
            dispatch(updateUser(initialState.user))
            dispatch(updateToken(initialState.token))
            localStorage.removeItem('token')
          }}
        >
          <div className="text-blueGray-700 hover:text-blueGray-500 flex items-center justify-start text-xs uppercase py-3 font-bold  bg-white dark:bg-neutral-800">
            <ArrowLeftOnRectangleIcon className="w-6 h-6" /> Log Out
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* </ul> */}
      {/* <div className="flex items-center justify-end py-6 px-5">
        <LangDropdown
          className="flex"
          panelClassName="z-10 w-screen max-w-[280px] px-4 mb-3 right-3 bottom-full sm:px-0"
        />
      </div> */}
    </div>
  )
}

export default NavMobile
