import { buildAgentHttp } from '~/lib/agentHttp.ts'
import { ContainerRegistry, IDockerContainer, TaskStatusResponse } from '~/types.ts'

export const agentInternalApiForEnv = (env) => {
  return agentInternalApi(buildAgentHttp(env))
}

const agentInternalApi = (agentHttp) => {
  const postLogin = async (data: FormData): Promise<{ access_token: string }> => {
    const response = await agentHttp.post(`auth/login`, data)
    return response.data
  }

  const postLogout = async (): Promise<void> => {
    const response = await agentHttp.post(`auth/logout`)
    return response.data
  }

  const getEnvironments = async (): Promise<any[]> => {
    const response = await agentHttp.get(`environments`)
    return response.data
  }

  const connectToDockerHost = async (dockerHostId: string): Promise<any> => {
    const response = await agentHttp.post(`environments/${dockerHostId}/connect`)
    return response.data
  }

  const submitTask = async (task: any): Promise<TaskStatusResponse> => {
    const response = await agentHttp.post(`tasks`, task)
    return response.data
  }

  const getTaskStatus = async (taskId: string): Promise<TaskStatusResponse> => {
    const response = await agentHttp.get(`tasks/${taskId}/status`)
    return response.data
  }

  const listTemplates = async (): Promise<any> => {
    const response = await agentHttp.get(`templates`)
    return response.data
  }

  const getTemplate = async (id: string): Promise<any> => {
    const response = await agentHttp.get(`templates/${id}`)
    return response.data
  }

  const addTemplate = async (data: any): Promise<TaskStatusResponse> => {
    const response = await agentHttp.post(`templates`, data)
    return response.data
  }

  const launchPortainerTemplate = async (template: any): Promise<TaskStatusResponse> => {
    const response = await agentHttp.post(`portainer/templates/launch`, template)
    return response.data
  }

  const getContainerRegistries = async (): Promise<ContainerRegistry[]> => {
    const response = await agentHttp.get(`admin/registries`)
    return response.data
  }

  const updateContainerRegistry = async (registryName: string, data: any): Promise<any> => {
    const response = await agentHttp.post(`admin/registries/${registryName}`, data)
    return response.data
  }

  const deleteContainerRegistry = async (registryName: string): Promise<any> => {
    const response = await agentHttp.delete(`admin/registries/${registryName}`)
    return response.data
  }

  const loginContainerRegistry = async (registryName: string, data: any): Promise<any> => {
    const response = await agentHttp.post(`admin/registries/${registryName}/login`, data)
    return response.data
  }

  const listPrivateKeys = async (): Promise<string[]> => {
    const response = await agentHttp.get(`admin/keys`)
    return response.data
  }

  const updatePrivateKey = async (keyName: string, data: any): Promise<any> => {
    const response = await agentHttp.post(`admin/keys`, data)
    return response.data
  }

  const deletePrivateKey = async (keyName: string): Promise<any> => {
    const response = await agentHttp.delete(`admin/keys/${keyName}`)
    return response.data
  }

  return {
    postLogin,
    postLogout,
    getEnvironments,
    connectToDockerHost,
    submitTask,
    getTaskStatus,
    listTemplates,
    getTemplate,
    addTemplate,
    launchPortainerTemplate,
    getContainerRegistries,
    updateContainerRegistry,
    deleteContainerRegistry,
    loginContainerRegistry,
    listPrivateKeys,
    updatePrivateKey,
    deletePrivateKey,
  }
}

export default agentInternalApi
