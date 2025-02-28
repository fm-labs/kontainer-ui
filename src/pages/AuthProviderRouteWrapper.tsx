import React from 'react'
import { AuthProvider } from '../context/AuthProvider.tsx'
import { useAuthApi } from '../helper/useAuthApi.ts'
import { Outlet } from 'react-router-dom'

const AuthProviderRouteWrapper = () => {
  const authProcessor = useAuthApi()

  return (
    <AuthProvider authProcessor={authProcessor}>
      <Outlet />
    </AuthProvider>
  )
}

export default AuthProviderRouteWrapper
