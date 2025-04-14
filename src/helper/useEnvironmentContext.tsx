import React, { createContext, useContext, ReactNode } from 'react'
import { DockerHost, HostEnvironment } from '../types.ts'
import useAgentApi from '~/helper/useAgentApi.ts'
import { agentInternalApiForEnv } from '~/lib/agentInternalApi.ts'

interface EnvironmentContextProps {
  environment: HostEnvironment
  dockerHosts: DockerHost[]
  buildUrl: (path: string) => string
}

const EnvironmentContext = createContext<EnvironmentContextProps | undefined>(undefined)

export const EnvironmentProvider: React.FC<{ children: ReactNode; host: HostEnvironment }> = ({ children, host }) => {
  const buildUrl = React.useCallback(
    (path: string) => {
      //return `/${host.id}${path}`
      path = path.trim()
      if (path.startsWith('/')) {
        path = path.substring(1)
      }
      return `/${path}`
    },
    [host],
  )

  const fetchEnvDockerHosts = React.useCallback(async () => {
    const api = agentInternalApiForEnv(host)
    const dockerHosts = await api.getEnvironments()

    // const envDataUrl = `//${host.hostname}:${host.agentPort}/api/environments`
    // console.log('Fetching environment docker hosts from', envDataUrl)
    // const response = await fetch(envDataUrl)
    // const json = await response.json()
    // const dockerHosts: DockerHost[] = json?.dockerHosts || []
    console.log('Docker hosts:', dockerHosts)
    setDockerHosts(dockerHosts)
  }, [host])

  React.useEffect(() => {
    fetchEnvDockerHosts()
  }, [fetchEnvDockerHosts])

  const [dockerHosts, setDockerHosts] = React.useState<DockerHost[]>([])
  const context = { environment: host, dockerHosts: dockerHosts, buildUrl }
  return <EnvironmentContext.Provider value={context}>{children}</EnvironmentContext.Provider>
}

export const useEnvironment = (): EnvironmentContextProps => {
  const context = useContext(EnvironmentContext)
  if (!context) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider')
  }
  return context
}
