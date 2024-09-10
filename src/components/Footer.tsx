import Logo from '@/shared/Logo'
import SocialsList1 from '@/shared/SocialsList1'
import { CustomLink } from '@/data/types'
import React from 'react'
import FooterNav from './FooterNav'
import Link from 'next/link'
import { Route } from 'next'
import logo_light from '../../public/images/logo1.png'
import Image from 'next/image'
export interface WidgetFooterMenu {
  id: string
  title: string
  menus: CustomLink[]
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: '1',
    title: 'Overview',
    menus: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/terms', label: 'Term of Use' },
    ],
  },
  {
    id: '2',
    title: 'Spaces',
    menus: [
      { href: '#', label: 'Hot desk' },
      { href: '#', label: 'Meeting Rooms' },
      { href: '#', label: 'Cabins' },
      { href: '#', label: 'Virtual Office' },
    ],
  },
  {
    id: '3',
    title: 'Places',
    menus: [
      { href: '#', label: 'New Delhi' },
      { href: '#', label: 'Mumbai' },
      { href: '#', label: 'Bangalore' },
      { href: '#', label: 'Kolkata' },
      { href: '#', label: 'Chennai' },
    ],
  },
]

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <Link
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href as Route}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Address */}
          <div className="w-full md:w-1/4 mb-6">
            <a href="/">
              <Image src={logo_light} alt="Desklinq Logo" width={150} />
              {/* Replace with actual logo path */}
            </a>
            <p className="mt-4">Address</p>
            <p>(248) 823-3200</p>
            <div className="flex space-x-4 mt-4">
              {/* Social Icons */}

              <SocialsList1 className="flex items-center gap-2" />
            </div>
          </div>

          {/* Links */}
          <div className="w-full md:w-3/4 flex flex-wrap">
            <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Company
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Features
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Pricing
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Resource
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Customer Stories
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Information
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Legal
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Payments
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Career
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Jobs
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Hiring
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    News
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Tips & Tricks
                  </a>
                </li>
              </ul>
            </div>

            <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Help
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    FAQ
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Help Center
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-6" />

        <div className="flex flex-wrap justify-between text-sm">
          <p>© Copyright 2024, Desklinq All Rights Reserved</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">
              Term of Service
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
  // return (
  //   <>
  //     <FooterNav />

  //     <div className="nc-Footer relative py-24 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
  //       <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-4 lg:gap-x-16 ">
  //         <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
  //           <div className="col-span-2 md:col-span-1">
  //             <Logo />
  //           </div>
  //           <div className="col-span-2 flex items-center md:col-span-3">
  //             <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" />
  //           </div>
  //         </div>
  //         {widgetMenus.map(renderWidgetMenuItem)}
  //       </div>
  //     </div>
  //   </>
  // )
}

export default Footer
