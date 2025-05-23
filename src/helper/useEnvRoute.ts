import React from 'react'
import { useLocation } from 'react-router'
import { useMatches } from 'react-router-dom'
import useEnvironments from './useEnvironments.ts'

export const useEnvRoute = () => {
  const location = useLocation()
  const matches = useMatches()
  const { dockerHosts } = useEnvironments()
  //console.log('useHostRoute', location, matches)

  const getEnvIdFromRoute = () => {
    if (!matches || matches.length <= 1) {
      return
    }
    // The first match contains the host alias
    const match = matches[1]
    return match.params.envId
  }

  const getEnvFromEnvId = () => {
    if (!dockerHosts) {
      return
    }
    return dockerHosts.find((env) => env.id === envId)
  }

  const envId = React.useMemo(() => getEnvIdFromRoute(), [matches])
  const env = React.useMemo(() => getEnvFromEnvId(), [matches, envId])

  // const buildEnvUrl = React.useCallback(
  //   (path: string) => {
  //     if (!envId) {
  //       return path
  //     }
  //
  //     return `/${envId}${path}`
  //   },
  //   [envId],
  // )

  return {
    location,
    matches,
    env: env,
    envId: envId,
    isEnvRoute: !!envId,
  }
}
