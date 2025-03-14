import { useEnvApi } from './useEnvApi.ts'
import * as React from 'react'

export const useAuthApi = () => {
  const { api, env } = useEnvApi()
  const envId = env.id

  const readAuthToken = React.useCallback(() => {
    return localStorage.getItem(envId + '.authToken') || undefined
  }, [envId])

  const saveAuthToken = React.useCallback(
    (token: string | undefined) => {
      if (!token) {
        return localStorage.removeItem(envId + '.authToken')
      }
      return localStorage.setItem(envId + '.authToken', token)
    },
    [envId],
  )

  const login = async (data: FormData) => {
    console.log('AUTHAPIHELPER: login', data)
    const response = await api.postLogin(data)
    const token = response?.access_token
    saveAuthToken(token)
    return {
      token: token,
    }
  }

  const logout = async () => {
    console.log('AUTHAPIHELPER: logout')
    await api.postLogout()
    saveAuthToken(undefined)
  }

  return {
    restoreAuthToken: readAuthToken,
    login: login,
    logout: logout,
  }
}
