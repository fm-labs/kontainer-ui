import { useEnvRoute } from './useEnvRoute.ts'
import api from '../lib/api2.ts'
import { DEFAULT_AGENT_PORT } from '../constants.ts'
import { useAppStore } from '../context/AppContext.tsx'

export const useEnvApi = () => {
  const envRoute = useEnvRoute()
  const { appStore } = useAppStore()
  if (!envRoute) {
    throw new Error('Failed to init env api: envRoute not found')
  }

  const urlSchema = envRoute?.env?.useSSL ? 'https' : 'http'
  const hostname = envRoute?.env?.hostname || ''
  const agentPort = envRoute?.env?.agentPort || DEFAULT_AGENT_PORT
  const apiBaseUrl = `${urlSchema}://${hostname}:${agentPort}/api`
  const authToken = appStore?.authToken
  return api(apiBaseUrl, authToken)
}
