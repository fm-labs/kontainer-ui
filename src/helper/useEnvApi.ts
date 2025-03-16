import * as React from 'react'
import { useEnvRoute } from './useEnvRoute.ts'
import api from '../lib/api2.ts'

export const useEnvApi = () => {
  const envRoute = useEnvRoute()
  if (!envRoute) {
    throw new Error('Failed to init env api: envRoute not found')
  }

  const env = envRoute?.env
  if (!env) {
    throw new Error('Failed to init env api: env not found')
  }

  const envApi = React.useMemo(() => {
    return api(env)
  }, [env])

  return {
    env: env,
    api: envApi,
  }
}
