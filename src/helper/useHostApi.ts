import { useHostRoute } from './useHostRoute.ts'
import api from '../lib/api2.ts'

export const useHostApi = () => {
  const hostRoute = useHostRoute()
  if (!hostRoute) {
    throw new Error('Host route not found')
  }

  const hostApiBaseUrl = `http://${hostRoute.environment}:5000/api`
  return api(hostApiBaseUrl)
}
