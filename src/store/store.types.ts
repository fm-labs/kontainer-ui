import React from 'react'

export type IStore = {
  error: any
  loading: any
}

export type IStoreAction = {
  type: string
  payload?: any
}
export type IStoreContext<T> = {
  state: T
  dispatch: React.Dispatch<IStoreAction>
}
