import React, { FC, useState } from 'react'
import { TaxonomyType } from '@/data/types'
import convertNumbThousand from '@/utils/convertNumbThousand'
import Link from 'next/link'
import Image from 'next/image'
import { Route } from 'next'
import { useAppDispatch } from '@/redux/app/hooks'
import hotDesk from '@/images/homeCards/hot desk.jpg'
import meetingRooms from '@/images/homeCards/meeting room.jpg'
import virtualOffice from '@/images/homeCards/virtual office.jpg'
import coStudy from '@/images/homeCards/co study.webp'
import cabin from '@/images/homeCards/cabin.webp'
import fashionLab from '@/images/homeCards/fashon lab.jpg'
import music from '@/images/homeCards/music hive.jpg'
import studio from '@/images/homeCards/studio-vector.jpg'
import podcast from '@/images/homeCards/podcast.jpg'

import {
  updatePrimaryFilter,
  updateSecondaryFilter,
} from '@/redux/filters/filterSlice'
import { toast } from 'react-toastify'
import {
  Ahemdabad,
  Bangalore,
  Chennai,
  Delhi,
  Gurgaon,
  Hyderabad,
  Kolkata,
  Mumbai,
  Pune,
} from '@/images/city'
export interface CardCategory5Props {
  className?: string
  taxonomy: TaxonomyType
}

const CardCategory5: FC<CardCategory5Props> = ({
  className = '',
  taxonomy,
}) => {
  const {
    count,
    name,
    desc,
    href = '/',
    thumbnail,
    lat,
    long,
    offerings,
    cities,
  } = taxonomy
  const dispatch = useAppDispatch()
  type SearchTab = 'Hot desk' | 'Meeting rooms' | 'Virtual office'
  const tabs: SearchTab[] = ['Hot desk', 'Meeting rooms', 'Virtual office']

  function changeCordinates(lat?: number | null, long?: number | null) {
    if (cities != null) {
      if (lat != null && long != null) {
        dispatch(updatePrimaryFilter({ coordinates: [long, lat] }))
      }
    }
    if (name == 'Hot desk') {
      dispatch(updatePrimaryFilter({ space: tabs[0] }))
    }
    if (name == 'Meeting rooms') {
      dispatch(updatePrimaryFilter({ space: tabs[1] }))
    }
    if (cities == null && name != tabs[0] && name != tabs[1]) {
      ;(() => toast.info('Coming Soon!'))()
    }
  }

  let image
  switch (name) {
    case 'Hot desk':
      image = hotDesk
      break
    case 'Meeting rooms':
      image = meetingRooms
      break
    case 'Virtual Office (Coming soon)':
      image = virtualOffice
      break
    case 'Co-Study':
      image = coStudy
      break
    case 'Cabin (Coming soon)':
      image = cabin
      break
    case 'Fashion Co-Lab (Coming soon)':
      image = fashionLab
      break
    case 'Music Hive (Coming soon)':
      image = music
      break
    case 'Studio (Coming soon)':
      image = studio
      break
    case 'Podcast (Coming soon)':
      image = podcast
      break
    case 'New Delhi':
      image = Delhi
      break
    case 'Mumbai':
      image = Mumbai
      break
    case 'Kolkata':
      image = Kolkata
      break
    case 'Chennai':
      image = Chennai
      break
    case 'Bangalore':
      image = Bangalore
      break
    case 'Pune':
      image = Pune
      break
    case 'Hyderabad':
      image = Hyderabad
      break
    case 'Ahemdabad':
      image = Ahemdabad
      break
    case 'Gurgaon':
      image = Gurgaon
      break
  }
  return (
    <Link
      href={href as Route}
      className={`nc-CardCategory5 flex flex-col ${className}`}
      data-nc-id="CardCategory5"
      onClick={() => changeCordinates(lat, long)}
    >
      <div
        className={`flex-shrink-0 relative w-full aspect-w-4 aspect-h-3 h-0 rounded-lg overflow-hidden group`}
      >
        <Image
          fill
          alt=""
          src={image || ''}
          className="object-cover w-full h-full rounded-md dark:fill-white"
          sizes="(max-width: 400px) 100vw, 400px"
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <div className="mt-4 px-3 truncate text-center">
        <h2
          className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
        >
          {name}
        </h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400 whitespace-normal">
          {desc}
        </span>
        <span
          className={`block mt-2 text-sm text-neutral-6000 dark:text-neutral-400`}
        >
          {convertNumbThousand(count)} properties
        </span>
      </div>
    </Link>
  )
}

export default CardCategory5
