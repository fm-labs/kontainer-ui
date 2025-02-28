import React from 'react'
import { useRouteError } from 'react-router-dom'
import Container from '@mui/material/Container'
import Layout from '../layout/Layout.tsx'
import { MASTER_AGENT_API_BASEURL } from '../constants.ts'
import { useEnvRoute } from '../helper/useEnvRoute.ts'

const RoutingErrorBoundary = () => {
  const error = useRouteError() as any
  const envRoute = useEnvRoute()
  console.error(error)
  // Uncaught ReferenceError: path is not defined

  return (
    <>
      <Container className={'text-center'} sx={{ mt: 10 }}>
        <span className={'fw-bold'}>Oooops, something went wrong :/</span>
        <h1 className={'my-5'}>{error && error?.message && error?.message}</h1>

        {error?.status === 401 && (
          <div>
            You are not authorized to view this page.
            {envRoute && (
              <p>
                Please <a href={`/${envRoute.envId}/connect`}>login</a> first.
              </p>
            )}
          </div>
        )}

        {error?.message?.toLowerCase() === 'network error' && (
          <p>
            Are you sure the kstack-agent server is running on{' '}
            <a target={'_blank'} href={MASTER_AGENT_API_BASEURL} rel='noreferrer'>
              {MASTER_AGENT_API_BASEURL}
            </a>{' '}
            ?
          </p>
        )}
      </Container>
    </>
  )
}

export default RoutingErrorBoundary
