'use client'

import React, { FC, useEffect, useState } from 'react'
import { TaxonomyType } from '@/data/types'
import CardCategory3 from '@/components/CardCategory3'
import CardCategory4 from '@/components/CardCategory4'
import CardCategory5 from '@/components/CardCategory5'
import CardCategory7 from '@/components/CardCategory7'
import Heading from '@/shared/Heading'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import PrevBtn from './PrevBtn'
import NextBtn from './NextBtn'
import { variants } from '@/utils/animationVariants'
import { useWindowSize } from 'react-use'

export interface SectionSliderNewCategoriesProps {
  className?: string
  itemClassName?: string
  heading?: string
  subHeading?: string
  categories?: TaxonomyType[]
  categoryCardType?: 'card3' | 'card4' | 'card5' | 'card7'
  itemPerRow?: 3 | 4 | 5 | 6
  sliderStyle?: 'style1' | 'style2'
  maincategory?: string
}

const DEMO_CATS: TaxonomyType[] = [
  {
    id: '1',
    href: '/listing-stay-map',
    name: 'Hot desk',
    desc: 'Flexible workspace for the modern professional.',
    taxonomy: 'category',
    lat: 12.9715987,
    long: 77.5945627,
    offerings: 'yes',
    cities: null,
    count: 48,
    thumbnail:
      'https://image.shutterstock.com/z/stock-vector-business-man-entrepreneur-in-a-suit-working-at-his-office-desk-flat-style-modern-vector-394829347.jpg',
  },
  {
    id: '2',
    href: '/listing-stay-map',
    name: 'Meeting rooms',
    desc: 'Inspiring spaces to collaborate and connect.',
    taxonomy: 'category',
    lat: 12.9715987,
    long: 77.5945627,
    offerings: 'yes',
    cities: null,
    count: 36,
    thumbnail:
      'https://image.shutterstock.com/z/stock-vector-bosses-and-workers-are-meeting-in-the-conference-room-396348478.jpg',
  },
  {
    id: '3',
    href: '/#',
    name: 'Co-Study',
    desc: 'Inspiring spaces to collaborate and connect.',
    taxonomy: 'category',
    lat: 12.9715987,
    long: 77.5945627,
    offerings: 'yes',
    cities: null,
    count: 1,
    thumbnail:
      'https://image.shutterstock.com/z/stock-vector-young-student-discussion-about-business-project-teamwork-analysis-business-concept-hand-drawn-in-2174842669.jpg',
  },
  {
    id: '4',
    href: '#',
    name: 'Fashion Co-Lab (Coming soon)',
    desc: 'Collaborative Spaces for Fashion Entrepreneurs',
    taxonomy: 'category',
    count: 0,
    lat: 12.9715987,
    long: 77.5945627,
    offerings: 'yes',
    cities: null,
    thumbnail:
      'https://image.shutterstock.com/z/stock-vector-cute-young-woman-standing-in-front-of-hanger-rack-and-trying-to-choose-outfit-smiling-girl-in-1471851032.jpg',
  },
  {
    id: '5',
    href: '#',
    name: 'Music Hive (Coming soon)',
    desc: 'Collaborative Space for Artists and Content Creators',
    taxonomy: 'category',
    lat: 12.9715987,
    long: 77.5945627,
    offerings: 'yes',
    cities: null,
    count: 0,
    thumbnail:
      'https://image.shutterstock.com/z/stock-vector-music-studio-control-room-and-singer-booth-behind-glass-vector-cartoon-interior-with-sound-1674385738.jpg',
  },
  {
    id: '6',
    href: '#',
    name: 'Cabin (Coming soon)',
    desc: 'Your own private haven in a bustling community',
    taxonomy: 'category',
    lat: 12.9715987,
    long: 77.5945627,
    offerings: 'yes',
    cities: null,
    count: 0,
    thumbnail:
      'https://image.shutterstock.com/z/stock-vector-a-vector-illustration-of-an-office-that-ha-s-been-set-up-at-home-isometric-home-office-308435468.jpg',
  },
  {
    id: '7',
    href: '#',
    name: 'Virtual Office (Coming soon)',
    desc: 'Professional address, virtual presence',
    taxonomy: 'category',
    lat: 12.9715987,
    long: 77.5945627,
    offerings: 'yes',
    cities: null,
    count: 0,
    thumbnail:
      'https://image.shutterstock.com/z/stock-vector-isometric-business-data-analytics-process-management-or-intelligence-dashboard-on-virtual-screen-1176756661.jpg',
  },
  {
    id: '8',
    href: '#',
    name: 'Podcast (Coming soon)',
    desc: 'This is a podcast studio',
    taxonomy: 'category',
  },
  {
    id: '9',
    href: '#',
    name: 'Studio (Coming soon)',
    desc: 'This is a studio',
    taxonomy: 'category',
  },
]

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
  heading = 'Explore Spaces by Cities',
  subHeading = 'Explore meeting rooms, hotdesks and virtual offices',
  className = '',
  itemClassName = '',
  categories = DEMO_CATS,
  itemPerRow = 5,
  categoryCardType = 'card5',
  sliderStyle = 'style1',
  maincategory,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [numberOfItems, setNumberOfitem] = useState(0)
  const totalItems = categories.length
  const progressPercentage = ((currentIndex + numberOfItems) / totalItems) * 100
  console.log(progressPercentage)
  const windowWidth = useWindowSize().width
  useEffect(() => {
    // Calculate the number of items based on the window width
    let newNumberOfItems = 1
    if (windowWidth >= 320 && windowWidth < 500) {
      newNumberOfItems = 2 // Show 2 items for smaller screens
    } else if (windowWidth >= 500 && windowWidth < 1024) {
      newNumberOfItems = 3 // Show 3 items for medium screens
    } else if (windowWidth >= 1024 && windowWidth < 1280) {
      newNumberOfItems = 4 // Show 4 items for large screens
    } else if (windowWidth >= 1280) {
      newNumberOfItems = itemPerRow // Show itemPerRow items for extra-large screens
    }
    // Update the state with the new number of items
    setNumberOfitem(newNumberOfItems)
  }, [itemPerRow, windowWidth])

  function changeItemId(newVal: number) {
    if (newVal <= 0 || newVal >= totalItems) return
    if (newVal > currentIndex) {
      setDirection(1)
    } else {
      setDirection(-1)
    }
    setCurrentIndex(newVal)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentIndex < categories?.length - 1) {
        changeItemId(currentIndex + 1)
      }
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        changeItemId(currentIndex - 1)
      }
    },
    trackMouse: true,
  })

  const renderCard = (item: TaxonomyType) => {
    if (maincategory === 'city') {
      return <CardCategory3 taxonomy={item} />
    }

    switch (categoryCardType) {
      case 'card3':
        return <CardCategory3 taxonomy={item} />
      case 'card4':
        return <CardCategory4 taxonomy={item} />
      case 'card5':
        return <CardCategory5 taxonomy={item} />
      case 'card7':
        return <CardCategory7 taxonomy={item} />
      default:
        return <CardCategory3 taxonomy={item} />
    }
  }

  if (!numberOfItems) return null

  return (
    <div className={`nc-SectionSliderNewCategories ${className}`}>
      {/* <Heading desc={subHeading} isCenter={sliderStyle === 'style2'}>
          {heading}
        </Heading> */}
      <div className="w-full m-auto my-10 gap-4 flex-col items-center flex justify-center">
        <h3 className="md:text-3xl lg:text-4xl 2xl:text-5xl font-semibold">
          {maincategory
            ? 'Explore Spaces by Cities'
            : 'Explore by types of offerings'}
        </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </p>{' '}
      </div>
      <MotionConfig
        transition={{
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <div className={`relative flow-root`} {...handlers}>
          <div className={`flow-root overflow-hidden rounded-xl`}>
            <motion.ul
              initial={false}
              className="relative whitespace-nowrap -mx-2 xl:-mx-4"
            >
              <AnimatePresence initial={false} custom={direction}>
                {categories.map((item, indx) => (
                  <motion.li
                    className={`relative inline-block px-2 xl:px-4 ${itemClassName}`}
                    custom={direction}
                    initial={{
                      x: `${(currentIndex - 1) * -100}%`,
                    }}
                    animate={{
                      x: `${currentIndex * -100}%`,
                    }}
                    variants={variants(200, 1)}
                    key={indx}
                    style={{
                      width: `calc(1/${numberOfItems} * 100%)`,
                    }}
                  >
                    {renderCard(item)}
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>

          {/* {currentIndex ? (
            <PrevBtn
              style={{ transform: 'translate3d(0, 0, 0)' }}
              onClick={() => changeItemId(currentIndex - 1)}
              className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -left-3 xl:-left-6 top-1/3 -translate-y-1/2 z-[1]"
            />
          ) : null}

          {categories.length > currentIndex + numberOfItems ? (
            <NextBtn
              style={{ transform: 'translate3d(0, 0, 0)' }}
              onClick={() => changeItemId(currentIndex + 1)}
              className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute -right-3 xl:-right-6 top-1/3 -translate-y-1/2 z-[1]"
            />
          ) : null} */}

          <div className="flex w-full m-auto justify-center mt-4 items-center">
            <PrevBtn
              style={{
                transform: 'translate3d(0, 0, 0)',
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              }}
              onClick={() =>
                currentIndex > 0 && setCurrentIndex(currentIndex - 1)
              }
              className={`w-9 h-9 xl:w-12 xl:h-12 text-lg -left-3 xl:-left-6 top-1/3 -translate-y-1/2 z-[1] ${
                currentIndex === 0 ? 'opacity-50' : ''
              }`}
            />

            <div className="relative w-20 h-2 bg-gray-200 mx-4 rounded-full">
              <div
                className="absolute top-0 left-0 h-2 bg-purple-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            <NextBtn
              style={{
                transform: 'translate3d(0, 0, 0)',
                cursor:
                  totalItems <= currentIndex + numberOfItems
                    ? 'not-allowed'
                    : 'pointer',
              }}
              onClick={() =>
                totalItems > currentIndex + numberOfItems &&
                setCurrentIndex(currentIndex + 1)
              }
              className={`w-9 h-9 xl:w-12 xl:h-12 text-lg -right-3 xl:-right-6 top-1/3 -translate-y-1/2 z-[1] ${
                totalItems <= currentIndex + numberOfItems ? 'opacity-50' : ''
              }`}
            />
          </div>
        </div>
      </MotionConfig>
    </div>
  )
}

export default SectionSliderNewCategories
