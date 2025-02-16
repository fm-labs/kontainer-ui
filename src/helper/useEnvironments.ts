import React from 'react'

export const defaultEnvs = [
  {
    id: '0',
    hostname: 'localhost',
    label: 'Local',
    agentPort: 5000,
    useSSL: false,
  },
  {
    id: '1',
    hostname: 'localhost',
    label: 'Local Dev',
    agentPort: 5000,
    useSSL: false,
  },
]

export const saveEnvsInLocalStorage = (envs: any[]) => {
  localStorage.setItem('kstack.environments', JSON.stringify(envs))
}

export const restoreEnvsFromLocalStorage = () => {
  const envs = localStorage.getItem('kstack.environments')
  if (!envs) return
  return JSON.parse(envs)
}

const useEnvironments = () => {
  const [envs, setEnvs] = React.useState(defaultEnvs)

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
