import React from 'react'
import { Outlet } from 'react-router-dom'
import { EnvironmentProvider } from '../context/Environment/EnvironmentContext.tsx'
import { useEnvRoute } from '../helper/useEnvRoute.ts'

const EnvironmentRoutingWrapper = () => {
  const envRoute = useEnvRoute()

  if (!envRoute.isEnvRoute) {
    return <>Not a valid environment route</>
  }

  const initialContextState = {
    hostname: 'localhost',
    autoconnect: true,
  }

  return (
    <EnvironmentProvider initialState={initialContextState}>
      <div>
        EnvId={envRoute.envId} Env={envRoute.env?.id} / {envRoute.env?.hostname} / {envRoute.env?.label}
      </div>

      <Outlet />
    </EnvironmentProvider>
  )
}

export default EnvironmentRoutingWrapper
