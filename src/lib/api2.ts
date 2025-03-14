import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import {
  IBackgroundTaskResponse,
  IDockerContainer,
  IDockerResourceAttrs,
  ContainerRegistry,
  HostEnvironment,
} from '../types.ts'
import { MASTER_AGENT_PORT } from '../constants.ts'

const api = (env: HostEnvironment) => {
  const envId = env?.id
  const urlSchema = env?.useSSL ? 'https' : 'http'
  const hostname = env?.hostname || 'localhost'
  const agentPort = env?.agentPort || MASTER_AGENT_PORT
  const baseUrl = `${urlSchema}://${hostname}:${agentPort}/api`

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
      const authToken = localStorage.getItem(envId + '.authToken') || undefined
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
  apiHttp.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.error('API ERROR', error)
      // check 401 Unauthorized
      if (error?.response?.status === 401) {
        console.error('401 Unauthorized')
        // @todo - handle 401 Unauthorized
        localStorage.removeItem(envId + '.authToken')
        window.location.reload()
      }

      if (error?.code === 'ECONNABORTED') {
        console.error('ECONNABORTED')
        return error
      }
      return Promise.reject(error)
    },
  )

  const postLogin = async (data: FormData): Promise<{ access_token: string }> => {
    const response = await apiHttp.post(`auth/login`, data)
    return response.data
  }

  const postLogout = async (): Promise<void> => {
    const response = await apiHttp.post(`auth/logout`)
    return response.data
  }

  const getEnvironments = async (): Promise<IDockerContainer[]> => {
    const response = await apiHttp.get(`environments`)
    return response.data
  }

  const getStacks = async (): Promise<IDockerContainer[]> => {
    const response = await apiHttp.get(`stacks`)
    return response.data
  }

  const createStack = async (data: any): Promise<IBackgroundTaskResponse[]> => {
    const response = await apiHttp.post(`stacks/create`, data)
    return response.data
  }

  const getStack = async (id: string): Promise<IDockerContainer[]> => {
    const response = await apiHttp.get(`stacks/${id}`)
    return response.data
  }

  const _stackAction =
    (stackId: string, action: string, config?: AxiosRequestConfig) => async (): Promise<IBackgroundTaskResponse> => {
      const response = await apiHttp.post(`stacks/${stackId}/${action}?async=1`, null, config)
      return response.data
    }

  const startStack = (id: string) => _stackAction(id, 'start')()

  const stopStack = (id: string) => _stackAction(id, 'stop')()

  const deleteStack = (id: string) => _stackAction(id, 'delete')()

  const destroyStack = (id: string) => _stackAction(id, 'destroy')()

  const syncStack = (id: string) => _stackAction(id, 'sync')()

  const getImages = async (): Promise<IDockerResourceAttrs[]> => {
    const response = await apiHttp.get(`images`)
    return response.data
  }

  const getVolumes = async (): Promise<IDockerResourceAttrs[]> => {
    const response = await apiHttp.get(`volumes`)
    return response.data
  }

  const getNetworks = async (): Promise<IDockerResourceAttrs[]> => {
    const response = await apiHttp.get(`networks`)
    return response.data
  }

  const getContainers = async (): Promise<IDockerResourceAttrs[]> => {
    const response = await apiHttp.get(`containers`)
    return response.data
  }

  const getContainer = async (id: string): Promise<IDockerContainer[]> => {
    const response = await apiHttp.get(`containers/${id}`)
    return response.data
  }

  const getContainerLogs = async (id: string): Promise<string[]> => {
    const response = await apiHttp.get(`containers/${id}/logs`)
    return response.data
  }

  const execContainerCommand = async (id: string, cmd: string | string[]): Promise<AxiosResponse> => {
    const data = {
      command: Array.isArray(cmd) ? cmd : cmd.split(' '), // split string into array
    }
    return apiHttp.post(`containers/${id}/exec`, data)
  }

  const _containerActionSync =
    (containerId: string, action: string, data: any, config?: AxiosRequestConfig) =>
    async (): Promise<IBackgroundTaskResponse> => {
      const response = await apiHttp.post(`containers/${containerId}/${action}`, data, config)
      return response.data
    }

  const _containerActionAsync =
    (containerId: string, action: string, data: any, config?: AxiosRequestConfig) =>
    async (): Promise<IBackgroundTaskResponse> => {
      const response = await apiHttp.post(`containers/${containerId}/${action}?async=1`, data, config)
      return response.data
    }

  const startContainer = (id: string) => _containerActionAsync(id, 'start', null)()

  const restartContainer = (id: string) => _containerActionAsync(id, 'restart', null)()

  const pauseContainer = (id: string) => _containerActionAsync(id, 'pause', null)()

  const stopContainer = (id: string) => _containerActionAsync(id, 'stop', null)()

  const removeContainer = (id: string) => _containerActionAsync(id, 'remove', null)()

  const runContainer = async (runData: any): Promise<IBackgroundTaskResponse> => {
    const response = await apiHttp.post(`containers/run`, runData)
    return response.data
  }

  const getSystemInfo = async (): Promise<any> => {
    const response = await apiHttp.get(`system/info`)
    return response.data
  }

  const getEngineInfo = async (): Promise<any> => {
    const response = await apiHttp.get(`engine/info`)
    return response.data
  }

  const getEngineDf = async (): Promise<any> => {
    const response = await apiHttp.get(`engine/df`)
    return response.data
  }

  const getEnginePing = async (): Promise<any> => {
    const response = await apiHttp.get(`engine/ping`)
    return response.data
  }

  const getEngineEvents = async (args: { since?: number }): Promise<any> => {
    const response = await apiHttp.get(`engine/events?since=${args.since || ''}`)
    return response.data
  }

  const submitTask = async (task: any): Promise<IBackgroundTaskResponse> => {
    const response = await apiHttp.post(`tasks`, task)
    return response.data
  }

  const getTaskStatus = async (taskId: string): Promise<IBackgroundTaskResponse> => {
    const response = await apiHttp.get(`tasks/${taskId}/status`)
    return response.data
  }

  const listTemplates = async (): Promise<any> => {
    const response = await apiHttp.get(`templates`)
    return response.data
  }

  const getTemplate = async (id: string): Promise<any> => {
    const response = await apiHttp.get(`templates/${id}`)
    return response.data
  }

  const addTemplate = async (data: any): Promise<IBackgroundTaskResponse> => {
    const response = await apiHttp.post(`templates`, data)
    return response.data
  }

  const launchPortainerTemplate = async (template: any): Promise<IBackgroundTaskResponse> => {
    const response = await apiHttp.post(`portainer/templates/launch`, template)
    return response.data
  }

  const getContainerRegistries = async (): Promise<ContainerRegistry[]> => {
    const response = await apiHttp.get(`admin/registries`)
    return response.data
  }

  const updateContainerRegistry = async (registryName: string, data: any): Promise<any> => {
    const response = await apiHttp.post(`admin/registries/${registryName}`, data)
    return response.data
  }

  const deleteContainerRegistry = async (registryName: string): Promise<any> => {
    const response = await apiHttp.delete(`admin/registries/${registryName}`)
    return response.data
  }

  const listPrivateKeys = async (): Promise<string[]> => {
    const response = await apiHttp.get(`admin/keys`)
    return response.data
  }

  const updatePrivateKey = async (keyName: string, data: any): Promise<any> => {
    const response = await apiHttp.post(`admin/keys`, data)
    return response.data
  }

  const deletePrivateKey = async (keyName: string): Promise<any> => {
    const response = await apiHttp.delete(`admin/keys/${keyName}`)
    return response.data
  }

  return {
    postLogin,
    postLogout,
    getEnvironments,
    getStacks,
    createStack,
    getStack,
    startStack,
    stopStack,
    deleteStack,
    destroyStack,
    syncStack,
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
    getSystemInfo,
    getEngineInfo,
    getEngineDf,
    getEnginePing,
    getEngineEvents,
    submitTask,
    getTaskStatus,
    listTemplates,
    getTemplate,
    addTemplate,
    launchPortainerTemplate,
    getContainerRegistries,
    updateContainerRegistry,
    deleteContainerRegistry,
    listPrivateKeys,
    updatePrivateKey,
    deletePrivateKey,
  }
}

export default api
