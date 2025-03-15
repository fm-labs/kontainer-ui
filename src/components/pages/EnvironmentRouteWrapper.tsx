import React from 'react'
import { Outlet } from 'react-router-dom'
import { EnvironmentProvider } from '../../helper/useEnvironmentContext.tsx'
import { useEnvRoute } from '~/helper/useEnvRoute.ts'
import { useAuthApi } from '~/helper/useAuthApi.ts'
import { AuthProvider } from '../../helper/useAuth.tsx'

const EnvironmentRouteWrapper = () => {
  const envRoute = useEnvRoute()
  if (!envRoute.isEnvRoute || !envRoute.env) {
    return <div>Not a valid environment</div>
  }

  const authProcessor = useAuthApi()

  return (
    <EnvironmentProvider initialState={envRoute.env}>
      <AuthProvider authProcessor={authProcessor}>
        <Outlet />
      </AuthProvider>
    </EnvironmentProvider>
  )
}

export default EnvironmentRouteWrapper
