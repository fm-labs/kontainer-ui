import React, { createContext, useState, useContext, ReactNode } from 'react'
import { DockerEngineDfData, DockerHost } from '../types.ts'
import { useEnvironment } from '~/helper/useEnvironmentContext.tsx'
import agentDockerApi, { agentDockerApiForEnv } from '~/lib/agentDockerApi.ts'
import { useAutoreload } from '~/helper/useAutoreload.ts'
import { toast } from 'react-toastify'

interface DockerHostContextProps {
  dockerHost: DockerHost
  df: DockerEngineDfData
  buildUrl: (path: string) => string
  api: ReturnType<typeof agentDockerApi>
}

const DockerHostContext = createContext<DockerHostContextProps | undefined>(undefined)

export const DockerHostContextProvider: React.FC<{ children: ReactNode; dockerHost: DockerHost }> = ({
  children,
  dockerHost,
}) => {
  const [df, setDf] = useState<DockerEngineDfData>({})
  const { environment } = useEnvironment()

  const dockerApi = React.useMemo(() => {
    return agentDockerApiForEnv(environment, dockerHost)
  }, [dockerHost, environment])

  const fetchData = React.useCallback(() => {
    console.log('Fetching Engine df data...')
    dockerApi
      .getEngineDf()
      .then((data) => {
        //console.log('Engine df data loaded', data)
        setDf(data)
      })
      .catch((err) => {
        console.error('Error fetching Engine df data', err)
        setDf({})
        toast.error('Error fetching Engine df data: ' + err.message)
      })
  }, [dockerHost, dockerApi])

  const buildUrl = React.useCallback(
    (path: string) => {
      return `/docker/${dockerHost.id}${path}`
    },
    [dockerHost],
  )

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  useAutoreload(fetchData)

  const context = { dockerHost, df, buildUrl, api: dockerApi }
  return <DockerHostContext.Provider value={context}>{children}</DockerHostContext.Provider>
}

export const useDockerContext = (): DockerHostContextProps => {
  const context = useContext(DockerHostContext)
  if (!context) {
    throw new Error('useDockerHost must be used within an DockerHostProvider')
  }
  return context
}
