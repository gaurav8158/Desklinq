'use client'

import React, { FC } from 'react'
import { Offering } from '../offering.type'
import Image from 'next/image'
import { Squares2X2Icon } from '@heroicons/react/24/solid'
import { useAppDispatch } from '@/redux/app/hooks'
import { updateRedirectURL } from '@/redux/user/userSlice'
import { usePathname, useRouter } from 'next/navigation'
import { Route } from 'next'

interface Props {
  offerings: Offering
}

const ImageSecton: FC<Props> = ({ offerings }) => {
  const { id, images } = offerings

  const dispatch = useAppDispatch()
  const thisPathname = usePathname()
  const router = useRouter()

  const handleOpenModalImageGallery = () => {
    dispatch(updateRedirectURL(thisPathname))
    const basePath = thisPathname
    router.push(`${basePath}/photos?modal=PHOTO_TOUR_SCROLLABLE` as Route)
  }

  return (
    <header className="rounded-md sm:rounded-xl">
      <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
        <div
          className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
          onClick={handleOpenModalImageGallery}
        >
          <Image
            fill
            className="object-cover rounded-md sm:rounded-xl"
            src={images[0]}
            alt=""
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
          <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
        </div>
        {images &&
          images
            .filter((_, i) => i >= 1 && i < 5)
            .map((item, index) => (
              <div
                key={index}
                className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                  index >= 3 ? 'hidden sm:block' : ''
                }`}
              >
                <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                  <Image
                    fill
                    className="object-cover rounded-md sm:rounded-xl "
                    src={item}
                    alt=""
                    sizes="400px"
                  />
                </div>
                <div
                  className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={handleOpenModalImageGallery}
                />
              </div>
            ))}

        <button
          className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-30"
          onClick={handleOpenModalImageGallery}
          // disabled={images.length < 6}
        >
          <Squares2X2Icon className="w-5 h-5" />
          <span className="ml-2 text-neutral-800 text-sm font-medium">
            Show all photos
          </span>
        </button>
      </div>
    </header>
  )
}

export default ImageSecton
