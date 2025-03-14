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

  // const envId = envRoute?.env?.id
  // const urlSchema = envRoute?.env?.useSSL ? 'https' : 'http'
  // const hostname = envRoute?.env?.hostname || 'localhost'
  // const agentPort = envRoute?.env?.agentPort || MASTER_AGENT_PORT
  // const apiBaseUrl = `${urlSchema}://${hostname}:${agentPort}/api`
  // //const authToken = localStorage.getItem(envId + '.authToken') || undefined

  // const readEnvAuthToken = React.useCallback(() => {
  //   return localStorage.getItem(envId + '.authToken') || undefined
  // }, [envId])
  //
  // const saveEnvAuthToken = React.useCallback(
  //   (token: string | undefined) => {
  //     if (!token) {
  //       return localStorage.removeItem(envId + '.authToken')
  //     }
  //     return localStorage.setItem(envId + '.authToken', token)
  //   },
  //   [envId],
  // )

  // const authToken = React.useMemo(() => {
  //   return restoreEnvAuthToken()
  // }, [restoreEnvAuthToken])

  // const envApi = React.useMemo(() => {
  //   return api(apiBaseUrl, authToken)
  // }, [apiBaseUrl, authToken])

  const envApi = React.useMemo(() => {
    return api(env)
  }, [env])

  return {
    env: env,
    api: envApi,
    //readAuthToken: readEnvAuthToken,
    //saveAuthToken: saveEnvAuthToken,
  }
}
