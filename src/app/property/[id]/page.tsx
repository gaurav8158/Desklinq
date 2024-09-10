import React from 'react'
import { USER_URL } from '@/service/apiConfig'
import ListingSection from '../(component)/ListingSection'
import SideBar from '../(component)/SideBar'

type Props = {
  params: { id: string }
}

const getData = async (id: string) => {
  const response = await fetch(`${USER_URL}/properties/${id}`)
  const data = await response.json()
  return data
}

export default async function Page({ params }: Props) {
  const { id } = params
  const { data } = await getData(id)

  return (
    <div className={`nc-AuthorPage `}>
      <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
        <div className="block flex-grow mb-24 lg:mb-0">
          <div className="lg:sticky lg:top-24">
            <SideBar property={data} />
          </div>
        </div>
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
          <ListingSection property={data} />
        </div>
      </main>
    </div>
  )
}
