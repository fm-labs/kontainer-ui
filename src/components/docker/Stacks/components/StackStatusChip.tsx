import React from 'react'
import { Chip, ChipProps } from '@mui/material'

const StackStatusChip = ({ value }: { value: string }) => {
  const chipProps: ChipProps = {
    variant: 'outlined',
    color: 'primary',
    size: 'small',
    label: value,
  }

  switch (value) {
    case 'running':
      chipProps.color = 'success'
      break
    case 'stopped':
      chipProps.color = 'error'
      break
    case 'paused':
      chipProps.color = 'warning'
      break
    case 'idle':
    default:
      chipProps.color = 'default'
  }

  return <Chip label={value} {...chipProps} />
}

export default StackStatusChip
