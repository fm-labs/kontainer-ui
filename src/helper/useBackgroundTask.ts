import { useEnvApi } from './useEnvApi.ts'
import { IBackgroundTaskResponse } from '../types.ts'

const useBackgroundTask = async (task: () => Promise<IBackgroundTaskResponse>) => {
  const submissionResponse = await task()
  const taskId = submissionResponse.taskId
  if (!taskId) {
    return Promise.reject('Task submission failed')
  }

  const api = useEnvApi()
  return async () => {
    return await api.getTaskStatus()(taskId)
  }
}

export default useBackgroundTask
