import React from 'react'
import { Chip, ChipProps } from '@mui/material'

const StackManagedChip = ({ value }: { value: boolean }) => {
  const chipProps: ChipProps = {
    variant: 'outlined',
    color: 'primary',
    size: 'small',
    label: '?',
  }

  if (value) {
    chipProps.color = 'success'
    chipProps.label = 'Managed'
  } else {
    chipProps.color = 'default'
    chipProps.label = 'Unmanaged'
  }

  return <Chip label={value} {...chipProps} />
}

export default StackManagedChip
