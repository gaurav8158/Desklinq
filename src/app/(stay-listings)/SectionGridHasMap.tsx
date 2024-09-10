'use client'

import React, { FC, use, useEffect, useState } from 'react'
import AnyReactComponent from '@/components/AnyReactComponent/AnyReactComponent'
import GoogleMapReact from 'google-map-react'
import ButtonClose from '@/shared/ButtonClose'
import TabFilters from './TabFilters'
import Heading2 from '@/shared/Heading2'
import StayCard2 from '@/components/StayCard2'
import { useAppDispatch, useAppSelector } from '@/redux/app/hooks'
import { offeringsListingType } from '@/type/propertiesTypes'
import ButtonPrimary from '@/shared/ButtonPrimary'
import {
  updatePrimaryFilter,
  updateSecondaryFilter,
} from '@/redux/filters/filterSlice'
import { fetchListing } from '@/redux/listing/listingSlice'
import EmptyStateImage from '@/images/empty.svg'
import Image, { StaticImageData } from 'next/image'
import Heading from '@/shared/Heading'
import { TaxonomyType } from '@/data/types'
import HeroSearchFormSmall from '../(client-components)/(HeroSearchFormSmall)/HeroSearchFormSmall'
import Faq from '@/components/Faq'
import CallToAction from '@/components/CallToAction'

export interface SectionGridHasMapProps {
  params: 'hot-desk' | 'meeting-rooms' | 'virtual-offices'
}

const helper = (params: 'hot-desk' | 'meeting-rooms' | 'virtual-offices') => {
  console.log(params)
  if (params === 'hot-desk') {
    return 'Hot desk'
  } else if (params === 'meeting-rooms') {
    return 'Meeting rooms'
  } else if (params === 'virtual-offices') {
    return 'Virtual office'
  }
}

const SectionGridHasMap: FC<SectionGridHasMapProps> = ({ params }) => {
  const [currentHoverID, setCurrentHoverID] = useState<string | number>(-1)
  const [showFullMapFixed, setShowFullMapFixed] = useState(false)
  const [zoom, setZoom] = useState(10)
  const [activeTab, setActiveTab] = useState('Hot Desks')

  const tabs = [
    'Hot desk',
    'Co-working Space',
    'Private Offices',
    'Meeting rooms',
    'Virtual Address',
  ]
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
      name: 'Co-working Space',
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
      name: 'Private Offices',
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
      id: '9',
      href: '#',
      name: 'Private Offices',
      desc: 'This is a studio',
      taxonomy: 'category',
    },
    {
      id: '7',
      href: '#',
      name: 'Virtual Office',
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
  ]

  const dispatch = useAppDispatch()
  const filterRadius = useAppSelector(
    (state: any) => state.filter.secondaryFilter.radius
  )
  const primaryFilter = useAppSelector(
    (state: any) => state.filter.primaryFilter
  )

  const [center, setCenter] = useState({
    lat: 12.922186999999994,
    lng: 77.66956199999998,
  })
  const radius =
    (156543.03392 * Math.cos((center.lat * Math.PI) / 180)) / Math.pow(2, zoom)

  useEffect(() => {
    console.log(helper(params))
    dispatch(updatePrimaryFilter({ space: helper(params) }))
    dispatch(fetchListing())
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showMore = () => {
    dispatch(updatePrimaryFilter({ page: primaryFilter.page + 1 }))
    dispatch(fetchListing())
  }

  useEffect(() => {
    if (radius && showFullMapFixed) {
      dispatch(updatePrimaryFilter({ coordinates: [center.lng, center.lat] }))
      dispatch(updateSecondaryFilter({ radius: radius }))
      dispatch(fetchListing())
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radius, zoom, dispatch, showMore, primaryFilter.page, filterRadius])

  const offerings: offeringsListingType[] = useAppSelector(
    (state: any) => state.listing?.data
  )
  console.log(primaryFilter)
  return (
    <div>
      <div className="mt-8">
        <Heading desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ">
          Spaces near you
        </Heading>
        {/* <div className="flex justify-center items-center">
          {DEMO_CATS.map((tab) => (
            <button
              key={tab.id}
              // onClick={() => setActiveTab(tab)}
              className={`px-4 py-2  border ${
                primaryFilter.space === tab.name
                  ? 'bg-[#6115E7] bg-opacity-[10%] text-[#6115E7] border-[#6115E7]'
                  : 'text-gray-700 border-gray-300 hover:bg-gray-50'
              } transition-colors duration-200`}
            >
              {tab.name}
            </button>
          ))}
        </div> */}
        <div className="top-[300px] w-full lg:w-[800px] left-0 right-0 z-10 m-auto">
          <HeroSearchFormSmall />
        </div>
        {/* <Heading2
          className="!my-8 "
          numOfListing={offerings?.length}
          capacity={primaryFilter?.minCapacity}
          heading={`${primaryFilter?.space}`}
          fromDate={primaryFilter?.dateTime?.fromDate}
          toDate={primaryFilter?.dateTime?.toDate}
        /> */}

        <div className="mb-8 lg:mb-11 mt-10">
          <TabFilters />
        </div>
      </div>
      <div className="relative flex min-h-screen">
        <div className="min-h-screen w-full xl:w-[60%] 2xl:w-[60%] max-w-[1184px] flex-shrink-0 xl:px-8 ">
          {offerings?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 2xl:gap-x-6 gap-y-8">
                {offerings.map((item: offeringsListingType) => (
                  <div
                    key={item._id}
                    onMouseEnter={() => setCurrentHoverID(item._id)}
                    onMouseLeave={() => setCurrentHoverID(-1)}
                  >
                    <StayCard2 data={item} />
                  </div>
                ))}
              </div>
              {offerings.length % 12 === 0 && (
                <div className="w-full mt-8 lg:mt-11 flex items-center">
                  <ButtonPrimary className="mx-auto" onClick={showMore}>
                    Show me more
                  </ButtonPrimary>
                </div>
              )}
            </>
          ) : (
            <div className="flex mt-16 justify-center items-center">
              {offerings?.length > 0 ? (
                // <ButtonPrimary>Show me more</ButtonPrimary>
                <></>
              ) : (
                <div className="flex flex-col text-center w-full mb-20">
                  <Image
                    alt="Empty state image"
                    className="max-w-[180px] mx-auto my-20"
                    src={EmptyStateImage}
                  ></Image>
                  <h2 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-indigo-500">
                    No matching spaces
                  </h2>
                  <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                    We couldn’t find any spaces that matched your search. <br />
                    You might have more luck if you update your criteria.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {!showFullMapFixed && (
          <div
            className={`flex xl:hidden items-center justify-center fixed bottom-16 md:bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-neutral-900 text-white shadow-2xl rounded-full z-30  space-x-3 text-sm cursor-pointer`}
            onClick={() => setShowFullMapFixed(true)}
          >
            <i className="text-lg las la-map"></i>
            <span>Show map</span>
          </div>
        )}

        <div
          className={`xl:flex-1 xl:static xl:block ${
            showFullMapFixed ? 'fixed inset-0 z-50' : 'hidden'
          }`}
        >
          {showFullMapFixed && (
            <ButtonClose
              onClick={() => setShowFullMapFixed(false)}
              className="bg-white absolute z-50 left-3 top-3 shadow-lg rounded-xl w-10 h-10"
            />
          )}

          <div className="fixed xl:sticky top-0 xl:top-[88px] left-0 w-full h-full xl:h-[calc(100vh-88px)] rounded-md overflow-hidden">
            <GoogleMapReact
              defaultZoom={12}
              defaultCenter={{
                lat: 12.922187,
                lng: 77.669562,
              }}
              center={{
                lat: primaryFilter.coordinates[1],
                lng: primaryFilter.coordinates[0],
              }}
              bootstrapURLKeys={{
                key: 'AIzaSyBB4ACnJ7RDVATSfznyI0Z5Lxn4Rjdmjvk',
              }}
              yesIWantToUseGoogleMapApiInternals
              onChange={(e) => {
                setZoom(e.zoom)
                setCenter(e.center)
              }}
            >
              {
                <AnyReactComponent
                  lat={primaryFilter.coordinates[1]}
                  lng={primaryFilter.coordinates[0]}
                  userAvtar={true}
                />
              }
              {offerings.length > 0 &&
                offerings?.map((item: offeringsListingType) => {
                  return (
                    <AnyReactComponent
                      isSelected={currentHoverID === item._id}
                      key={item._id}
                      lat={item.address.location.coordinates[1]}
                      lng={item.address.location.coordinates[0]}
                      listing={item}
                    />
                  )
                })}
            </GoogleMapReact>
          </div>
        </div>
      </div>

      <div className="relative py-16">
        <Faq page="" />
        <div className="py-8">
          <CallToAction />
        </div>
      </div>
    </div>
  )
}

export default SectionGridHasMap
