export interface IDockerContainer {
  id: string
  name?: string
  status?: string
  attrs: IDockerResourceAttrs
}

export interface IDockerImage {
  id: string
  tags?: string
  labels?: string[]
  attrs: IDockerResourceAttrs
}

export interface IDockerVolume {
  id: string
  name?: string
  status?: string
  attrs: IDockerResourceAttrs
}

export interface IDockerNetwork {
  id: string
  name?: string
  status?: string
  attrs: IDockerResourceAttrs
}

export interface IDockerResourceAttrs {
  [key: string]: any
}

export type DockerEngineDfData = {
  Containers?: IDockerResourceAttrs[]
  Images?: IDockerResourceAttrs[]
  Volumes?: IDockerResourceAttrs[]
  Networks?: IDockerResourceAttrs[]
}

export interface TaskStatusResponse<T = any> {
  task_id: string
  ref?: string
  status?: string
  error?: any
  result?: T
}

export type ContainerRegistry = {
  name: string
  host: string
  label?: string
  username?: string
  password?: string
}

export type StackRepository = {
  name: string
  host: string
  label?: string
  username?: string
  password?: string
}

export type StackTemplate = {
  //id: string
  type: string
  name: string
  description?: string
  repository?: StackRepository
  //categories: string[]
  //ports: string[]
  //volumes: string[]
  //networks: string[]
  //services: any
}

export type HostEnvironment = {
  id: string
  label: string
  apiBaseUrl: string
}

export type DockerHost = {
  id: string
  host: string
}
