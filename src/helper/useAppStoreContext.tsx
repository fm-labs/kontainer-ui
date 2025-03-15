import React, { createContext, useState, useContext, ReactNode } from 'react'
import { loadAppStore, persistAppStore } from '../lib/appStore.ts'

interface AppStore {
  authToken?: string
}

interface AppStoreContextProps {
  appStore: AppStore
  setAppStore: React.Dispatch<React.SetStateAction<AppStore>>
}

const AppStoreContext = createContext<AppStoreContextProps | undefined>(undefined)

export const AppStoreProvider: React.FC<{ children: ReactNode; initialState?: AppStore }> = ({
  children,
  initialState,
}) => {
  const defaultState = {
    authToken: undefined,
  }
  const appState = { ...defaultState, ...initialState, ...loadAppStore() }
  const [appStore, setAppStore] = useState<AppStore>(appState)

  React.useEffect(() => {
    //console.log('AppStoreProvider: appStore', appStore)
    persistAppStore(appStore)
  }, [appStore])

  return <AppStoreContext.Provider value={{ appStore, setAppStore }}>{children}</AppStoreContext.Provider>
}

export const useAppStore = (): AppStoreContextProps => {
  const context = useContext(AppStoreContext)
  if (!context) {
    throw new Error('useAppStore must be used within an AppStoreProvider')
  }
  return context
}
