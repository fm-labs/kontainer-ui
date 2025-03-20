import { useEnvApi } from './useEnvApi.ts'
import * as React from 'react'
import { readEnvAuthToken, writeEnvAuthToken } from '~/lib/authStorage.ts'
import { useEnvRepo } from '~/helper/useEnvRepo.ts'

export const useEnvAuthApi = () => {
  const { api, env } = useEnvApi()
  const envId = env.id
  const storedAuthToken = readEnvAuthToken(envId)
  const [authToken, setAuthToken] = React.useState<string | null>(storedAuthToken)
  const repo = useEnvRepo()

  const login = async (data: FormData) => {
    console.log('AUTHAPIHELPER: login', data)
    const response = await api.postLogin(data).finally(() => {
      // make sure we start with a clean slate
      repo.resetDb()
    })
    const token = response?.access_token
    writeEnvAuthToken(envId, token)
    setAuthToken(token)
    return {
      token: token,
    }
  }

  const logout = async () => {
    console.log('AUTHAPIHELPER: logout')
    await api.postLogout().finally(() => {
      writeEnvAuthToken(envId, null)
      setAuthToken(null)
      repo.resetDb()
    })
  }

  return {
    authToken: authToken,
    login: login,
    logout: logout,
  }
}
