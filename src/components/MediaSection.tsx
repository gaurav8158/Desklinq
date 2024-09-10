import Image, { StaticImageData } from 'next/image'
import space from '../../public/images/WCHIMG.png'
import Heading from '@/shared/Heading'
import { TaxonomyType } from '@/data/types'
import CardCategory7 from './CardCategory7'
import { FC } from 'react'

export interface CategoriesProps {
  categories: TaxonomyType[] // Ensure this matches the structure of your data
}
const MediaSection: FC<CategoriesProps> = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return <p>No categories available.</p> // Handle case where categories might be empty
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <Heading desc=" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt">
        The media has been talking about us!
      </Heading>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4  gap-8">
        {categories.map((item, index) => (
          <CardCategory7 key={index} taxonomy={item} />
        ))}
      </div>
    </div>
  )
}

export default MediaSection
