'use client'

import React, { FC, useContext, useReducer, useState } from 'react'
import imagePng from '@/images/photo-1604328698692-f76ea9498e76.avif'
import Image from 'next/image'
import ButtonPrimary from '@/shared/ButtonPrimary'
import { SearchContext } from '../layout'
import { useWindowSize } from 'react-use'
import { Button } from '@mui/material'
import { Armchair, Laptop, WifiHigh, UsersThree } from 'phosphor-react'
import HeroSearchFormSmall from '../(client-components)/(HeroSearchFormSmall)/HeroSearchFormSmall'
import { useSwipeable } from 'react-swipeable'

export interface SectionHero3Props {
  className?: string
}
const MyHeroImages = [
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2301&q=80',
  'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
  'https://images.unsplash.com/photo-1489769002049-ccd828976a6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3461&q=80',
  'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80',
  'https://images.unsplash.com/photo-1600508773950-d522f5bb7606?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
  'https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
  'https://images.unsplash.com/photo-1519155031214-e8d583928bf2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
]
function getHeroImage() {
  const HeroImages = [
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2301&q=80',
    'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
    'https://images.unsplash.com/photo-1489769002049-ccd828976a6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3461&q=80',
    'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80',
    'https://images.unsplash.com/photo-1600508773950-d522f5bb7606?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
    'https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
    'https://images.unsplash.com/photo-1519155031214-e8d583928bf2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80',
  ]
  const randomIndex = Math.floor(Math.random() * HeroImages.length)
  return HeroImages[randomIndex]
}
const icons = [
  { Component: WifiHigh, className: 'text-purple-600' },
  { Component: Laptop, className: 'text-purple-600' },
  { Component: Armchair, className: 'text-purple-600' },
  { Component: UsersThree, className: 'text-purple-600' },
]

const radius = 410 // Adjust radius for the circle

const SectionHero3: FC<SectionHero3Props> = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const { state, dispatch } = useContext(SearchContext)!
  const windowWidth = useWindowSize().width
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
  })

  const handleSwipe = (direction: string) => {
    if (direction === 'left') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % MyHeroImages.length)
    } else {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + MyHeroImages.length) % MyHeroImages.length
      )
    }
  }
  return (
    // <div
    //   className={`nc-SectionHero3 relative ${className}`}
    //   data-nc-id="SectionHero3"
    // >
    //   <div className="absolute z-10 inset-x-0 top-[10%] sm:top-[25%] text-center flex flex-col items-center max-w-8xl mx-auto space-y-4 lg:space-y-5 xl:space-y-6">
    //     <h2 className="font-bold text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !leading-[115%] ">
    //       Explore. Reserve. Collaborate.
    //     </h2>

    //     <span className="sm:text-lg md:text-xl font-semibold text-neutral-900">
    //       Your Instant Gateway to Dynamic Workspaces!
    //     </span>
    //     {windowWidth >= 1024 && (
    //       <ButtonPrimary
    //         onClick={() => dispatch({ type: 'show' })}
    //         sizeClass="px-6 py-3 lg:px-8 lg:py-4 rounded-xl"
    //         fontSize="text-sm sm:text-base lg:text-lg font-medium"
    //       >
    //         Explore now
    //       </ButtonPrimary>
    //     )}
    //     {windowWidth >= 1024 && (
    //       <div className="animated-text width-full  md:block sm:hidden sm:text-sm md:text-md font-medium ">
    //         Day Pass <span className="px-2">|</span> Meeting Room{' '}
    //         <span className="px-2">|</span> Private Workspace{' '}
    //         <span className="px-2">|</span> Virtual Office
    //       </div>
    //     )}

    //     {/* <div className="lg:block sm:hidden"> */}
    //     {/* <ButtonPrimary
    //         onClick={() => dispatch({ type: "show" })}
    //         sizeClass="px-6 py-3 lg:px-8 lg:py-4 rounded-xl"
    //         fontSize="text-sm sm:text-base lg:text-lg font-medium"
    //       >
    //         Explore now
    //       </ButtonPrimary> */}
    //     {/* </div> */}
    //   </div>
    //   <div className="relative aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3 lg:aspect-w-16 lg:aspect-h-9 xl:aspect-h-8 backdrop">
    //     <Image
    //       fill={true}
    //       className="absolute inset-0 object-cover rounded-xl"
    //       src={getHeroImage()}
    //       alt="hero"
    //       priority
    //     />
    //   </div>
    // </div>

    // <div className="relative bg-white py-16 overflow-hidden">
    //   <div className="absolute inset-0 overflow-hidden flex justify-center items-center">
    //     <div className="w-[120%] h-[400px] bg-purple-50 rounded-full transform translate-y-1/2"></div>
    //   </div>
    //   <div className="relative z-10 text-center">
    //   <h2 className="text-4xl font-bold mb-4 text-purple-900">
    //     Find Your Perfect Working Spot
    //   </h2>
    //   <p className="text-gray-600 mb-12 mx-auto max-w-xl">
    //     Located in traditional office buildings, these modern offices with meeting rooms
    //     can be booked by the day - and in less than a minute!
    //   </p>
    // </div>
    //   <div className="relative z-10 flex justify-center space-x-12 mt-8">
    //     <div className="bg-white p-3 rounded-full shadow-md">
    //       <Armchair size={32} className="text-purple-600" />
    //     </div>
    //     <div className="bg-white p-3 rounded-full shadow-md">
    //       <WifiHigh size={32} className="text-purple-600" />
    //     </div>
    //     <div className="bg-white p-3 rounded-full shadow-md">
    //       <Laptop size={32} className="text-purple-600" />
    //     </div>
    //     <div className="bg-white p-3 rounded-full shadow-md">
    //       <UsersThree size={32} className="text-purple-600" />
    //     </div>
    //   </div>
    // </div>

    <div className="relative w-full h-full min-h-screen overflow-hidden">
      <div
        className="hidden lg:block  lg:relative   -z-30 "
        style={{
          width: '1109px',
          height: '1109px',
          left: 'calc(50% - 1109px / 2 + 0.5px)',
          top: 'calc(50% - 1109px / 2 + 144.5px)',
          background:
            'linear-gradient(180deg, #F5F0FF 0%, rgba(245, 240, 255, 0) 50%)',
          opacity: 0.7,
          borderRadius: '50%', // Ensures the shape is a circle
        }}
      ></div>
      <div className="hidden lg:block   lg:absolute w-full z-10 top-0 left-0 right-0 h-96">
        <div className="absolute w-full h-full flex justify-center items-center">
          {icons.map(({ Component, className }, index) => {
            const angle = (Math.PI / (icons.length - 1)) * index // Calculate angle for each icon
            let y = 0
            if (Component === Laptop || Component === Armchair) {
              y = radius * Math.sin(angle) - 200 // Y coordinate
            } else {
              y = radius * Math.sin(angle) // Y coordinate
            }
            const x = radius * Math.cos(angle) // X coordinate

            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  transform: `translate(${x}px, ${-y}px)`, // Use negative y for upper half-circle
                }}
                className="bg-white p-3 rounded-full shadow-md"
              >
                <Component size={32} className={className} />
              </div>
            )
          })}
        </div>
      </div>
      {/* Add your hero content here */}
      <div className="relative lg:absolute top-0 w-full  z-10 m-auto">
        <div className="text-center max-w-[700px] m-auto lg:mt-20 p-8">
          <h1 className="text-5xl text-start lg:text-center font-bold ">
            {' '}
            Find Your Perfect Working Spot
          </h1>
          <p className="mt-4 text-lg text-start lg:text-center text-gray-700">
            Located in traditional office buildings, these modern offices with
            meeting rooms can be booked by the day - and in less than a minute!
          </p>
        </div>
      </div>
      <div className="static  lg:absolute top-[300px] w-full lg:w-[800px] left-0 right-0 z-10 m-auto">
        <HeroSearchFormSmall />
      </div>

      {/* <div
        {...handlers}
        className="static   mt-4 lg:mt-0 lg:absolute top-[500px] left-0 right-0 z-10 m-auto overflow-hidden rounded-lg max-w-full"
      >
        <div
          className="flex w-full transition-transform ease-out duration-300"
          style={{
            transform: `translateX(-${
              currentIndex * (100 / MyHeroImages.length)
            }%)`,
          }}
        >
          {MyHeroImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full md:w-1/4"
              style={{ width: '100%', flexBasis: '100%' }}
            >
              <Image
                src={image}
                alt={`Slide ${index}`}
                layout="responsive"
                width={200}
                height={400}
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  )
}

export default SectionHero3
