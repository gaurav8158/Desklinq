'use client'

import React, { FC, useEffect, useMemo, useState } from 'react'
import StayCard2 from '@/components/StayCard2'
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import PrevBtn from '@/components/PrevBtn'
import NextBtn from '@/components/NextBtn'
import Heading from '@/shared/Heading'

import {
  OfferingType,
  PropertiesDataType,
  offeringsListingType,
} from '@/type/propertiesTypes'
import ButtonPrimary from '@/shared/ButtonPrimary'
import {
  updatePrimaryFilter,
  updateSecondaryFilter,
} from '@/redux/filters/filterSlice'
import { fetchListing } from '@/redux/listing/listingSlice'

export interface SectionGridHasMapProps {}

const SectionGridHasMap: FC<SectionGridHasMapProps> = () => {
  const [showFullMapFixed, setShowFullMapFixed] = useState(false)

  const [zoom, setZoom] = useState(10)
  const dispatch = useAppDispatch()
  const filterRadius = useAppSelector(
    (state: any) => state.filter.secondaryFilter.radius
  )
  const [center, setCenter] = useState({
    lat: 12.922186999999994,
    lng: 77.66956199999998,
  })
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  })
  const radius =
    (156543.03392 * Math.cos((center.lat * Math.PI) / 180)) / Math.pow(2, zoom)

  useEffect(() => {
    // const center = { lat: centerLat, lng: centerLng };
    if (radius && showFullMapFixed) {
      dispatch(updatePrimaryFilter({ coordinates: [center.lng, center.lat] }))
      dispatch(updateSecondaryFilter({ radius: radius }))
      // dispatch(fetchListing())
    }
  }, [radius, zoom, dispatch, filterRadius])

  useEffect(() => {
    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords
        setLocation({ latitude, longitude })
      })
    }
  }, [])
  const [offering, setOffering] = useState<offeringsListingType[]>([])
  const fetchApiData = async ({
    latitude,
    longitude,
  }: {
    latitude: number
    longitude: number
  }) => {
    const res = await fetch(
      `https://api-dev.desklinq.com/v1/offerings/filter?latitude=${latitude}&longitude=${longitude}&space=MEETING_ROOMS`
    )
    const res1 = await fetch(
      `https://api-dev.desklinq.com/v1/offerings/filter?latitude=${latitude}&longitude=${longitude}`
    )

    const data = await res.json()
    const data1 = await res1.json()
    const mergedData = []
    const minLength = Math.min(data.data.length, data1.data.length)
    for (let i = 0; i < minLength; i++) {
      mergedData.push(data.data[i])
      mergedData.push(data1.data[i])
    }
    const remainingData = data.data
      .slice(minLength)
      .concat(data1.data.slice(minLength))
    const finalData = mergedData.concat(remainingData)
    setOffering(finalData)
  }
  const offerings: offeringsListingType[] = offering
  fetchApiData(location)

  // console.log(location);

  dispatch(fetchListing())

  // const offerings: offeringsListingType[] = useAppSelector(
  //   (state: any) => state.listing?.data
  // )
  // console.log(offerings);

  const [currentIndex, setCurrentIndex] = useState(0) // Current index for slider

  // Function to handle changing the current index
  const changeItemId = (index: any) => {
    setCurrentIndex(index)
  }

  // ...

  const [numberOfItems, setNumberOfItems] = useState(3)
  // if (typeof window !== 'undefined')
  // console.log(window.innerWidth)

  useEffect(() => {
    const updateNumberOfItems = () => {
      if (typeof window !== 'undefined') {
        const windowWidth = window.innerWidth
        let newNumberOfItems = 1
        if (windowWidth >= 320 && windowWidth < 500) {
          newNumberOfItems = 2 // Show 2 items for smaller screens
        } else if (windowWidth >= 500 && windowWidth < 1024) {
          newNumberOfItems = 3 // Show 3 items for medium screens
        } else if (windowWidth >= 1024 && windowWidth < 1280) {
          newNumberOfItems = 4 // Show 4 items for large screens
        } else if (windowWidth >= 1280) {
          newNumberOfItems = 5 // Show 5 items for extra-large screens
        }
        setNumberOfItems(newNumberOfItems)
      }
    }

    // Run once to set initial value
    updateNumberOfItems()

    // Set up event listener to update value whenever the window is resized
    window.addEventListener('resize', updateNumberOfItems)

    // Clean up event listener when component unmounts
    return () => window.removeEventListener('resize', updateNumberOfItems)
  }, [])

  // ...

  // console.log(numberOfItems)
  const start = currentIndex * numberOfItems
  const end = Math.min(start + numberOfItems, offerings.length)
  const visibleOfferings = offerings.slice(start, end)
  // console.log(visibleOfferings)

  return (
    <div>
      <Heading desc={''}>{'The Hot Desk and Meeting Room Near You'}</Heading>

      <div className="w-full max-w-[1184px] flex-shrink-0 xl:px-8">
        <MotionConfig
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          <div className="relative flow-root">
            <motion.div
              className="flow-root overflow-hidden rounded-xl"
              initial={false}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                position: 'relative',
              }}
            >
              <motion.ul
                initial={false}
                className="relative whitespace-nowrap"
                style={{
                  display: 'flex',
                  padding: 0,
                  margin: 0,
                  width: '100%',
                  overflow: 'hidden',
                }}
              >
                <AnimatePresence initial={false}>
                  {offerings.map((item, indx) => (
                    <motion.li
                      className="relative inline-block"
                      initial={{
                        x: `${(currentIndex - 1) * -100}%`,
                      }}
                      animate={{
                        x: `${currentIndex * -100}%`,
                      }}
                      key={indx}
                      style={{
                        width: `${100 / numberOfItems}%`,
                        minWidth: `${100 / numberOfItems}%`, // Ensure each card covers at least 25% of the width
                      }}
                    >
                      <StayCard2 data={item} className="mx-4" />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>

              {currentIndex > 0 && (
                <PrevBtn
                  onClick={() => changeItemId(currentIndex - 1)}
                  className="h-9 w-9 absolute left-0 top-1/2 transform -translate-y-1/2 z-[1]"
                />
              )}

              {currentIndex < offerings.length - numberOfItems && (
                <NextBtn
                  onClick={() => changeItemId(currentIndex + 1)}
                  className="h-9 w-9 absolute right-0 top-1/2 transform -translate-y-1/2 z-[1]"
                />
              )}
            </motion.div>
          </div>
        </MotionConfig>
      </div>
    </div>
  )
}
export default SectionGridHasMap
