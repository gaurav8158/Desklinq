'use client'

import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import Logo from '@/shared/Logo'
import useOutsideAlerter from '@/hooks/useOutsideAlerter'
import NotifyDropdown from './NotifyDropdown'
import AvatarDropdown from './AvatarDropdown'
import MenuBar from '@/shared/MenuBar'
import { SearchTab } from '../(HeroSearchForm)/HeroSearchForm'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import HeroSearchFormSmall from '../(HeroSearchFormSmall)/HeroSearchFormSmall'
import { StaySearchFormFields } from '../type'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useAppSelector } from '@/redux/app/hooks'
import HeroSearchForm2Mobile from '../(HeroSearchForm2Mobile)/HeroSearchForm2Mobile'
import { SearchContext } from '@/app/layout'
import ButtonPrimary from '@/shared/ButtonPrimary'

const cityList = [
  'Ahmedabad',
  'New Delhi',
  'Gurgaon',
  'Mumbai',
  'Pune',
  'Kolkata',
  'Hyderabad',
]

interface Header3Props {
  className?: string
}

let WIN_PREV_POSITION = 0
if (typeof window !== 'undefined') {
  WIN_PREV_POSITION = (window as any).pageYOffset
}

const Header3: FC<Header3Props> = ({ className = '' }) => {
  const space: SearchTab = useAppSelector(
    (state: any) => state.filter.primaryFilter.space
  )
  const headerInnerRef = useRef<HTMLDivElement>(null)
  const [showHeroSearch, setShowHeroSearch] =
    useState<StaySearchFormFields | null>()
  const [currentTab, setCurrentTab] = useState<SearchTab>(space)
  //
  const { state, dispatch } = useContext(SearchContext)!

  useOutsideAlerter(headerInnerRef, () => {
    setShowHeroSearch(null)
    dispatch({ type: 'hide' })
    // setCurrentTab(space);
  })
  const [isOpen, setIsOpen] = useState(false)
  const [isOpen1, setIsOpen1] = useState(false)
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  const handleToggle1 = () => {
    setIsOpen1(!isOpen1)
  }
  let pathname = usePathname()
  //
  useEffect(() => {
    setShowHeroSearch(null)
    dispatch({ type: 'hide' })
  }, [pathname, dispatch])

  // HIDDEN WHEN SCROLL EVENT
  useEffect(() => {
    window.addEventListener('scroll', handleEvent)
    return () => {
      window.removeEventListener('scroll', handleEvent)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (state == 'search') {
      setShowHeroSearch(null)
      dispatch({ type: 'hide' })
    }
  }, [state, dispatch])

  const handleEvent = () => {
    window.requestAnimationFrame(handleHideSearchForm)
  }

  const handleHideSearchForm = () => {
    if (!document.querySelector('#nc-Header-3-anchor')) {
      return
    }
    //
    let currentScrollPos = window.pageYOffset
    if (
      WIN_PREV_POSITION - currentScrollPos > 100 ||
      WIN_PREV_POSITION - currentScrollPos < -100
    ) {
      setShowHeroSearch(null)
      dispatch({ type: 'hide' })
    } else {
      return
    }
    WIN_PREV_POSITION = currentScrollPos
  }

  //
  const renderHeroSearch = () => {
    return (
      <div
        className={`absolute inset-x-0 top-0 transition-all will-change-[transform,opacity] ${
          showHeroSearch || state
            ? 'visible'
            : '-translate-x-0 -translate-y-[90px] scale-x-[0.395] scale-y-[0.6] opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className={`w-full max-w-4xl mx-auto pb-6`}>
          <HeroSearchFormSmall onTabChange={setCurrentTab} />
        </div>
      </div>
    )
  }

  const renderButtonOpenHeroSearch = () => {
    return (
      <div>
        <div
          className={`w-full relative flex items-center justify-between border border-neutral-200 dark:border-neutral-6000 rounded-full shadow hover:shadow-md transition-all ${
            state || showHeroSearch
              ? '-translate-x-0 translate-y-20 scale-x-[2.55] scale-y-[1.8] opacity-0 pointer-events-none invisible'
              : 'visible'
          }`}
        >
          <div className="flex items-center font-medium text-sm">
            <span
              onClick={() => setShowHeroSearch('location')}
              className="block pl-5 pr-4 cursor-pointer py-3"
            >
              Search for your perfect workplace
            </span>
          </div>

          <div
            className="flex-shrink-0 ml-auto pr-2 cursor-pointer"
            onClick={() => setShowHeroSearch('location')}
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-6000  text-white">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* <div className={`pencilbanner`}>
        <Link target="_blank" href={{ pathname: '/comingsoon' }}>
          <div className={`pencilbannertext`}>
            Click here to discover Desklinq Smart Search.
          </div>
        </Link>
      </div> */}
      <div
        className={`nc-Header nc-Header-3 fixed z-40 top-0 inset-0 bg-black/30 dark:bg-black/50 transition-opacity will-change-[opacity] ${
          state || showHeroSearch
            ? 'visible'
            : 'invisible opacity-0 pointer-events-none'
        }`}
      ></div>
      {(state || showHeroSearch) && <div id="nc-Header-3-anchor"></div>}
      <header ref={headerInnerRef} className={`sticky top-0 z-40 ${className}`}>
        <div
          className={`bg-white dark:bg-neutral-900 absolute h-full inset-x-0 top-0 transition-transform will-change-[transform,opacity]
          ${state || showHeroSearch ? 'duration-75' : ''} 
          ${
            state || showHeroSearch
              ? currentTab === 'Hot desk'
                ? 'scale-y-[4.4]'
                : 'scale-y-[3.4]'
              : ''
          }`}
        ></div>
        <div className="relative px-4 lg:container h-[88px] flex">
          <div className="flex-1 flex justify-between">
            {/* Logo (lg+) */}
            <div className="relative z-10 flex flex-1 items-center">
              <Logo />
            </div>

            {/* <div className="flex flex-[2] lg:flex-none mx-auto z-50">
              <div className="flex-1 hidden lg:flex self-center">
                {renderButtonOpenHeroSearch()}
              </div>
              <div className="self-center flex-1 lg:hidden w-full max-w-lg mx-auto">
                <HeroSearchForm2Mobile />
              </div>
              {renderHeroSearch()}
            </div> */}

            {/* NAV */}
            {/* <div className="hidden md:flex relative z-10 flex-1 justify-end text-neutral-700 dark:text-neutral-100">
              <div className=" flex space-x-1">
                <Link
                  href={{ pathname: '/dashboard/home' }}
                  className="self-center xl:inline-flex px-4 py-2 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full items-center text-sm text-gray-700 dark:text-neutral-300 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 truncate"
                >
                  List your property
                </Link>

               
                <AvatarDropdown />
              
              </div>
            </div> */}

            <div className="hidden lg:flex items-center space-x-4">
              <div className="relative">
                {/* Trigger Button */}
                <button
                  className="flex items-center gap-[4px] "
                  onClick={handleToggle}
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
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

                {/* Dropdown Menu */}
                <div
                  className={`absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  onMouseEnter={() => setIsOpen(true)}
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Hot Desks
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Meeting Rooms
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Co-working Spaces
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                {/* Trigger Button */}
                <button
                  className="flex items-center gap-[4px] "
                  onClick={handleToggle1}
                  onMouseEnter={() => setIsOpen1(true)}
                  onMouseLeave={() => setIsOpen1(false)}
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

                {/* Dropdown Menu */}
                <div
                  className={`absolute -left-10 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out ${
                    isOpen1 ? 'opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  onMouseEnter={() => setIsOpen1(true)}
                  onMouseLeave={() => setIsOpen1(false)}
                >
                  <ul className="py-2 ">
                    {cityList.map((city) => (
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link href="#">About us</Link>
              <Link href="#">Contact Us</Link>
              <button className="px-6 py-3 lg:px-6 lg:py-3 rounded-xl border border-gray-500">
                Log In
              </button>

              <ButtonPrimary
                // onClick={() => dispatch({ type: 'show' })}
                sizeClass="px-6 py-3 lg:px-6 lg:py-3 rounded-xl"
                fontSize="text-sm sm:text-base lg:text-base font-medium"
              >
                Book a Tour
              </ButtonPrimary>
            </div>

            <div className="flex items-center lg:hidden ">
              <MenuBar />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header3
