import * as React from 'react'
import { useEnvRoute } from './useEnvRoute.ts'
import api from '../lib/api2.ts'
import { MASTER_AGENT_PORT } from '../constants.ts'

export const useEnvApi = () => {
  const envRoute = useEnvRoute()
  if (!envRoute) {
    throw new Error('Failed to init env api: envRoute not found')
  }

  const envId = envRoute?.env?.id
  const urlSchema = envRoute?.env?.useSSL ? 'https' : 'http'
  const hostname = envRoute?.env?.hostname || 'localhost'
  const agentPort = envRoute?.env?.agentPort || MASTER_AGENT_PORT
  const apiBaseUrl = `${urlSchema}://${hostname}:${agentPort}/api`
  //const authToken = localStorage.getItem(envId + '.authToken') || undefined

  const restoreEnvAuthToken = React.useCallback(() => {
    return localStorage.getItem(envId + '.authToken') || undefined
  }, [envId])

  const saveEnvAuthToken = React.useCallback(
    (token: string | undefined) => {
      if (!token) {
        return localStorage.removeItem(envId + '.authToken')
      }
      return localStorage.setItem(envId + '.authToken', token)
    },
    [envId],
  )

  const authToken = React.useMemo(() => {
    return restoreEnvAuthToken()
  }, [restoreEnvAuthToken])

  const envApi = React.useMemo(() => {
    return api(apiBaseUrl, authToken)
  }, [apiBaseUrl, authToken])

  return {
    api: envApi,
    envId: envId,
    restoreAuthToken: restoreEnvAuthToken,
    saveAuthToken: saveEnvAuthToken,
  }
}
