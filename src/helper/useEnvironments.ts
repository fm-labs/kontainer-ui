import React from 'react'
import { DEFAULT_ENVIRONMENTS } from '../constants.ts'

export const saveEnvsInLocalStorage = (envs: any[]) => {
  localStorage.setItem('kstack.environments', JSON.stringify(envs))
}

export const restoreEnvsFromLocalStorage = () => {
  const envs = localStorage.getItem('kstack.environments')
  if (!envs) return
  return JSON.parse(envs)
}

const useEnvironments = () => {
  const [envs, setEnvs] = React.useState(DEFAULT_ENVIRONMENTS)

  React.useEffect(() => {
    const envs = restoreEnvsFromLocalStorage()
    if (envs) {
      setEnvs(envs)
    }
  }, [])

  const addEnv = (env: any) => {
    const newEnvs = [...envs, env]
    setEnvs(newEnvs)
    saveEnvsInLocalStorage(newEnvs)
  }

  return { envs, addEnv }
}

export default useEnvironments
