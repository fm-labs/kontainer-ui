import React from 'react'
import { DEFAULT_ENVIRONMENT } from '../constants.ts'
import { HostEnvironment } from '../types.ts'

// export const saveEnvsInLocalStorage = (envs: HostEnvironment[]) => {
//   localStorage.setItem('kontainer.environments', JSON.stringify(envs))
// }
//
// export const restoreEnvsFromLocalStorage = () => {
//   const envs = localStorage.getItem('kontainer.environments')
//   if (!envs) return
//   return JSON.parse(envs)
// }

const useEnvironments = () => {
  const [envs, setEnvs] = React.useState<HostEnvironment[]>([DEFAULT_ENVIRONMENT])

  // React.useEffect(() => {
  //   const envs = restoreEnvsFromLocalStorage()
  //   if (envs) {
  //     setEnvs(envs)
  //   }
  // }, [])
  //
  // const addEnv = (env: HostEnvironment) => {
  //   const newEnvs = [...envs, env]
  //   setEnvs(newEnvs)
  //   saveEnvsInLocalStorage(newEnvs)
  // }

  return { dockerHosts: envs }
}

export default useEnvironments
