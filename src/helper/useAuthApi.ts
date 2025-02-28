import { useEnvApi } from './useEnvApi.ts'

export const useAuthApi = () => {
  const api = useEnvApi()

  const login = async (data: FormData) => {
    console.log('AUTHAPIHELPER: login', data)
    const response = await api.postLogin(data)
    return {
      token: response?.access_token,
    }
  }

  const logout = () => {
    console.log('AUTHAPIHELPER: logout')
    return api.postLogout()
  }

  return {
    login: login,
    logout: logout,
  }
}
