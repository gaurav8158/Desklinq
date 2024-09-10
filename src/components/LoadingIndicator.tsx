import React, { FC } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export interface LoadingIndicator {
  className?: string
}

const LoadingIndicator: FC<LoadingIndicator> = ({ className = '' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto',
      }}
      className={className}
    >
      <CircularProgress />
    </Box>
  )
}

export default LoadingIndicator
