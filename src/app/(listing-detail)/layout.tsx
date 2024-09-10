'use client'

import BackgroundSection from '@/components/BackgroundSection'
import ListingImageGallery, {
  getNewParam,
} from '@/components/listing-image-gallery/ListingImageGallery'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'
import MobileFooterSticky from './(components)/MobileFooterSticky'
import { Route } from 'next'
import userService from '@/service/user.service'
import { ImageType } from '@/type/propertiesTypes'
import { useAppSelector } from '@/redux/app/hooks'

const DetailtLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const thisPathname = usePathname()
  const searchParams = useSearchParams()
  const modal = searchParams?.get('modal')
  const redirectUrl: string = useAppSelector(
    (state) => state.userData.redirectURL
  )
  const propertyID = searchParams.get('propertyID')

  const handleCloseModalImageGallery = () => {
    let params = new URLSearchParams(document.location.search)
    params.delete('modal')
    router.push(`${redirectUrl}` as Route)
  }
  const [image, setImage] = useState<string[] | undefined>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.get(
          `offerings/${propertyID}`,
          {},
          {},
          false
        )
        const images = response.data.images
        setImage(images)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [propertyID])

  const getImageGalleryListing = () => {
    if (thisPathname?.includes('/listing-stay-detail')) {
      return image
    }
    return []
  }
  return (
    <div className="ListingDetailPage ">
      {/* <ListingImageGallery
        isShowModal={modal === 'PHOTO_TOUR_SCROLLABLE'}
        onClose={handleCloseModalImageGallery}
        images={getImageGalleryListing()}
      /> */}

      <div className="container ListingDetailPage__content">{children}</div>

      {/* OTHER SECTION */}
      <div className="container py-24 lg:py-32">
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
          />
        </div>
        {/* <SectionSubscribe2 className="pt-24 lg:pt-32" /> */}
      </div>

      {/* STICKY FOOTER MOBILE */}
      <MobileFooterSticky />
    </div>
  )
}

export default DetailtLayout
