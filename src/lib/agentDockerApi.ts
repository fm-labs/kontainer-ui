import { DockerHost, HostEnvironment, IDockerContainer, IDockerResourceAttrs, TaskStatusResponse } from '~/types.ts'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { kontainerApiHttp } from '~/lib/kontainerApiHttp.ts'

export const agentDockerApiForEnv = (env: HostEnvironment, dockerHost: DockerHost) => {
  const agentHttp = kontainerApiHttp(env)
  agentHttp.interceptors.request.use((config) => {
    if (dockerHost) {
      config.headers['X-Docker-Context'] = dockerHost.id
      config.headers['X-Docker-Host'] = dockerHost.host
    }
    return config
  })
  return agentDockerApi(agentHttp)
}

const agentDockerApi = (agentHttp) => {
  const getImages = async (): Promise<IDockerResourceAttrs[]> => {
    const response = await agentHttp.get(`docker/images`)
    return response.data
  }

  const getVolumes = async (): Promise<IDockerResourceAttrs[]> => {
    const response = await agentHttp.get(`docker/volumes`)
    return response.data
  }

  const getNetworks = async (): Promise<IDockerResourceAttrs[]> => {
    const response = await agentHttp.get(`docker/networks`)
    return response.data
  }

  const getContainers = async (): Promise<IDockerResourceAttrs[]> => {
    const response = await agentHttp.get(`docker/containers`)
    return response.data
  }

  const getContainer = async (id: string): Promise<IDockerContainer[]> => {
    const response = await agentHttp.get(`docker/containers/${id}`)
    return response.data
  }

  const getContainerLogs = async (id: string, since?: number, until?: number): Promise<string[]> => {
    const sinceVal = since ? since : ''
    const untilVal = until ? until : ''
    const response = await agentHttp.get(`docker/containers/${id}/logs?since=${sinceVal}&until=${untilVal}`)
    return response.data
  }

  const execContainerCommand = async (id: string, cmd: string | string[]): Promise<AxiosResponse> => {
    const data = {
      command: Array.isArray(cmd) ? cmd : cmd.split(' '), // split string into array
    }
    return agentHttp.post(`docker/containers/${id}/exec`, data)
  }

  const _containerActionSync =
    (containerId: string, action: string, data: any, config?: AxiosRequestConfig) =>
    async (): Promise<TaskStatusResponse> => {
      const response = await agentHttp.post(`docker/containers/${containerId}/${action}`, data, config)
      return response.data
    }

  const _containerActionAsync =
    (containerId: string, action: string, data: any, config?: AxiosRequestConfig) =>
    async (): Promise<TaskStatusResponse> => {
      const response = await agentHttp.post(`docker/containers/${containerId}/${action}?async=1`, data, config)
      return response.data
    }

  const startContainer = (id: string) => _containerActionAsync(id, 'start', null)()

  const restartContainer = (id: string) => _containerActionAsync(id, 'restart', null)()

  const pauseContainer = (id: string) => _containerActionAsync(id, 'pause', null)()

  const stopContainer = (id: string) => _containerActionAsync(id, 'stop', null)()

  const removeContainer = (id: string) => _containerActionAsync(id, 'remove', null)()

  const runContainer = async (runData: any): Promise<TaskStatusResponse> => {
    const response = await agentHttp.post(`docker/containers/run`, runData)
    return response.data
  }

  const getSystemInfo = async (): Promise<any> => {
    const response = await agentHttp.get(`system/info`)
    return response.data
  }

  const getEngineInfo = async (): Promise<any> => {
    const response = await agentHttp.get(`docker/engine/info`)
    return response.data
  }

  const getEngineDf = async (): Promise<any> => {
    const response = await agentHttp.get(`docker/engine/df`)
    return response.data
  }

  const getEnginePing = async (): Promise<any> => {
    const response = await agentHttp.get(`docker/engine/ping`)
    return response.data
  }

  const getEngineEvents = async (args: { since?: number }): Promise<any> => {
    const response = await agentHttp.get(`docker/engine/events?since=${args.since || ''}`)
    return response.data
  }

  const getStacks = async (): Promise<IDockerContainer[]> => {
    const response = await agentHttp.get(`stacks`)
    return response.data
  }

  const createStack = async (data: any): Promise<TaskStatusResponse[]> => {
    const response = await agentHttp.post(`stacks/create`, data)
    return response.data
  }

  const getStack = async (id: string): Promise<IDockerContainer[]> => {
    const response = await agentHttp.get(`stacks/${id}`)
    return response.data
  }

  const _stackAction =
    (stackId: string, action: string, config?: AxiosRequestConfig) => async (): Promise<TaskStatusResponse> => {
      const response = await agentHttp.post(`stacks/${stackId}/${action}?async=1`, null, config)
      return response.data
    }

  const startStack = (id: string) => _stackAction(id, 'start')()

  const stopStack = (id: string) => _stackAction(id, 'stop')()

  const deleteStack = (id: string) => _stackAction(id, 'delete')()

  const destroyStack = (id: string) => _stackAction(id, 'destroy')()

  const syncStack = (id: string) => _stackAction(id, 'sync')()

  return {
    getImages,
    getVolumes,
    getNetworks,
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
    getSystemInfo,
    getEngineInfo,
    getEngineDf,
    getEnginePing,
    getEngineEvents,
    getStacks,
    createStack,
    getStack,
    startStack,
    stopStack,
    deleteStack,
    destroyStack,
    syncStack,
  }
}

export default agentDockerApi
