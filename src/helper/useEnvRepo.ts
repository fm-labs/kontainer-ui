import { useEnvRoute } from './useEnvRoute.ts'
import { useEnvApi } from './useEnvApi.ts'
import appRepo from '../lib/repo.ts'
import React from 'react'

export const useEnvRepo = () => {
  const envRoute = useEnvRoute()
  const envApi = useEnvApi()

  const repo = React.useMemo(() => {
    if (!envRoute) {
      throw new Error('Failed to init env repo: envRoute not found')
    }
    if (!envRoute.envId) {
      throw new Error('Failed to init env repo: envId not found')
    }
    if (!envApi) {
      throw new Error('Failed to init env repo: envApi not found')
    }

    return appRepo(envRoute.envId!, envApi)
  }, [envRoute, envApi])

  return repo
}
