import React, { FC } from 'react'
import BgGlassmorphism from '@/components/BgGlassmorphism'

export interface PageAboutProps {}

const PageAbout: FC<PageAboutProps> = ({}) => {
  return (
    <div className={`nc-PageAbout overflow-hidden relative`}>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <div className={` relative`}>
          <div className="flex">
            <div className="w-screen space-y-5 lg:space-y-7 lg:space-x-10">
              <h2 className="text-3xl !leading-tight font-semibold text-neutral-900 md:text-4xl xl:text-5xl dark:text-neutral-100">
                👋 About Us.
              </h2>
              <span className="block text-base xl:text-lg text-neutral-6000 dark:text-neutral-400">
                <p>Access workspaces, Instantly .</p>
                <br />
                <p>
                  Discover, book, and enjoy coworking spaces and meeting rooms
                  worldwide with ease. Find diverse options, from independent
                  spots to renowned brands, all on our platform. Search by
                  location, price, and amenities, and book instantly for any
                  duration. Embrace flexible, commitment-free coworking.
                </p>
                <br />
                <p>
                  Our journey into the world of flexible workspaces began back
                  in 2015 when we embarked on our co-working venture right here
                  in the vibrant city of Bangalore, India. Over the years,
                  we&apos;ve expanded our footprint by embracing diverse
                  engagement models with landlords, including Lease, Joint
                  Venture, Partnership, and Build-Operate-Transfer (BoT).
                </p>
                <br />
                <p>
                  Through this incredible journey, we&apos;ve gained a deep
                  understanding of a fundamental truth: the workspace landscape
                  is evolving at a remarkable pace, and it&apos;s intricately
                  tied to the dynamic transformations happening within the
                  workforce itself.
                </p>
                <br />
                <p>
                  This recognition has fueled our commitment to continually
                  adapt and innovate. We&apos;ve observed the ever-changing
                  needs of professionals and businesses, and we&apos;ve made it
                  our mission to evolve alongside them. As the workspace
                  ecosystem continues to evolve, we remain dedicated to
                  providing flexible, tailored solutions that empower our
                  clients to thrive in this dynamic environment.
                </p>
                <br />
                <p>
                  Our journey is far from over, and we&apos;re excited to have
                  our partners & user’s alongside us as we navigate the
                  ever-shifting terrain of the modern work world.
                </p>
              </span>
            </div>
          </div>
        </div>
        {/* <SectionFounder />
         <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div> */}
      </div>
    </div>
  )
}

export default PageAbout
