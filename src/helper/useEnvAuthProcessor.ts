import * as React from 'react'
import { readAuthToken, storeAuthToken } from '~/lib/authStorage.ts'
import useKontainerApi from '~/helper/useKontainerApi.ts'

export const useEnvAuthProcessor = () => {
  const api = useKontainerApi()

  const authScope = 'env0' // TODO: useEnvironmentContext to get the current environment
  const storedAuthToken = readAuthToken(authScope)
  const [authToken, setAuthToken] = React.useState<string | null>(storedAuthToken)

  const login = async (data: FormData) => {
    console.log('AUTHAPIHELPER: login', data)
    const response = await api.postLogin(data)
    // .finally(() => {
    //   // make sure we start with a clean slate
    //   repo.resetDb()
    // })
    const token = response?.access_token
    storeAuthToken(authScope, token)
    setAuthToken(token)
    return {
      token: token,
    }
  }

  const logout = async () => {
    console.log('AUTHAPIHELPER: logout')
    await api.postLogout().finally(() => {
      storeAuthToken(authScope, null)
      setAuthToken(null)
    })
  }

  return {
    authToken: authToken,
    login: login,
    logout: logout,
  }
}
