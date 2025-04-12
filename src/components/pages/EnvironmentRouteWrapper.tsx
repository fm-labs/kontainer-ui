import React from 'react'
import { Outlet } from 'react-router-dom'
import { EnvironmentProvider } from '../../helper/useEnvironmentContext.tsx'
import { useEnvRoute } from '~/helper/useEnvRoute.ts'
import { useEnvAuthApi } from '~/helper/useEnvAuthApi.ts'
import { AuthProvider } from '../../helper/useAuth.tsx'
import { TaskManagerProvider } from '~/components/tasks/TaskManagerContext.tsx'

const EnvironmentRouteWrapper = () => {
  const envRoute = useEnvRoute()
  if (!envRoute.isEnvRoute || !envRoute.env) {
    return <div>Not a valid environment</div>
  }

  const authProcessor = useEnvAuthApi()

  return (
    <EnvironmentProvider initialState={envRoute.env}>
      <AuthProvider authProcessor={authProcessor}>
        <TaskManagerProvider>
          <Outlet />
        </TaskManagerProvider>
      </AuthProvider>
    </EnvironmentProvider>
  )
}

export default EnvironmentRouteWrapper
