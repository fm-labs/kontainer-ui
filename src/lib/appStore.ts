const APP_STORE_KEY = 'appStore'

export const persistAppStore = (appStore: any) => {
  localStorage.setItem(APP_STORE_KEY, JSON.stringify(appStore))
}

export const loadAppStore = (): any => {
  const appStore = localStorage.getItem(APP_STORE_KEY)
  if (appStore) {
    return JSON.parse(appStore)
  }
  return {}
}
