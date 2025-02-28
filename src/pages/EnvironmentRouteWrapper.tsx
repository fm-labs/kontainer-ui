import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { EnvironmentProvider } from '../context/EnvironmentContext.tsx'
import { useEnvRoute } from '../helper/useEnvRoute.ts'
import Layout from '../layout/Layout.tsx'
import Container from '@mui/material/Container'

const EnvironmentRouteWrapper = () => {
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
      {/*<Layout>*/}
      {/*<Container maxWidth={false} style={{ fontSize: '0.9em' }}>
        <Link to={'/'}>Environments</Link>
        {' > '}
        <Link to={`/${envRoute.envId}`}>{envRoute.env?.label || envRoute.env?.hostname}</Link>
      </Container>*/}
      <Outlet />
      {/*</Layout>*/}
    </EnvironmentProvider>
  )
}

export default EnvironmentRouteWrapper
