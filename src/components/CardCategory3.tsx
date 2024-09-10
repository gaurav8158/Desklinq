import React, { FC } from 'react'
import { TaxonomyType } from '@/data/types'
import convertNumbThousand from '@/utils/convertNumbThousand'
import Link from 'next/link'
import Image from 'next/image'
import { Route } from 'next'
import { Gurgaon } from '@/images/city'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined'
export interface CardCategory3Props {
  className?: string
  taxonomy: TaxonomyType
}

const CardCategory3: FC<CardCategory3Props> = ({
  className = '',
  taxonomy,
}) => {
  const { count, name, desc, href = '/', thumbnail } = taxonomy
  return (
    // <Link
    //   href={href as Route}
    //   className={`nc-CardCategory3 flex flex-col ${className}`}
    // >
    //   <div
    //     className={`flex-shrink-4  relative w-full aspect-w-10 aspect-h-10 sm:aspect-h-6 h-0 rounded-2xl overflow-hidden group`}
    //   >
    //     <Image
    //       src={thumbnail || ''}
    //       className="object-cover  w-10 h-10 rounded-2xl"
    //       alt="places"
    //       fill
    //       // sizes="(max-width: 400px) 100vw, 300px"
    //     />
    //     <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
    //   </div>
    //   <div className="mt-4 truncate">
    //     <h2
    //       className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
    //     >

    //       {name}
    //     </h2>
    //     <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
    //       {desc}
    //     </span>
    //     <span
    //       className={`block mt-1.5 text-sm text-neutral-6000 dark:text-neutral-400`}
    //     >
    //       {convertNumbThousand(count || 0)} properties
    //     </span>
    //   </div>
    // </Link>
    <Link
      href={href as Route}
      className={`nc-CardCategory3 flex flex-col ${className}`}
    >
      <div className="border rounded-lg p-4  w-44 shadow-sm">
        <div className="flex justify-start mb-4">
          <Image
            src={thumbnail || ''}
            alt="Bengaluru"
            width={64}
            height={64}
            className="text-[#6115E7]"
          />
        </div>
        <div className="text-lg font-semibold text-gray-800 mb-1">{name}</div>
        <div className="text-gray-500 flex items-center">
          {convertNumbThousand(count || 0)} properties
          <ArrowForwardOutlinedIcon className="ml-2 text-gray-800" />
        </div>
      </div>
    </Link>
  )
}

export default CardCategory3
