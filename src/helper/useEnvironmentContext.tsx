import React, { createContext, useState, useContext, ReactNode } from 'react'
import { DockerEngineDfData, HostEnvironment } from '../types.ts'
import { useAutoreload } from '~/helper/useAutoreload.ts'
import api from '~/lib/api2.ts'

interface EnvironmentContextProps {
  environment: HostEnvironment
  setEnvironment: React.Dispatch<React.SetStateAction<HostEnvironment>>
  df: DockerEngineDfData
  setDf: React.Dispatch<React.SetStateAction<DockerEngineDfData>>
  buildUrl: (path: string) => string
}

const EnvironmentContext = createContext<EnvironmentContextProps | undefined>(undefined)

export const EnvironmentProvider: React.FC<{ children: ReactNode; initialState: HostEnvironment }> = ({
  children,
  initialState,
}) => {
  // const defaultState = {
  //   hostname: 'localhost',
  //   autoconnect: true,
  // }
  const [environment, setEnvironment] = useState<HostEnvironment>(initialState)
  const [df, setDf] = useState<DockerEngineDfData>({})

  const fetchData = React.useCallback(() => {
    console.log('Fetching Engine df data...')
    api(environment)
      .getEngineDf()
      .then((data) => {
        //console.log('Engine df data loaded', data)
        setDf(data)
      })
  }, [environment])

  const buildUrl = React.useCallback(
    (path: string) => {
      return `/${environment.id}${path}`
    },
    [environment],
  )

  useAutoreload(fetchData)

  const context = { environment, setEnvironment, df, setDf, buildUrl }
  return <EnvironmentContext.Provider value={context}>{children}</EnvironmentContext.Provider>
}

export const useEnvironment = (): EnvironmentContextProps => {
  const context = useContext(EnvironmentContext)
  if (!context) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider')
  }
  return context
}
