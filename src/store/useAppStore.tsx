import React from 'react'
import { IStore, IStoreContext } from './store.types.ts'
import { initialState } from './initialStore.tsx'

export const useAppStore = () => {

  const AppStoreContext = React.createContext<IStoreContext<IStore>>({
    state: initialState,
    dispatch: () => null,
  })

  return React.useContext(AppStoreContext)
}

