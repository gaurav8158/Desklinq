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

type Props = {
  params: { id: string }
}

const getData = async (id: string) => {
  const response = await fetch(`${USER_URL}/offerings/offeringDetails/${id}`)
  const data = await response.json()
  return data
}

export default async function Page({ params }: Props) {
  const { id } = params

  const { data: Offering } = await getData(id)

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
              <LocationSection address={Offering?.address} />
              <DescriptionSection description={Offering?.description} />
              <AmenitiesSection
                amenities={Offering?.amenities}
                heading="Offering Amenities"
                description="About the space's amenities and services"
              />
              <AmenitiesSection
                amenities={Offering?.property?.amenities}
                heading="Property Amenities"
                description="About the property's amenities and services"
              />
              <OtherSection offerings={Offering} />
              <PropertyInfoSection property={Offering?.property} />
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
