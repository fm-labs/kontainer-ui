import React from 'react'

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
  const login = async (data: FormData) => {
    // console.log('AUTH: login', data)
    await authProcessor.login(data)
  }

  const logout = async () => {
    // console.log('AUTH: logout')
    await authProcessor.logout()
  }

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
