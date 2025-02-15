import React from 'react'
import { Outlet } from 'react-router-dom'
import { EnvironmentProvider } from '../context/Environment/EnvironmentContext.tsx'
import { useHostRoute } from '../helper/useHostRoute.ts'

const EnvironmentRoutingWrapper = () => {
  const envRoute = useHostRoute()

  if (!envRoute.inHostRoute) {
    return <>Not a valid environment route</>
  }

  const initialContextState = {
    hostname: 'localhost',
    autoconnect: true,
  }

  return (
    <EnvironmentProvider initialState={initialContextState}>
      <div>Environment: {envRoute.environment}</div>

      <Outlet />
    </EnvironmentProvider>
  )
}

export default EnvironmentRoutingWrapper
