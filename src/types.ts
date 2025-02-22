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

export interface IBackgroundTaskResponse<T = any> {
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
