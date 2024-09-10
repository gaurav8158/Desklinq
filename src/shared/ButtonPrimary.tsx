import { PathName } from '@/routers/types'
import Button, { ButtonProps } from './Button'
import React from 'react'

export interface ButtonPrimaryProps extends ButtonProps {
  href?: PathName
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = '',
  href,
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 ${className}`}
      href={href}
      {...args}
    />
  )
}

export default ButtonPrimary
