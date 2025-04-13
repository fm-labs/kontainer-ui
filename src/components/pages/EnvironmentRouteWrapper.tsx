import React from 'react'
import { Outlet } from 'react-router-dom'
import { EnvironmentProvider } from '../../helper/useEnvironmentContext.tsx'
import { useAgentAuthProcessor } from '~/helper/useAgentAuthProcessor.ts'
import { AuthProvider } from '../../helper/useAuth.tsx'
import { TaskManagerProvider } from '~/components/tasks/TaskManagerContext.tsx'
import { DEFAULT_ENVIRONMENT } from '~/constants.ts'

const EnvironmentRouteWrapper = () => {
  // const envRoute = useEnvRoute()
  // if (!envRoute.isEnvRoute || !envRoute.env) {
  //   return <div>Not a valid environment</div>
  // }

  const hostEnv = DEFAULT_ENVIRONMENT
  const authProcessor = useAgentAuthProcessor()

  return (
    <EnvironmentProvider host={hostEnv}>
      <AuthProvider authProcessor={authProcessor}>
        <TaskManagerProvider>
          <Outlet />
        </TaskManagerProvider>
      </AuthProvider>
    </EnvironmentProvider>
  )
}

export default EnvironmentRouteWrapper
