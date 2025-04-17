import React from 'react'
import { checkJwtTokenIsValid } from '~/helper/useJwt.tsx'
import { kontainerApiForEnv } from '~/lib/kontainerApi.ts'
import { useEnvironment } from '~/helper/useEnvironmentContext.tsx'

interface AuthProcessor {
  login: (data: FormData) => Promise<{ token: string }>
  logout: () => Promise<void>
  authToken: string | null
}

interface AuthContext {
  authToken: string | null
  isAuthenticated: boolean
  login: (data: FormData) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContext | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode; authProcessor: AuthProcessor }> = ({
  children,
  authProcessor,
}) => {
  const AUTH_CHECK_INTERVAL = 60000 // 1 minute

  const { environment, setDockerHosts } = useEnvironment()

  const login = async (data: FormData) => {
    // console.log('AUTH: login', data)
    await authProcessor.login(data)
  }

  const logout = async () => {
    // console.log('AUTH: logout')
    await authProcessor.logout()
  }

  const checkAuthToken = () => {
    const token = authProcessor.authToken
    console.log('AUTH: checking auth token', token)
    if (!token) {
      return
    }

    if (!checkJwtTokenIsValid(token)) {
      console.log('AUTH: token expired')
      logout().finally(() => window.location.reload())
    }
  }

  const fetchEnvDockerHosts = React.useCallback(async () => {
    const api = kontainerApiForEnv(environment)
    const dockerHosts = await api.getEnvironments()

    // const envDataUrl = `//${host.hostname}:${host.agentPort}/api/environments`
    // console.log('Fetching environment docker hosts from', envDataUrl)
    // const response = await fetch(envDataUrl)
    // const json = await response.json()
    // const dockerHosts: DockerHost[] = json?.dockerHosts || []
    console.log('Docker hosts:', dockerHosts)
    setDockerHosts(dockerHosts)
  }, [environment, authProcessor.authToken])

  React.useEffect(() => {
    fetchEnvDockerHosts()
  }, [fetchEnvDockerHosts])

  React.useEffect(() => {
    const interval = setInterval(() => {
      checkAuthToken()
    }, AUTH_CHECK_INTERVAL)

    return () => clearInterval(interval) // Cleanup on unmount
  }, [authProcessor])

  const authToken = authProcessor.authToken
  const authContext = { login: login, logout: logout, authToken: authToken, isAuthenticated: !!authToken }
  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContext => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
