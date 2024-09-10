import React from 'react'
import Image from 'next/image'

import logoImg from '@/images/logo.png'
import logoLightImg from '@/images/logo-light.png'
import LogoSvgLight from './LogoSvgLight'
import LogoSvg from './LogoSvg'
import Link from 'next/link'
import { StaticImageData } from 'next/image'

import DesklinqLight from '@/images/logos/nomal/6.png'
import DeskinqDark from '@/images/logos/dark/6.png'
import { Route } from 'next'

export interface LogoProps {
  img?: string
  imgLight?: string
  className?: string
}

const Logo: React.FC<LogoProps> = ({
  img = DeskinqDark,
  imgLight = DesklinqLight,
  className = 'w-44',
}) => {
  return (
    <Link
      href={'/' as Route}
      className={`ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
    >
      {/* <Image className="h-20 w-20" src={Desklinq} alt="hero" priority /> */}

      {/* <LogoSvgLight />
      <LogoSvg /> */}

      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {img ? (
        <Image
          className={`${imgLight ? 'dark:hidden' : ''}`}
          src={imgLight}
          alt="Logo"
          height={100}
        />
      ) : (
        'Logo Here'
      )}
      {imgLight && (
        <Image
          className="hidden max-h-15 dark:block"
          src={img}
          alt="Logo-Light"
        />
      )}
    </Link>
  )
}

export default Logo
