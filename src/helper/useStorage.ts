export const useStorage = () => {
  const getStorageInfo = async () => {
    if (navigator.storage && navigator.storage.estimate) {
      const quota = await navigator.storage.estimate()
      // quota.usage -> Number of bytes used.
      // quota.quota -> Maximum number of bytes available.
      const usage = quota.usage || -1
      const available = quota.quota || -1

      const percentageUsed = (usage / available) * 100
      console.log(`You've used ${percentageUsed}% of the available storage.`)
      const remaining = available - usage
      console.log(`You can write up to ${remaining} more bytes.`)

      return { usage, quota: available, percentageUsed, remaining }
    }
  }

  return { getStorageInfo }
}
