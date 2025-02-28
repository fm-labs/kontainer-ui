import * as React from 'react'
import { useEnvRoute } from './useEnvRoute.ts'
import api from '../lib/api2.ts'
import { MASTER_AGENT_PORT } from '../constants.ts'

export const useEnvApi = () => {
  const envRoute = useEnvRoute()
  if (!envRoute) {
    throw new Error('Failed to init env api: envRoute not found')
  }

  const urlSchema = envRoute?.env?.useSSL ? 'https' : 'http'
  const hostname = envRoute?.env?.hostname || 'localhost'
  const agentPort = envRoute?.env?.agentPort || MASTER_AGENT_PORT
  const apiBaseUrl = `${urlSchema}://${hostname}:${agentPort}/api`
  const authToken = localStorage.getItem('authToken') || undefined

  const _api = React.useMemo(() => {
    return api(apiBaseUrl, authToken)
  }, [apiBaseUrl, authToken])

  //return api(apiBaseUrl, authToken)
  return _api
}
