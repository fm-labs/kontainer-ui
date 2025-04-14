import React from 'react'
import { Outlet, useMatches } from 'react-router-dom'
import { DockerHostContextProvider } from '~/helper/useDockerContext.tsx'
import { useEnvironment } from '~/helper/useEnvironmentContext.tsx'
import Layout from '~/layout/Layout'
import Toolbar from '@mui/material/Toolbar'
import { Breadcrumbs, Typography } from '@mui/material'
import Link from '@mui/material/Link'
import { SiDocker } from 'react-icons/si'

const DockerBreadcrumbs = () => {
  const matches = useMatches()
  const { environment, dockerHosts } = useEnvironment()

  if (!matches || matches.length <= 1) {
    return
  }
  // The first match contains the host alias
  const match = matches[1]
  const contextId = match.params.contextId

  if (!contextId) {
    console.error('Docker context not found')
    return <div>Docker context not found</div>
  }

  const dockerHost = dockerHosts.find((host) => host.id === contextId)
  if (!dockerHost) {
    console.error('Docker host not found')
    return <div>Docker host not found</div>
  }

  return (
    <div>
      <Breadcrumbs maxItems={5} aria-label='breadcrumb'>
        <Link underline='hover' color='inherit' href='#'>
          All Environments
        </Link>
        <Typography sx={{ color: 'text.primary' }}>
          <SiDocker /> {dockerHost.id}
        </Typography>
      </Breadcrumbs>
    </div>
  )
}

const DockerContextRouteWrapper = () => {
  const matches = useMatches()
  const { environment, dockerHosts } = useEnvironment()

  if (!matches || matches.length <= 1) {
    return
  }
  // The first match contains the host alias
  const match = matches[1]
  const contextId = match.params.contextId

  console.log('contextId', contextId, environment.id, dockerHosts)

  if (!contextId) {
    console.error('Docker context not found')
    return <div>Docker context not found</div>
  }

  const dockerHost = dockerHosts.find((host) => host.id === contextId)
  if (!dockerHost) {
    console.error('Docker host not found')
    return <div>Docker host not found</div>
  }

  return (
    <DockerHostContextProvider dockerHost={dockerHost}>
      <Layout>
        <Toolbar>
          <DockerBreadcrumbs />
        </Toolbar>
        <Outlet />
      </Layout>
    </DockerHostContextProvider>
  )
}

export default DockerContextRouteWrapper
