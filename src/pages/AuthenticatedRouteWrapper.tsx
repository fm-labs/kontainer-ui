import React from 'react'
import { useAppStore } from '../context/AppContext.tsx'
import { Link, Navigate, Outlet, useMatches } from 'react-router-dom'
import { useLocation } from 'react-router'

const AuthenticatedRouteWrapper = () => {
  const { appStore, setAppStore } = useAppStore()
  const location = useLocation()
  const route = useMatches()

  const renderNotAuthenticated = () => {
    return (
      <div>
        Not authenticated <Link to={`/auth/login?goto=${''}`}>Go to Login</Link>
      </div>
    )
  }

  const redirectToLogin = () => {
    return (
      <div>
        Redirecting to login...
        <Navigate to={`/auth/login?goto=${location.pathname}`} />
      </div>
    )
  }

  if (!appStore) {
    return <div>Loading...</div>
  }

  if (!appStore.authToken) {
    //return renderNotAuthenticated()
    return redirectToLogin()
  }

  return (
    <>
      <Outlet />
    </>
  )
}

export default AuthenticatedRouteWrapper
