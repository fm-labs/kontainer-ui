import axios, { InternalAxiosRequestConfig } from 'axios'
import { readAuthToken, storeAuthToken } from '~/lib/authStorage.ts'
import { HostEnvironment } from '~/types.ts'
import { MASTER_AGENT_PORT } from '~/constants.ts'

export const kontainerApiHttp = (env: HostEnvironment) => {
  const envId = 'env0' // env?.id
  const urlSchema = env?.useSSL ? 'https' : 'http'
  const hostname = env?.hostname || 'localhost'
  const agentPort = env?.agentPort || MASTER_AGENT_PORT
  const baseUrl = `${urlSchema}://${hostname}:${agentPort}/api`

  if (!baseUrl) {
    throw new Error('API base URL is required')
  }

  const agentHttp = axios.create({
    baseURL: baseUrl,
    // `withCredentials` indicates whether or not cross-site Access-Control requests
    // should be made using credentials
    withCredentials: false,
    // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
    xsrfCookieName: 'csrftoken',
    // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
    xsrfHeaderName: 'X-CSRFToken',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    timeout: 60000,
  })

  agentHttp.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const authToken = readAuthToken(envId)
      if (authToken) {
        //config.headers['X-Api-Key'] = authToken
        config.headers['Authorization'] = `Bearer ${authToken}`
      }
      //console.log('before request', config)
      return config
    },
    (error) => {},
  )

  // catch response errors with an interceptor
  agentHttp.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.error('API ERROR', error)
      // check 401 Unauthorized
      if (error?.response?.status === 401) {
        console.error('401 Unauthorized')
        // @todo - handle 401 Unauthorized
        storeAuthToken(envId, null)
        //window.location.reload()
        //window.location.href = '/'
      }

      if (error?.code === 'ECONNABORTED') {
        console.error('ECONNABORTED')
        return error
      }
      return Promise.reject(error)
    },
  )

  return agentHttp
}
