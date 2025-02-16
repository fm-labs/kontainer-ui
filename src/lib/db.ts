import { openDB, DBSchema } from 'idb'

interface AppDB extends DBSchema {
  keyval: {
    key: string
    value: string
  }
  environments: {
    value: {
      alias: string
      hostname: string
    }
    key: string
    indexes: { 'by-alias': string; 'by-hostname': string }
  }
  containers: {
    value: {
      Id: string
      Name: string
    }
    key: string
    indexes: { 'by-name': string }
  }
  stacks: {
    value: {
      name: string
    }
    key: string
    indexes: { 'by-name': string }
  }
}

async function openAppDb(dbName: string) {
  const db = await openDB<AppDB>(dbName, 1, {
    upgrade(db) {
      // keyval-store
      db.createObjectStore('keyval')

      // // env store
      // const envStore = db.createObjectStore('environments', {
      //   keyPath: 'alias',
      // })
      // envStore.createIndex('by-alias', 'alias')
      // envStore.createIndex('by-hostname', 'hostname')

      // containers-store
      const containerStore = db.createObjectStore('containers', {
        keyPath: 'Id',
      })
      containerStore.createIndex('by-name', 'Name')

      // stacks-store
      const stackStore = db.createObjectStore('stacks', {
        keyPath: 'name',
      })
      stackStore.createIndex('by-name', 'name')
    },
  })

  // // Add data to the keyval-store
  //await db.put('keyval', 'Val', 'Key')

  // // Add data to the env-store
  // await db.put('environments', { alias: 'local', hostname: 'localhost' })
  // await db.put('environments', { alias: 'remote', hostname: 'remotehost' })

  return db
}

//const db = openAppDb()

export default {
  openAppDb,
}
