import * as React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { green } from '@mui/material/colors'
import Fab, { FabProps } from '@mui/material/Fab'
import CheckIcon from '@mui/icons-material/Check'
import SaveIcon from '@mui/icons-material/Save'

export interface ProgressFabButtonProps extends FabProps {
  size?: 'small' | 'medium' | 'large'
  icon?: React.ReactNode
  successIcon?: React.ReactNode
  //errorIcon?: React.ReactNode
  loading?: boolean
  success?: boolean
}

const sizeMap = {
  small: {
    // 40
    spinnerSize: 46,
    spinnerTop: -3,
    spinnerLeft: -3,
  },
  medium: {
    // 48
    spinnerSize: 54,
    spinnerTop: -3,
    spinnerLeft: -3,
  },
  large: {
    // 56
    spinnerSize: 68,
    spinnerTop: -6,
    spinnerLeft: -6,
  },
}

const ProgressFabButton = ({ icon, successIcon, loading, success, ...fabProps }: ProgressFabButtonProps) => {
  const size = fabProps?.size || 'large'
  const spinnerSize = sizeMap[size].spinnerSize

  icon = icon || <SaveIcon />
  successIcon = successIcon || <CheckIcon />
  //errorIcon = errorIcon || <ErrorIcon />

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  }

  const spinnerSx = {
    color: green[500],
    position: 'absolute',
    top: sizeMap[size].spinnerTop,
    left: sizeMap[size].spinnerLeft,
    zIndex: 1,
  }

  return (
    <>
      <Box sx={{ m: '0.25rem', position: 'relative', display: 'inline-block' }}>
        <Fab size={size} aria-label='save' color='primary' sx={buttonSx} {...fabProps}>
          {success ? successIcon : icon}
        </Fab>
        {loading && <CircularProgress size={spinnerSize} sx={spinnerSx} />}
      </Box>
    </>
  )
}

export default ProgressFabButton
