import appDb from './db.ts'

const appRepo = (envId: string, apiClient) => {
  const listEnvironments = async () => {
    const db = await appDb.openAppDb(envId)
    const tx = db.transaction('environments', 'readonly')
    const store = tx.objectStore('environments')
    const index = store.index('by-alias')
    const data = await index.getAll()
    return data
  }

  const syncContainers = async () => {
    const data = await apiClient.getContainers()()
    const db = await appDb.openAppDb(envId)
    const tx = db.transaction('containers', 'readwrite')
    const store = tx.objectStore('containers')
    for (const container of data) {
      store.put(container as any)
    }
    await tx.done
    return data
  }

  const listContainers = async () => {
    //const data = await apiClient.getContainers()()
    const db = await appDb.openAppDb(envId)
    const tx = db.transaction('containers', 'readonly')
    const store = tx.objectStore('containers')
    const index = store.index('by-name')
    const data = await index.getAll()
    return data
  }

  const syncStacks = async () => {
    const data = await apiClient.getStacks()()
    const db = await appDb.openAppDb(envId)
    const tx = db.transaction('stacks', 'readwrite')
    const store = tx.objectStore('stacks')
    for (const stack of data) {
      store.put(stack as any)
    }
    await tx.done
    return data
  }

  const listStacks = async () => {
    //const data = await apiClient.getStacks()()
    const db = await appDb.openAppDb(envId)
    const tx = db.transaction('stacks', 'readonly')
    const store = tx.objectStore('stacks')
    //const index = store.index('by-name')
    //const index = store.index('by-name')
    //const data = await index.getAll()
    const data = await store.getAll()
    return data
  }

  return {
    listEnvironments,
    listContainers,
    syncContainers,
    listStacks,
    syncStacks,
  }
}

export default appRepo
