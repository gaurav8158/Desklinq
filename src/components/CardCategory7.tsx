import React, { FC, useEffect, useState } from 'react'
import { TaxonomyType } from '@/data/types'
import Link from 'next/link'
import Image from 'next/image'
import dailyHunt from '@/images/MediaImage/dailyHunt.png'
import wowentrepreneurs from '@/images/MediaImage/Wow-Entrepreneurs-Logo-PNG.png'
import deccanBusiness from '@/images/MediaImage/Deccan-Business-PNG-300x104.png'
import businessRepublicNewsIndia from '@/images/MediaImage/cropped-Republic-News-India-Business-Logo-PNG-2.png'
import theIndianBulletin from '@/images/MediaImage/cropped-The-Indian-Bulletin-Business-PNG.png'
import theStartupStory from '@/images/MediaImage/thestartupstory.jpg'
import startupInsider from '@/images/MediaImage/startupinsider.jpg'
import outlook from '@/images/MediaImage/outlook.png'
export interface CardCategory7Props {
  className?: string
  taxonomy: TaxonomyType
}

const CardCategory7: FC<CardCategory7Props> = ({
  className = '',
  taxonomy,
}) => {
  const { name, logoUrl, readMoreUrl, desc = '' } = taxonomy
  const [truncatedName, setTruncatedName] = useState('')
  const [truncatedDesc, setTruncatedDesc] = useState('')

  useEffect(() => {
    const truncateText = (text: string, maxWords: number) => {
      const words = text.split(' ')
      if (words.length > maxWords) {
        return words.slice(0, maxWords).join(' ') + '...'
      }
      return text
    }

    setTruncatedName(truncateText(name, 5))
    setTruncatedDesc(truncateText(desc, 15))
  }, [name, desc])

  const getImage = (imageName: string) => {
    switch (imageName) {
      case 'dailyhunt':
        return dailyHunt
      case 'wowentrepreneurs':
        return wowentrepreneurs
      case 'deccanBusiness':
        return deccanBusiness
      case 'businessRepublicNewsIndia':
        return businessRepublicNewsIndia
      case 'theIndianBulletin':
        return theIndianBulletin
      case 'theStartupStory':
        return theStartupStory
      case 'startupInsider':
        return startupInsider
      case 'outlook':
        return outlook
      default:
        return ''
    }
  }

  return (
    // <div className="max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">

    <Link href={readMoreUrl || '#'} passHref={true} target="_blank">
      <div className="bg-white h-[12vh] relative p-[1vw] mx-[1vw] mt-[1.5vh] rounded-md border border-gray-400 shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <Image
          src={getImage(logoUrl || '')}
          alt="Logo"
          className="object-contain rounded-lg"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </Link>
  )
}

export default CardCategory7
