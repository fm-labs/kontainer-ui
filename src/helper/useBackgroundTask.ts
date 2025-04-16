import { TaskStatusResponse } from '../types.ts'
import useKontainerApi from '~/helper/useKontainerApi.ts'

const useBackgroundTask = async (task: () => Promise<TaskStatusResponse>) => {
  const submissionResponse = await task()
  const taskId = submissionResponse.task_id
  if (!taskId) {
    return Promise.reject('Task submission failed')
  }

  const api = useKontainerApi()
  return async () => {
    return await api.getTaskStatus(taskId)
  }
}

export default useBackgroundTask
