import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { IDockerContainer, IDockerResourceAttrs } from '../types.ts'
import { apiHttp } from './apiHttp.ts'

const getStacks = (config?: AxiosRequestConfig) => async (): Promise<IDockerContainer[]> => {
  const response = await apiHttp().get(`stacks`, config)
  return response.data
}

const createStack =
  (config?: AxiosRequestConfig) =>
  async (data: any): Promise<AxiosResponse> => {
    return await apiHttp().post(`stacks/create`, data, config)
  }

const getStack =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<IDockerContainer[]> => {
    const response = await apiHttp().get(`stack/${id}`, config)
    return response.data
  }

const startStack =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<AxiosResponse> => {
    return await apiHttp().post(`stack/start/${id}`, null, config)
  }

const stopStack =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<AxiosResponse> => {
    return await apiHttp().post(`stack/stop/${id}`, null, config)
  }

const removeStack =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<AxiosResponse> => {
    return await apiHttp().post(`stack/remove/${id}`, null, config)
  }

const getImages = (config?: AxiosRequestConfig) => async (): Promise<IDockerResourceAttrs[]> => {
  const response = await apiHttp().get(`images`, config)
  return response.data
}

const getVolumes = (config?: AxiosRequestConfig) => async (): Promise<IDockerResourceAttrs[]> => {
  const response = await apiHttp().get(`volumes`, config)
  return response.data
}

const getNetworks = (config?: AxiosRequestConfig) => async (): Promise<IDockerResourceAttrs[]> => {
  const response = await apiHttp().get(`networks`, config)
  return response.data
}

const getContainers = (config?: AxiosRequestConfig) => async (): Promise<IDockerResourceAttrs[]> => {
  const response = await apiHttp().get(`containers`, config)
  return response.data
}

const getContainer =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<IDockerContainer[]> => {
    const response = await apiHttp().get(`container/${id}`, config)
    return response.data
  }

const startContainer =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<AxiosResponse> => {
    return await apiHttp().post(`container/start/${id}`, null, config)
  }

const restartContainer =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<AxiosResponse> => {
    return await apiHttp().post(`container/start/${id}?restart=1`, null, config)
  }

const pauseContainer =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<AxiosResponse> => {
    return await apiHttp().post(`container/pause/${id}`, null, config)
  }

const stopContainer =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<AxiosResponse> => {
    return await apiHttp().post(`container/stop/${id}`, null, config)
  }

const removeContainer =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<AxiosResponse> => {
    return await apiHttp().post(`container/remove/${id}`, null, config)
  }

const runContainer =
  (config?: AxiosRequestConfig) =>
  async (runData: any): Promise<AxiosResponse> => {
    return await apiHttp().post(`containers/run`, runData, config)
  }

const launchPortainerTemplate =
  (config?: AxiosRequestConfig) =>
  async (template: any): Promise<AxiosResponse> => {
    return await apiHttp().post(`portainer/templates/launch`, template, config)
  }

const getSystemInfo = (config?: AxiosRequestConfig) => async (): Promise<any> => {
  const response = await apiHttp().get(`system/info`, config)
  return response.data
}

const getEngineInfo = (config?: AxiosRequestConfig) => async (): Promise<any> => {
  const response = await apiHttp().get(`engine/info`, config)
  return response.data
}

const getEngineDf = (config?: AxiosRequestConfig) => async (): Promise<any> => {
  const response = await apiHttp().get(`engine/df`, config)
  return response.data
}

const getEnginePing = (config?: AxiosRequestConfig) => async (): Promise<any> => {
  const response = await apiHttp().get(`engine/ping`, config)
  return response.data
}

const getEngineEvents =
  (config?: AxiosRequestConfig) =>
  async (args: { since?: number }): Promise<any> => {
    const response = await apiHttp().get(`engine/events?since=${args.since || ''}`, config)
    return response.data
  }

const api = {
  getStacks,
  createStack,
  getStack,
  startStack,
  stopStack,
  removeStack,
  getContainers,
  getContainer,
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
export default api
