import React from 'react'
import SectionGridHasMap from '../(stay-listings)/SectionGridHasMap'

const page = ({
  params,
  searchParams,
}: {
  params: { space: 'hot-desk' | 'meeting-rooms' | 'virtual-offices' }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  console.log(params.space)

  if (!params.space) {
    return null
  }

  return (
    <div className="container pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
      <SectionGridHasMap params={params.space} />
    </div>
  )
}

export default page
