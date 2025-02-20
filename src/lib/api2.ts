import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { IDockerContainer, IDockerResourceAttrs } from '../types.ts'

const api = (baseUrl: string, authToken?: string) => {
  //baseUrl = baseUrl || '/api'
  //console.log('API BASE URL', baseUrl)
  if (!baseUrl) {
    throw new Error('API base URL is required')
  }

  const apiHttp = axios.create({
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

  apiHttp.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (authToken) {
        config.headers['X-Api-Key'] = authToken
      }
      //console.log('before request', config)
      return config
    },
    (error) => {},
  )

  // catch response errors with an interceptor
  apiHttp.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.error('API ERROR', error)
      return Promise.reject(error)
    },
  )

  const getEnvironments = (config?: AxiosRequestConfig) => async (): Promise<IDockerContainer[]> => {
    const response = await apiHttp.get(`environments`, config)
    return response.data
  }

  const getStacks = (config?: AxiosRequestConfig) => async (): Promise<IDockerContainer[]> => {
    const response = await apiHttp.get(`stacks`, config)
    return response.data
  }

  const createStack =
    (config?: AxiosRequestConfig) =>
    async (data: any): Promise<AxiosResponse> => {
      return await apiHttp.post(`stacks/create`, data, config)
    }

  const getStack =
    (config?: AxiosRequestConfig) =>
    async (id: string): Promise<IDockerContainer[]> => {
      const response = await apiHttp.get(`stack/${id}`, config)
      return response.data
    }

  const startStack =
    (config?: AxiosRequestConfig) =>
    async (id: string): Promise<AxiosResponse> => {
      return await apiHttp.post(`stack/start/${id}`, null, config)
    }

  const stopStack =
    (config?: AxiosRequestConfig) =>
    async (id: string): Promise<AxiosResponse> => {
      return await apiHttp.post(`stack/stop/${id}`, null, config)
    }

  const removeStack =
    (config?: AxiosRequestConfig) =>
    async (id: string): Promise<AxiosResponse> => {
      return await apiHttp.post(`stack/remove/${id}`, null, config)
    }

  const getImages = (config?: AxiosRequestConfig) => async (): Promise<IDockerResourceAttrs[]> => {
    const response = await apiHttp.get(`images`, config)
    return response.data
  }

  const getVolumes = (config?: AxiosRequestConfig) => async (): Promise<IDockerResourceAttrs[]> => {
    const response = await apiHttp.get(`volumes`, config)
    return response.data
  }

  const getNetworks = (config?: AxiosRequestConfig) => async (): Promise<IDockerResourceAttrs[]> => {
    const response = await apiHttp.get(`networks`, config)
    return response.data
  }

  const getContainers = (config?: AxiosRequestConfig) => async (): Promise<IDockerResourceAttrs[]> => {
    const response = await apiHttp.get(`containers`, config)
    return response.data
  }

  const getContainer =
    (config?: AxiosRequestConfig) =>
    async (id: string): Promise<IDockerContainer[]> => {
      const response = await apiHttp.get(`containers/${id}`, config)
      return response.data
    }

  const getContainerLogs =
    (config?: AxiosRequestConfig) =>
    async (id: string): Promise<string[]> => {
      const response = await apiHttp.get(`containers/logs/${id}`, config)
      return response.data
    }

  const execContainerCommand =
    (config?: AxiosRequestConfig) =>
    async (id: string, cmd: string | string[]): Promise<AxiosResponse> => {
      const data = {
        command: Array.isArray(cmd) ? cmd : cmd.split(' '), // split string into array
      }
      return await apiHttp.post(`containers/exec/${id}`, data, config)
    }

  const startContainer =
    (config?: AxiosRequestConfig) =>
    async (id: string): Promise<AxiosResponse> => {
      return await apiHttp.post(`containers/start/${id}`, null, config)
    }

  const restartContainer =
    (config?: AxiosRequestConfig) =>
    async (id: string): Promise<AxiosResponse> => {
      return await apiHttp.post(`containers/start/${id}?restart=1`, null, config)
    }

  const pauseContainer =
    (config?: AxiosRequestConfig) =>
    async (id: string): Promise<AxiosResponse> => {
      return await apiHttp.post(`containers/pause/${id}`, null, config)
    }

  const stopContainer =
    (config?: AxiosRequestConfig) =>
    async (id: string): Promise<AxiosResponse> => {
      return await apiHttp.post(`containers/stop/${id}`, null, config)
    }

  const removeContainer =
    (config?: AxiosRequestConfig) =>
    async (id: string): Promise<AxiosResponse> => {
      return await apiHttp.post(`containers/remove/${id}`, null, config)
    }

  const runContainer =
    (config?: AxiosRequestConfig) =>
    async (runData: any): Promise<AxiosResponse> => {
      return await apiHttp.post(`containers/run`, runData, config)
    }

  const launchPortainerTemplate =
    (config?: AxiosRequestConfig) =>
    async (template: any): Promise<AxiosResponse> => {
      return await apiHttp.post(`portainer/templates/launch`, template, config)
    }

  const getSystemInfo = (config?: AxiosRequestConfig) => async (): Promise<any> => {
    const response = await apiHttp.get(`system/info`, config)
    return response.data
  }

  const getEngineInfo = (config?: AxiosRequestConfig) => async (): Promise<any> => {
    const response = await apiHttp.get(`engine/info`, config)
    return response.data
  }

  const getEngineDf = (config?: AxiosRequestConfig) => async (): Promise<any> => {
    const response = await apiHttp.get(`engine/df`, config)
    return response.data
  }

  const getEnginePing = (config?: AxiosRequestConfig) => async (): Promise<any> => {
    const response = await apiHttp.get(`engine/ping`, config)
    return response.data
  }

  const getEngineEvents =
    (config?: AxiosRequestConfig) =>
    async (args: { since?: number }): Promise<any> => {
      const response = await apiHttp.get(`engine/events?since=${args.since || ''}`, config)
      return response.data
    }

  const submitTask =
    (config?: AxiosRequestConfig) =>
    async (task: any): Promise<any> => {
      const response = await apiHttp.post(`tasks`, task, config)
      return response.data
    }

  return {
    getEnvironments,
    getStacks,
    createStack,
    getStack,
    startStack,
    stopStack,
    removeStack,
    getContainers,
    getContainer,
    getContainerLogs,
    execContainerCommand,
    startContainer,
    restartContainer,
    pauseContainer,
    stopContainer,
    removeContainer,
    runContainer,
    getImages,
    getVolumes,
    getNetworks,
    launchPortainerTemplate,
    getSystemInfo,
    getEngineInfo,
    getEngineDf,
    getEnginePing,
    getEngineEvents,
  }
}

export default api
