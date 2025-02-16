import { useAppStore } from '../context/AppContext.tsx'
import { useNavigate } from 'react-router'

const useAuth = () => {
  const { appStore, setAppStore } = useAppStore()
  const navigate = useNavigate()

  const login = async (data) => {
    const authToken = 'super-secret-authtoken'
    setAppStore({ ...appStore, authToken: authToken })
  }

  const logout = async () => {
    setAppStore({ ...appStore, authToken: undefined })
  }

  return { login, logout, isAuthenticated: !!appStore.authToken }
}

export default useAuth
