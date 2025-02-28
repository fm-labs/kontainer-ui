import React from 'react'

interface AuthProcessor {
  restoreAuthToken: () => string | undefined
  login: (data: FormData) => Promise<{ token: string }>
  logout: () => Promise<void>
}

interface AuthContext {
  authToken?: string
  isAuthenticated: boolean
  login: (data: FormData) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContext | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode; authProcessor: AuthProcessor }> = ({
  children,
  authProcessor,
}) => {
  //const storedAuthToken = localStorage.getItem('authToken') || undefined
  const storedAuthToken = authProcessor.restoreAuthToken()
  const [authToken, setAuthToken] = React.useState<string | undefined>(storedAuthToken)

  const login = async (data: FormData) => {
    console.log('AUTH: login', data)

    const username = data?.get('username')
    const password = data?.get('password')

    if (username !== 'admin' || password !== 'admin') {
      console.log('Invalid username or password', username, password)
      throw new Error('Invalid username or password')
    }

    const authResponse = await authProcessor.login(data)
    // @todo - Login error handling
    const authToken = authResponse?.token
    console.log('AUTH: login success', authToken)
    setAuthToken(authToken)
    //localStorage.setItem('authToken', authToken)
  }

  const logout = async () => {
    await authProcessor
      .logout()
      .catch((error) => {
        console.error('Logout error', error)
        // @todo - Logout error handling
      })
      .finally(() => {
        setAuthToken(undefined)
        //localStorage.removeItem('authToken')
      })
  }

  const authContext = { authToken: authToken, login: login, logout: logout, isAuthenticated: !!authToken }

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContext => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
