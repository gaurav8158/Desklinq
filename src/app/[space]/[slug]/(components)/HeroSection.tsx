'use client'
import React, { FC } from 'react'
import { Offering } from '../offering.type'
import Badge from '@/shared/Badge'
import formatString from '@/function/StringFunctions'
import StartRating from '@/components/StartRating'
import Avatar from '@/shared/Avatar'
import {
  Briefcase,
  DesktopTower,
  ChalkboardTeacher,
  Armchair,
  Ticket,
  Clock,
  ArrowRight,
} from 'phosphor-react'
import Image from 'next/image'

interface Props {
  offerings: Offering
}
const HeroSection: FC<Props> = ({ offerings }) => {
  const { property, address } = offerings

  return (
    <div className="listingSection__wrap !space-y-6">
      {/* <div className="flex justify-between items-center">
        <Badge name={formatString(offerings.type) || 'Office spaces'} />
      </div> */}
      <div className="flex items-center space-x-4">
        {/* <StartRating rating={property.rating} /> */}
        <span>
          <i className="las la-map-marker-alt"></i>
          <span className="ml-1">
            {address.city}, {address.state}
          </span>
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
        {offerings.name}
      </h2>
      <div className="flex items-center text-sm space-x-4 text-gray-500">
        <div className="flex items-center space-x-2">
          <Ticket size={24} weight="fill" />
          <span>Hot Desks</span>
        </div>

        <div className="flex items-center space-x-2">
          <Armchair size={24} weight="fill" />
          <span>50+ Seats</span>
        </div>

        <div className="flex items-center space-x-2">
          <ChalkboardTeacher size={24} weight="fill" />
          <span>8 Seater Meeting Room</span>
        </div>
      </div>

      {/* <div className="flex items-center">
        <Avatar hasChecked sizeClass="h-10 w-10" radius="rounded-full" />
        <span className="ml-2.5 text-neutral-500 dark:text-neutral-400">
          Property:
          <span className="text-neutral-900 dark:text-neutral-200 font-medium">
            {property.name}
          </span>
        </span>
      </div> */}

      <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />
      <div className=" flex flex-col ">
        {/* About Section */}

        <section>
          <h2 className="text-xl mb-2 font-semibold">About</h2>
          <p className="text-neutral-6000 dark:text-neutral-30 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
            <span className="text-indigo-600 font-medium cursor-pointer">
              {' '}
              read more
            </span>
          </p>
        </section>

        {/* Open Hours Section */}
        <section className="mt-4">
          <h3 className="text-base mb-2 font-semibold">Open Hours</h3>
          <div className="flex text-neutral-6000 text-sm dark:text-neutral-30 space-x-8 ">
            <div className="flex items-center space-x-2">
              <Clock size={24} />
              <span>Mon - Fri: 8:00AM - 9:00PM</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={24} />
              <span>Sat - Sun: 10:00AM - 7:00PM</span>
            </div>
          </div>
        </section>

        {/* Pricing Options Section */}
      </div>

      {/* <div className="flex items-center  justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
        <div className="flex items-center space-x-3 ">
          <i className="las la-door-open text-2xl"></i>
          <span className="">{offerings?.name} </span>
        </div>

        {!(offerings?.type === 'VIRTUAL_OFFICE') && (
          <div className="flex items-center">
            <i className=" las la-users text-2xl "></i>
            <span>
              <span className="hidden sm:inline-block">
                {offerings?.capacity}
                <span className="hidden sm:inline-block">
                  {offerings?.type == 'HOT_DESK' ? 'Desk' : 'Capacity'}
                </span>
              </span>
            </span>
          </div>
        )}
      </div> */}
    </div>
  )
}

export default HeroSection
