import React, { createContext, useContext, ReactNode } from 'react'
import { DockerHost, HostEnvironment } from '../types.ts'

interface EnvironmentContextProps {
  environment: HostEnvironment
  dockerHosts: DockerHost[]
  setDockerHosts: (dockerHosts: DockerHost[]) => void
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

  const [dockerHosts, setDockerHosts] = React.useState<DockerHost[]>([])
  const context = { environment: host, dockerHosts, setDockerHosts, buildUrl }
  return <EnvironmentContext.Provider value={context}>{children}</EnvironmentContext.Provider>
}

export const useEnvironment = (): EnvironmentContextProps => {
  const context = useContext(EnvironmentContext)
  if (!context) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider')
  }
  return context
}
