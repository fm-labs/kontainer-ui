import { useEnvApi } from './useEnvApi.ts'
import * as React from 'react'
import { readEnvAuthToken, writeEnvAuthToken } from '~/lib/authStorage.ts'

export const useAuthApi = () => {
  const { api, env } = useEnvApi()
  const envId = env.id

  const readAuthToken = React.useCallback(() => {
    return readEnvAuthToken(envId)
  }, [envId])

  const saveAuthToken = React.useCallback(
    (token: string | null) => {
      writeEnvAuthToken(envId, token)
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
    saveAuthToken(null)
  }

  return {
    restoreAuthToken: readAuthToken,
    login: login,
    logout: logout,
  }
}
