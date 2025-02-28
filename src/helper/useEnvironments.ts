import React from 'react'
import { MASTER_AGENT_HOST, MASTER_AGENT_LABEL, MASTER_AGENT_PORT, MASTER_AGENT_SSL } from '../constants.ts'

type Env = {
  id: string
  label: string
  hostname: string
  agentPort: number
  useSSL: boolean
  authToken?: string
}

export const DEFAULT_ENVIRONMENT: Env = {
  id: '0',
  label: MASTER_AGENT_LABEL,
  hostname: MASTER_AGENT_HOST,
  agentPort: MASTER_AGENT_PORT,
  useSSL: MASTER_AGENT_SSL,
}

export const saveEnvsInLocalStorage = (envs: Env[]) => {
  localStorage.setItem('kstack.environments', JSON.stringify(envs))
}

export const restoreEnvsFromLocalStorage = () => {
  const envs = localStorage.getItem('kstack.environments')
  if (!envs) return
  return JSON.parse(envs)
}

const useEnvironments = () => {
  const [envs, setEnvs] = React.useState<Env[]>([DEFAULT_ENVIRONMENT])

  React.useEffect(() => {
    const envs = restoreEnvsFromLocalStorage()
    if (envs) {
      setEnvs(envs)
    }
  }, [])

  const addEnv = (env: Env) => {
    const newEnvs = [...envs, env]
    setEnvs(newEnvs)
    saveEnvsInLocalStorage(newEnvs)
  }

  return { envs, addEnv }
}

export default useEnvironments
