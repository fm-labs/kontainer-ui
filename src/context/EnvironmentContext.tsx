import React, { createContext, useState, useContext, ReactNode } from 'react'
import { HostEnvironment } from '../types.ts'

interface EnvironmentContextProps {
  environment: HostEnvironment
  setEnvironment: React.Dispatch<React.SetStateAction<HostEnvironment>>
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

  return <EnvironmentContext.Provider value={{ environment, setEnvironment }}>{children}</EnvironmentContext.Provider>
}

// export const useEnvironment = (): EnvironmentContextProps => {
//   const context = useContext(EnvironmentContext)
//   if (!context) {
//     throw new Error('useEnvironment must be used within an EnvironmentProvider')
//   }
//   return context
// }
