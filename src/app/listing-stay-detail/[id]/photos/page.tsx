'use client'

import BackgroundSection from '@/components/BackgroundSection'
import ListingImageGallery from '@/components/listing-image-gallery/ListingImageGallery'
import SectionSliderNewCategories from '@/components/SectionSliderNewCategories'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'
import MobileFooterSticky from '@/app/(listing-detail)/(components)/MobileFooterSticky'
import userService from '@/service/user.service'

type Props = {
  params: { id: string }
}

const DetailtLayout: FC<Props> = ({ params }) => {
  const { id } = params

  const router = useRouter()
  const searchParams = useSearchParams()
  const modal = searchParams?.get('modal')

  console.log(searchParams)

  const handleCloseModalImageGallery = () => {
    let params = new URLSearchParams(document.location.search)
    params.delete('modal')
    // router.push(`/listing-stay-detail/${id}`)
  }
  const [image, setImage] = useState<string[] | undefined>()

  useEffect(() => {
    ;(async () => {
      try {
        const response = await userService.get(`offerings/${id}`)
        const images = response.data.images
        setImage(images)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [id])

  if (image === undefined || image === null) {
    return null
  }
  return (
    <div className="ListingDetailPage ">
      <ListingImageGallery
        isShowModal={modal === 'PHOTO_TOUR_SCROLLABLE'}
        onClose={handleCloseModalImageGallery}
        images={image}
      />
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
      </div>
      <MobileFooterSticky />
    </div>
  )
}

export default DetailtLayout
