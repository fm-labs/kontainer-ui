import { useEnvApi } from './useEnvApi.ts'

export const useAuthApi = () => {
  const { api, restoreAuthToken, saveAuthToken } = useEnvApi()

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
    restoreAuthToken: restoreAuthToken,
    login: login,
    logout: logout,
  }
}
