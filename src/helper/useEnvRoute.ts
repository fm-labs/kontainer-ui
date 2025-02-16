import { useLocation } from 'react-router'
import { useMatches } from 'react-router-dom'
import React from 'react'
import useEnvironments from './useEnvironments.ts'

export const useEnvRoute = () => {
  const location = useLocation()
  const matches = useMatches()
  const { envs } = useEnvironments()

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
    if (!envs) {
      return
    }

    return envs.find((env) => env.id === envId)
  }

  const envId = React.useMemo(() => getEnvIdFromRoute(), [matches])
  const env = React.useMemo(() => getEnvFromEnvId(), [matches])

  const buildEnvUrl = React.useCallback(
    (path: string) => {
      if (!envId) {
        return path
      }

      return `/${envId}${path}`
    },
    [envId],
  )

  return {
    location,
    matches,
    env: env,
    envId: envId,
    isEnvRoute: !!envId,
    buildEnvUrl: buildEnvUrl,
  }
}
