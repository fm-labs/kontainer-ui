import React from 'react'
//import { invoke } from '@tauri-apps/api'

// access the pre-bundled global API functions
const invokeStub = (...any: any[]) => console.log('NO TAURI')
const { invoke } =
  // @ts-ignore
  typeof window.__TAURI__ !== 'undefined'
    ? // @ts-ignore
      window.__TAURI__.tauri
    : { invoke: invokeStub }

export const useTauri = () => {
  const isTauri = React.useMemo(() => {
    // @ts-ignore
    return typeof window.__TAURI__ !== 'undefined' && typeof window.__TAURI__.tauri !== 'undefined'
  }, [])

  const greet = React.useCallback(
    (name: string = 'World') => {
      if (!isTauri) {
        console.log('NO TAURI CONTEXT')
        return
      }
      // invoke custom tauri command!
      invoke('greet', { name })
        // `invoke` returns a Promise
        .then((response: any) => console.log(response))
        .catch((error: any) => {
          console.error(error)
        })

      return () => {}
    },
    [isTauri],
  )

  React.useEffect(() => {
    //if (isTauri) {
    greet()
    //}
  }, [isTauri, greet])

  return { isTauri, greet }
}
