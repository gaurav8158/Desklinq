import React, { FC, Suspense } from 'react'
import { USER_URL } from '@/service/apiConfig'
import ImageSecton from './(components)/ImageSecton'
import HeroSection from './(components)/HeroSection'
import PricingSection from './(components)/PricingSection'
import LocationSection from './(components)/LocationSection'
import DescriptionSection from './(components)/DescriptionSection'
import AmenitiesSection from './(components)/AmenitiesSection'
import OtherSection from './(components)/OtherSection'
import PropertyInfoSection from './(components)/PropertyInfoSection'
import SideBarSection from './(components)/SideBarSection'
import { Metadata } from 'next'
import insideimg from '../../../../public/images/homeicon.svg'
import Image from 'next/image'
import Faq from '@/components/Faq'
import CallToAction from '@/components/CallToAction'
type Props = {
  params: { slug: string }
}

const getData = async (id: string) => {
  const response = await fetch(`${USER_URL}/offerings/offeringDetails/${id}`)
  const data = await response.json()
  return data
}

export default async function Page({ params }: Props) {
  const { slug } = params

  const { data: Offering } = await getData(slug)

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        {/* @ts-ignore Server Component */}
        <div className="container nc-ListingStayDetailPage lg:mb-28 lg:mt-10">
          <ImageSecton offerings={Offering} />
          <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
            <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
              <HeroSection offerings={Offering} />
              <PricingSection pricing={Offering?.pricing} />
              <div className="max-w-6xl mx-auto    bg-[#FAFAFC] shadow-md rounded-lg p-2 flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 p-4 lg:px-4">
                  <h2 className="text-2xl font-bold mb-4 text-black">
                    Visit our Property!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt
                  </p>
                  <button className="bg-[#6115E7] px-6 py-2 rounded-full text-white text-sm">
                    Schedule a Visit
                  </button>
                </div>
                <div className="w-full lg:w-1/2 h-[200px] overflow-hidden flex justify-center items-center">
                  {/* Replace this with your SVG or image */}
                  <Image alt="insideimg" src={insideimg} />
                </div>
              </div>
              <AmenitiesSection
                amenities={Offering?.property?.amenities}
                heading="Property Amenities"
                description="About the property's amenities and services"
              />
              <OtherSection offerings={Offering} />
              <LocationSection address={Offering?.address} />
              {/* <DescriptionSection description={Offering?.description} /> */}
              {/* <AmenitiesSection
                amenities={Offering?.amenities}
                heading="Offering Amenities"
                description="About the space's amenities and services"
              />

              <PropertyInfoSection property={Offering?.property} /> */}
              <SideBarSection
                device="Mobile"
                offering={Offering}
                openingHours={Offering?.property?.openingHours}
              />
            </div>
            <div className="hidden lg:block flex-grow mt-14 lg:mt-0 ">
              <div className="top-28">
                <SideBarSection
                  device="Desktop"
                  offering={Offering}
                  openingHours={Offering?.property?.openingHours}
                />
              </div>
            </div>
          </main>
          <div className="relative py-16">
            <Faq page="" />
            <div className="py-8">
              <CallToAction />
            </div>
          </div>
        </div>
      </Suspense>
    </>
  )
}

// export async function generateMetadata(
//   { params  }: Props): Promise<Metadata> {
//   const id = params.id

//   const { data }  = await getData(id)

//   console.log(data)

//   return {
//     title: `${data.name} | Desklinq`,
//     keywords: data.type,
//     description: data.description,
//     // openGraph: {
//     //   type: 'website',
//     //   title:  `${data.name} | Desklinq`,
//     //   description: data.description,
//     //   images: [
//     //     ...data.images,
//     //   ],
//     // },
//   }
// }
