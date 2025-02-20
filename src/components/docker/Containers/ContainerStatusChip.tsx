import React from 'react'
import { Chip, ChipProps } from '@mui/material'

/**
 * ContainerStatus
 *
 * @param state
 * @constructor
 */
const ContainerStatusChip = ({ status }: { status: string }) => {
  const chipProps: ChipProps = {
    size: 'small',
    label: status,
    variant: 'outlined',
  }

  let containerStatusEl
  switch (status) {
    case 'running':
      containerStatusEl = <Chip {...chipProps} color='success' />
      break
    case 'exited':
      chipProps.label = `${status}`
      containerStatusEl = <Chip {...chipProps} color='error' />
      break
    case 'created':
      containerStatusEl = <Chip {...chipProps} color='info' />
      break
    case 'paused':
      containerStatusEl = <Chip {...chipProps} color='warning' />
      break
    default:
      containerStatusEl = <Chip {...chipProps} />
      break
  }

  return <>{containerStatusEl}</>
}

export default ContainerStatusChip
