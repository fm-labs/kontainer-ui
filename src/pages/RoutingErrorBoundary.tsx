import React from 'react'
import { useRouteError } from 'react-router-dom'
import Container from '@mui/material/Container'
import Layout from '../layout/Layout.tsx'
import { AGENT_API_BASEURL } from '../constants.ts'

const RoutingErrorBoundary = () => {
  const error = useRouteError() as Error
  console.error(error)
  // Uncaught ReferenceError: path is not defined

  return (
    <Layout>
      <Container className={'text-center'}>
        <span className={'fw-bold'}>Sappalot, something went wrong :/</span>
        <h1 className={'my-5'}>{error && error?.message && error?.message}</h1>

        {error?.message?.toLowerCase() === 'network error' && (
          <p>
            Are you sure the kstack-agent server is running on{' '}
            <a target={'_blank'} href={AGENT_API_BASEURL} rel='noreferrer'>
              {AGENT_API_BASEURL}
            </a>{' '}
            ?
          </p>
        )}
      </Container>
    </Layout>
  )
}

export default RoutingErrorBoundary
