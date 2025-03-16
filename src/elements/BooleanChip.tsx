import React from 'react'
import { Chip, ChipProps } from '@mui/material'

interface BooleanChipProps extends ChipProps {
  value: boolean
  trueLabel?: string
  falseLabel?: string
}

const BooleanChip = ({ value, trueLabel, falseLabel, ...chipProps }: BooleanChipProps) => {
  let label
  chipProps.size = 'small'
  chipProps.variant = 'outlined'
  if (value) {
    label = trueLabel || 'true'
    chipProps.color = 'success'
  } else {
    label = falseLabel || 'false'
    chipProps.color = 'error'
  }
  return <Chip label={label} {...chipProps}></Chip>
}

export default BooleanChip
