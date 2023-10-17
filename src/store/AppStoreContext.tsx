import React from 'react'
import { initialState } from './initialStore.tsx'
import { IStore, IStoreContext } from './store.types.ts'

export const AppStoreContext = React.createContext<IStoreContext<IStore>>({
  state: initialState,
  dispatch: () => null,
})
