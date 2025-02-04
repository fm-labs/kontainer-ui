import React from 'react'
import { AppStoreContext } from './AppStoreContext.tsx'

export const useStore = () => React.useContext(AppStoreContext)

// const AppStoreContext = React.createContext<IStoreContext<IStore>>({
//   state: initialState,
//   dispatch: () => null,
// })
//
// export const useStore = () => {
//
//   return React.useContext(AppStoreContext)
// }
