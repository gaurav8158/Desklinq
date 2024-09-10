import { Alert, AlertTitle } from '@mui/material'
import React from 'react'
// import { Alert } from '@material-ui/lab'

export interface AlertProps {
  classname?: string
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
  title?: string
  variant?: 'filled' | 'outlined' | 'standard'
  color?: 'success' | 'info' | 'warning' | 'error'
  icon?: React.ReactNode
}

const Alerts: React.FC<AlertProps> = ({
  message,
  type,
  title,
  variant,
  color,
  icon,
  classname,
}) => {
  return (
    <Alert
      severity={type}
      variant={variant}
      color={color}
      icon={icon}
      className={classname}
    >
      {title ?? <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  )
}
export default Alerts
