import React from 'react'
import { Chip, ChipProps } from '@mui/material'

/**
 * ContainerState
 *
 * {
 *  "State": {
 *    "Dead": false,
 *    "Error": "",
 *    "ExitCode": 0,
 *    "FinishedAt": "0001-01-01T00:00:00Z",
 *    "Health": {
 *      "FailingStreak": 0,
 *      "Log": [
 *        {
 *          "End": "2025-02-06T10:16:45.260954801Z",
 *          "ExitCode": 0,
 *          "Output": "{\n  \"status\": \"OK\",\n  \"version\": \"1.0.0\"\n}\n",
 *          "Start": "2025-02-06T10:16:45.214070801Z"
 *        },
 *        {
 *          "End": "2025-02-06T10:18:15.308925551Z",
 *          "ExitCode": 0,
 *          "Output": "{\n  \"status\": \"OK\",\n  \"version\": \"1.0.0\"\n}\n",
 *          "Start": "2025-02-06T10:18:15.266247676Z"
 *        },
 *        {
 *          "End": "2025-02-06T10:19:45.358283468Z",
 *          "ExitCode": 0,
 *          "Output": "{\n  \"status\": \"OK\",\n  \"version\": \"1.0.0\"\n}\n",
 *          "Start": "2025-02-06T10:19:45.312312551Z"
 *        },
 *        {
 *          "End": "2025-02-06T10:21:15.388904676Z",
 *          "ExitCode": 0,
 *          "Output": "{\n  \"status\": \"OK\",\n  \"version\": \"1.0.0\"\n}\n",
 *          "Start": "2025-02-06T10:21:15.351041051Z"
 *        }
 *      ],
 *      "Status": "healthy"
 *    },
 *    "OOMKilled": false,
 *    "Paused": false,
 *    "Pid": 46427,
 *    "Restarting": false,
 *    "Running": true,
 *    "StartedAt": "2025-02-06T10:15:15.107387634Z",
 *    "Status": "running"
 *  }
 * }
 *
 * @param state
 * @constructor
 */
const ContainerState = ({ state }: { state: any }) => {
  const chipProps: ChipProps = {
    size: 'small',
    label: state?.Status,
    variant: 'outlined',
  }
  switch (state?.Status) {
    case 'running':
      return <Chip {...chipProps} color='success' />
    case 'exited':
      chipProps.label = `${state?.Status} (${state?.ExitCode})`
      return <Chip {...chipProps} color='error' />
    case 'created':
      return <Chip {...chipProps} color='info' />
    case 'paused':
      return <Chip {...chipProps} color='warning' />
  }

  return <Chip label={state?.Status} />
}

export default ContainerState
