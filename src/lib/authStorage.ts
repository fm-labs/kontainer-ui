const buildStorageKey = (envId: string) => {
  const host = window.location.host.replace(':', '.')
  return `kontainer.${host}.${envId}.at`
}

export const storeAuthToken = (scope, token: string | null) => {
  const key = buildStorageKey(scope)
  if (token === null) {
    localStorage.removeItem(key)
    return
  }
  localStorage.setItem(key, token)
}

export const readAuthToken = (scope) => {
  return localStorage.getItem(buildStorageKey(scope))
}
