import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { DOCKER_HTTP_BASEURL } from './constants.ts'
import { IDockerContainer, IDockerResourceAttrs } from './types.ts'

const http = axios.create({
  baseURL: DOCKER_HTTP_BASEURL,
  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false,
  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'csrftoken',
  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-CSRFToken',
})

const getProjects = (config?: AxiosRequestConfig) => async (): Promise<IDockerContainer[]> => {
  const response = await http.get(`projects`, config)
  return response.data
}

const getProject =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<IDockerContainer[]> => {
    const response = await http.get(`project/${id}`, config)
    return response.data
  }

const startProject =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<AxiosResponse> => {
    return await http.post(`project/start/${id}`, null, config)
  }

const stopProject =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<AxiosResponse> => {
    return await http.post(`project/stop/${id}`, null, config)
  }

const removeProject =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<AxiosResponse> => {
    return await http.post(`project/remove/${id}`, null, config)
  }

const getImages = (config?: AxiosRequestConfig) => async (): Promise<IDockerResourceAttrs[]> => {
  const response = await http.get(`images`, config)
  return response.data
}

const getVolumes = (config?: AxiosRequestConfig) => async (): Promise<IDockerResourceAttrs[]> => {
  const response = await http.get(`volumes`, config)
  return response.data
}

const getNetworks = (config?: AxiosRequestConfig) => async (): Promise<IDockerResourceAttrs[]> => {
  const response = await http.get(`networks`, config)
  return response.data
}

const getContainers = (config?: AxiosRequestConfig) => async (): Promise<IDockerResourceAttrs[]> => {
  const response = await http.get(`containers`, config)
  return response.data
}

const getContainer =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<IDockerContainer[]> => {
    const response = await http.get(`container/${id}`, config)
    return response.data
  }

const startContainer =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<AxiosResponse> => {
    return await http.post(`container/start/${id}`, null, config)
  }

const restartContainer =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<AxiosResponse> => {
    return await http.post(`container/start/${id}?restart=1`, null, config)
  }

const pauseContainer =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<AxiosResponse> => {
    return await http.post(`container/pause/${id}`, null, config)
  }

const stopContainer =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<AxiosResponse> => {
    return await http.post(`container/stop/${id}`, null, config)
  }

const removeContainer =
  (config?: AxiosRequestConfig) =>
  async (id: string): Promise<AxiosResponse> => {
    return await http.post(`container/remove/${id}`, null, config)
  }

const api = {
  getProjects,
  getProject,
  startProject,
  stopProject,
  removeProject,
  getContainers,
  getContainer,
  startContainer,
  restartContainer,
  pauseContainer,
  stopContainer,
  removeContainer,
  getImages,
  getVolumes,
  getNetworks,
}
export default api
