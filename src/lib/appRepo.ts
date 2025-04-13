import appDb from './appDb.ts'

const appRepo = (scope: string) => {
  const listEnvironments = async () => {
    const db = await appDb.openAppDb(scope)
    const tx = db.transaction('environments', 'readonly')
    const store = tx.objectStore('environments')
    const index = store.index('by-alias')
    const data = await index.getAll()
    return data
  }

  const updateContainers = async (data: any[]) => {
    const db = await appDb.openAppDb(scope)
    const tx = db.transaction('containers', 'readwrite')
    const store = tx.objectStore('containers')

    // delete all existing containers
    const allKeys = await store.getAllKeys()
    for (const key of allKeys) {
      store.delete(key)
    }

    for (const container of data) {
      store.put(container as any)
    }
    await tx.done
  }

  const listContainers = async () => {
    //const data = await apiClient.getContainers()
    const db = await appDb.openAppDb(scope)
    const tx = db.transaction('containers', 'readonly')
    const store = tx.objectStore('containers')
    const index = store.index('by-name')
    const data = await index.getAll()
    return data
  }

  const updateStacks = async (data: any[]) => {
    const db = await appDb.openAppDb(scope)
    const tx = db.transaction('stacks', 'readwrite')
    const store = tx.objectStore('stacks')

    // delete all existing stacks
    const allKeys = await store.getAllKeys()
    for (const key of allKeys) {
      store.delete(key)
    }

    for (const stack of data) {
      store.put(stack as any)
    }
    await tx.done
  }

  const listStacks = async () => {
    //const data = await apiClient.getStacks()
    const db = await appDb.openAppDb(scope)
    const tx = db.transaction('stacks', 'readonly')
    const store = tx.objectStore('stacks')
    //const index = store.index('by-name')
    //const index = store.index('by-name')
    //const data = await index.getAll()
    const data = await store.getAll()
    return data
  }

  const resetDb = async () => {
    const db = await appDb.openAppDb(scope)
    await db.clear('keyval').catch(() => {})
    await db.clear('containers').catch(() => {})
    await db.clear('stacks').catch(() => {})
    db.deleteObjectStore('containers')
    db.deleteObjectStore('stacks')
    db.deleteObjectStore('keyval')
    db.close()
  }

  return {
    listEnvironments,
    listContainers,
    updateContainers,
    listStacks,
    updateStacks,
    resetDb,
    //syncContainers,
    //syncStacks,
  }
}

export default appRepo
