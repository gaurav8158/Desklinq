import { SocialType } from '@/shared/SocialsShare'
import React, { FC } from 'react'

export interface SocialsList1Props {
  className?: string
}

const socials: SocialType[] = [
  {
    name: 'Youtube',
    icon: 'lab la-youtube',
    href: 'https://www.facebook.com/profile.php?id=100075596391931',
  },
  {
    name: 'Facebook',
    icon: 'lab la-facebook',
    href: 'https://www.facebook.com/profile.php?id=100075596391931',
  },
  {
    name: 'LinkedIn',
    icon: 'lab la-linkedin',
    href: 'https://www.linkedin.com/company/desklinq/?viewAsMember=true',
  },
  {
    name: 'Instagram',
    icon: 'lab la-instagram',
    href: 'https://www.instagram.com/desklinq/',
  },
]

const SocialsList1: FC<SocialsList1Props> = ({ className = 'space-y-2.5' }) => {
  const renderItem = (item: SocialType, index: number) => {
    return (
   

      <a
        key={index}
        target="_blank"
        href={item.href}
        className="flex items-center justify-center h-12 w-12 bg-black rounded-full border border-gray-800 hover:border-gray-700 shadow-md transition duration-300"
      >
        <div className="flex items-center justify-center h-12 w-12 bg-black rounded-full">
          <i className={`${item.icon} text-3xl`}></i>
        </div>
      </a>
    )
  }

  return (
    <div className={` nc-SocialsList1 ${className} `} data-nc-id="SocialsList1">
      {socials.map(renderItem)}
    </div>
  )
}

export default SocialsList1
