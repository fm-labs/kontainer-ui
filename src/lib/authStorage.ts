const buildStorageKey = (envId: string) => {
  const host = window.location.host.replace(':', '.')
  return `kstack.${host}.${envId}.at`
}

export const writeEnvAuthToken = (envId, token: string | null) => {
  const key = buildStorageKey(envId)
  if (token === null) {
    localStorage.removeItem(key)
    return
  }
  localStorage.setItem(key, token)
}

export const readEnvAuthToken = (envId) => {
  return localStorage.getItem(buildStorageKey(envId))
}
