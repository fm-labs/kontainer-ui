import React from 'react'
import { useRouteError } from 'react-router-dom'
import Container from '@mui/material/Container'
import { useEnvRoute } from '~/helper/useEnvRoute.ts'

const RoutingErrorBoundary = () => {
  const error = useRouteError() as any
  const envRoute = useEnvRoute()
  console.error(error)
  // Uncaught ReferenceError: path is not defined

  const renderError = (error) => {
    if (error?.status === 401) {
      return (
        <div>
          You are not authorized to view this page.
          {envRoute && (
            <p>
              Please <a href={`/${envRoute.envId}/connect`}>login</a> first.
            </p>
          )}
        </div>
      )
    }

    if (error?.message?.toLowerCase() === 'network error') {
      return <p>No connection to the agent ...</p>
    }

    return (
      <div>
        <div>Unknown error</div>
        <div>{error && error?.message && error?.message}</div>
        <div>
          <a
            href={'/'}
            onClick={(ev) => {
              ev.stopPropagation()
              ev.preventDefault()
              window.location.reload()
              return false
            }}
          >
            Reload
          </a>{' '}
          | <a href={'/'}>Go back</a>
        </div>
      </div>
    )
  }

  return (
    <>
      <Container className={'text-center'} sx={{ mt: 10 }}>
        <span className={'fw-bold'}>Oooops, something went wrong :/</span>
        <h1 className={'my-5'}>{error && error?.message && error?.message}</h1>
        {renderError(error)}
      </Container>
    </>
  )
}

export default RoutingErrorBoundary
