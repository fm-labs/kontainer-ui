import { TaskStatusResponse } from '../types.ts'
import useAgentApi from '~/helper/useAgentApi.ts'

const useBackgroundTask = async (task: () => Promise<TaskStatusResponse>) => {
  const submissionResponse = await task()
  const taskId = submissionResponse.task_id
  if (!taskId) {
    return Promise.reject('Task submission failed')
  }

  const api = useAgentApi()
  return async () => {
    return await api.getTaskStatus(taskId)
  }
}

export default useBackgroundTask
