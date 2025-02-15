import React, { createContext, useState, useContext, ReactNode } from 'react'

interface Environment {
  hostname: string
  autoconnect?: boolean
}

interface EnvironmentContextProps {
  environment: Environment
  setEnvironment: React.Dispatch<React.SetStateAction<Environment>>
}

const EnvironmentContext = createContext<EnvironmentContextProps | undefined>(undefined)

export const EnvironmentProvider: React.FC<{ children: ReactNode; initialState: Environment }> = ({
  children,
  initialState,
}) => {
  // const defaultState = {
  //   hostname: 'localhost',
  //   autoconnect: true,
  // }
  const [environment, setEnvironment] = useState<Environment>(initialState)

  return <EnvironmentContext.Provider value={{ environment, setEnvironment }}>{children}</EnvironmentContext.Provider>
}

export const useEnvironment = (): EnvironmentContextProps => {
  const context = useContext(EnvironmentContext)
  if (!context) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider')
  }
  return context
}
