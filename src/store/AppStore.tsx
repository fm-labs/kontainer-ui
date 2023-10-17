import React from 'react'
import AppReducer from './AppReducer'
import { initialState } from './initialStore.tsx'
import { AppStoreContext } from './AppStoreContext.tsx'

const AppStore = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(AppReducer, initialState)
  //console.log("APPSTORE:INIT", state, dispatch)
  return <AppStoreContext.Provider value={{ state, dispatch }}>{children}</AppStoreContext.Provider>
}

export default AppStore
