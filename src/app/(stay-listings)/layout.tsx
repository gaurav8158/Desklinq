'use client'
import BackgroundSection from '@/components/BackgroundSection'
import BgGlassmorphism from '@/components/BgGlassmorphism'
import CallToAction from '@/components/CallToAction'
import Faq from '@/components/Faq'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`nc-ListingStayPage relative `}>
      <BgGlassmorphism />

      {children}

      <div className="container overflow-hidden">
        {/* SECTION 1 */}
      
          {/* <BackgroundSection /> */}
          {/* <SectionSliderNewCategories
            heading="Explore by types of offerings"
            subHeading="Explore by types of offerings Hot desk, Cabins, Meeting rooms, Virtual Offices"
            categoryCardType="card5"
            itemPerRow={4}
            sliderStyle="style2"
          /> */}
          
            {/* <div className="relative py-16">
          <Faq page="" />
          <div className="py-8">
            <CallToAction />
          </div>
        </div> */}

        {/* SECTION */}
        {/* <SectionSubscribe2 className="py-24 lg:py-28" /> */}

        {/* SECTION */}
        {/* <div className="relative py-16 mb-24 lg:mb-28">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div> */}
      </div>
    </div>
  )
}

export default Layout
