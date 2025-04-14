import React from 'react'
import { Outlet } from 'react-router-dom'
import { EnvironmentProvider } from '../../helper/useEnvironmentContext.tsx'
import { TaskManagerProvider } from '~/components/tasks/TaskManagerContext.tsx'
import { DEFAULT_ENVIRONMENT } from '~/constants.ts'
import { EnvAuthProvider } from '~/helper/useEnvAuth.tsx'

const EnvironmentRouteWrapper = () => {
  // const envRoute = useEnvRoute()
  // if (!envRoute.isEnvRoute || !envRoute.env) {
  //   return <div>Not a valid environment</div>
  // }

  return (
    <EnvironmentProvider host={DEFAULT_ENVIRONMENT}>
      <EnvAuthProvider>
        <TaskManagerProvider>
          <Outlet />
        </TaskManagerProvider>
      </EnvAuthProvider>
    </EnvironmentProvider>
  )
}

export default EnvironmentRouteWrapper
