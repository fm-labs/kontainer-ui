import { useEnvApi } from './useEnvApi.ts'
import { TaskStatusResponse } from '../types.ts'

const useBackgroundTask = async (task: () => Promise<TaskStatusResponse>) => {
  const submissionResponse = await task()
  const taskId = submissionResponse.task_id
  if (!taskId) {
    return Promise.reject('Task submission failed')
  }

  const { api } = useEnvApi()
  return async () => {
    return await api.getTaskStatus(taskId)
  }
}

export default useBackgroundTask
