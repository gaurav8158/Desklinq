import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAppSelector } from '@/redux/app/hooks'
import Logo from '@/shared/Logo'
import AvatarDropdown from '@/app/(client-components)/(Header)/AvatarDropdown'
import { RiCoupon4Line } from 'react-icons/ri'
import { useTour } from '@reactour/tour'

const NavItem = ({ href, children, isActive, className }) => (
  <li className={`items-center ${className}`}>
    <Link legacyBehavior href={href}>
      <a
        className={`flex items-center justify-start text-xs uppercase py-3 font-bold ${
          isActive
            ? 'text-lightBlue-500 hover:text-lightBlue-600'
            : 'text-blueGray-700 hover:text-blueGray-500'
        }`}
      >
        {children}
      </a>
    </Link>
  </li>
)

const NavIcon = ({ iconClass, isActive }) => (
  <i
    className={`${iconClass} mr-2 text-lg ${
      isActive ? 'opacity-75' : 'text-blueGray-400'
    }`}
  ></i>
)

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState('hidden')
  const pathname = usePathname()

  const userData = useAppSelector((state) => state.userData)
  const { setIsOpen } = useTour()

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative lg:w-64 2xl:w-96 z-10 py-4 px-6 ">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <i className="las la-bars text-2xl"></i>
          </button>

          <div className="z-10 items-center 2xl:py-2 hidden md:block">
            <Logo className="md:w-20 lg:w-44 2xl:w-72" />
          </div>
          <button onClick={() => setIsOpen(true)} className="start-sidebar-btn">
            Open Tour
          </button>

          <ul className="md:hidden items-center flex flex-wrap list-none">
            <AvatarDropdown />
          </ul>

          {/* Collapse */}
          <div
            className={`md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ${collapseShow}`}
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  {/* Brand */}
                  <Logo />
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <i className="las la-times text-2xl"></i>
                  </button>
                </div>
              </div>
            </div>

            <hr className="mb-4 md:min-w-full" />
            <div className="sidebar">
              <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                Admin Pages
              </h6>

              <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                {userData?.user?.isAdmin && (
                  <NavItem
                    href="/dashboard/master"
                    isActive={pathname.indexOf('/dashboard/master') !== -1}
                  >
                    <NavIcon
                      iconClass="las la-crown"
                      isActive={pathname.indexOf('/dashboard/master') !== -1}
                    />
                    Master
                  </NavItem>
                )}

                <NavItem
                  href="/dashboard/home"
                  isActive={pathname === '/dashboard/home'}
                >
                  <NavIcon
                    iconClass="las la-desktop"
                    isActive={pathname === '/dashboard/home'}
                  />
                  Home
                </NavItem>

                <NavItem
                  href="/dashboard/my-properties"
                  className="properties"
                  isActive={pathname.indexOf('/dashboard/my-properties') !== -1}
                >
                  <NavIcon
                    iconClass="las la-home"
                    isActive={
                      pathname.indexOf('/dashboard/my-properties') !== -1
                    }
                    className=""
                  />
                  My Properties
                </NavItem>

                <NavItem
                  href="/dashboard/my-offerings"
                  className="offerings"
                  isActive={pathname.indexOf('/dashboard/my-offerings') !== -1}
                >
                  <NavIcon
                    iconClass="las la-list"
                    isActive={
                      pathname.indexOf('/dashboard/my-offerings') !== -1
                    }
                  />
                  My Offerings
                </NavItem>

                <NavItem
                  href="/dashboard/my-coupons"
                  className="coupons"
                  isActive={pathname.indexOf('/dashboard/my-coupons') !== -1}
                >
                  <RiCoupon4Line className="mr-3" />
                  My Coupons
                </NavItem>

                <NavItem
                  href="/dashboard/booking"
                  className="bookings"
                  isActive={pathname.indexOf('/dashboard/booking') !== -1}
                >
                  <NavIcon
                    iconClass="las la-map-marked-alt"
                    isActive={pathname.indexOf('/dashboard/booking') !== -1}
                  />
                  Bookings
                </NavItem>
              </ul>

              {/* Divider */}
              <hr className="my-4 md:min-w-full" />
              {/* Heading */}
              <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                Auth Pages
              </h6>
              {/* Navigation */}

              <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                <NavItem href="/account">
                  <NavIcon iconClass="las la-user-circle" />
                  Profile
                </NavItem>

                <NavItem
                  href="/"
                  onClick={async () => {
                    close()
                    dispatch(updateUser(initialState.user))
                    dispatch(updateToken(initialState.token))
                    localStorage.removeItem('token')
                  }}
                >
                  <NavIcon iconClass="las la-fingerprint" />
                  Log Out
                </NavItem>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
