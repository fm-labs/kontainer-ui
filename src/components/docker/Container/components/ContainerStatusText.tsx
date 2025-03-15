import React from 'react'
import { Typography } from '@mui/material'

/**
 * ContainerStatus
 *
 * @param state
 * @constructor
 */
const ContainerStatusText = ({ status }: { status: string }) => {
  const elProps: any = {
    variant: 'span',
  }

  let containerStatusEl
  switch (status) {
    case 'running':
      containerStatusEl = (
        <Typography {...elProps} color='success'>
          {status}
        </Typography>
      )
      break
    case 'exited':
      containerStatusEl = (
        <Typography {...elProps} color='error'>
          {status}
        </Typography>
      )
      break
    case 'created':
      containerStatusEl = (
        <Typography {...elProps} color='info'>
          {status}
        </Typography>
      )
      break
    case 'paused':
      containerStatusEl = (
        <Typography {...elProps} color='warning'>
          {status}
        </Typography>
      )
      break
    default:
      containerStatusEl = <Typography {...elProps}>{status}</Typography>
      break
  }

  return <>{containerStatusEl}</>
}

export default ContainerStatusText
