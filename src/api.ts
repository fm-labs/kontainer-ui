import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { DOCKER_HTTP_BASEURL } from './constants.ts'

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

const getContainers = (config?: AxiosRequestConfig) => async (): Promise<IDockerContainer[]> => {
  const response = await http.get(`containers`, config)
  return response.data
}

const getImages = (config?: AxiosRequestConfig) => async (): Promise<IDockerImage[]> => {
  const response = await http.get(`images`, config)
  return response.data
}

const getVolumes = (config?: AxiosRequestConfig) => async (): Promise<IDockerVolume[]> => {
  const response = await http.get(`volumes`, config)
  return response.data
}


const api = {
  getContainers,
  getImages,
  getVolumes,
}
export default api
