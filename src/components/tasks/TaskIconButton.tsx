import React from 'react'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import useKontainerApi from '~/helper/useKontainerApi.ts'
import { useTaskManager } from '~/components/tasks/useTaskManager.ts'
import { TaskStatusResponse } from '~/types.ts'

interface TaskIconButtonProps extends IconButtonProps {
  promise: () => Promise<any>
  onSuccess?: (result: any) => void
  onFailure?: (error: Error) => void
}

const TaskIconButton = ({ promise, onSuccess, onFailure, children, ...iconButtonProps }: TaskIconButtonProps) => {
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<any | null>(null)
  const [taskId, setTaskId] = React.useState<string | null>(null)
  const { addTask, updateTask, removeTask } = useTaskManager()

  const api = useKontainerApi()

  const handleClick = () => {
    setLoading(true)
    setTimeout(submitTask, 500)
  }

  const fetchTaskStatus = React.useCallback(() => {
    if (!taskId) {
      return
    }
    console.log('Fetching task status', taskId)
    api
      .getTaskStatus(taskId)
      .then((statusData) => {
        console.log('Task status', taskId, statusData)
        updateTask(taskId, statusData)
        if (statusData.status?.toLowerCase() === 'success') {
          console.log('Task done', taskId)
          setTaskId(null)
          setResult(statusData.result)
          setLoading(false)

          if (onSuccess) {
            onSuccess(statusData.result)
          }
        } else if (statusData.status?.toLowerCase() === 'failure') {
          console.error('Task failed', taskId, statusData)
          const error = new Error(statusData?.error)
          setTaskId(null)
          setResult(error)
          setLoading(false)

          if (onFailure) {
            onFailure(error)
          }
        }
      })
      .catch((err) => {
        console.error('Task status error', taskId)
      })
  }, [taskId])

  React.useEffect(() => {
    if (!taskId) {
      return
    }

    console.log('Monitoring task', taskId)
    const timer = setInterval(fetchTaskStatus, 5000)

    return () => {
      console.log('Cleaning up task monitor', taskId)
      clearInterval(timer)
    }
  }, [taskId])

  const submitTask = React.useCallback(() => {
    setLoading(true)
    setResult(null)

    promise()
      .then((result: TaskStatusResponse) => {
        console.log('Task submitted', result)
        const taskId = result?.task_id
        if (!taskId) {
          throw new Error('Task ID not found')
        }
        setTaskId(taskId)
        addTask(result)
        //console.log('Task ID', taskId)
        return result
      })
      .catch((error) => {
        if (onFailure) {
          onFailure(error)
        }
        setResult(error)
      })
      .finally(() => {})
  }, [promise, onSuccess, onFailure])

  return (
    <IconButton {...iconButtonProps} onClick={handleClick}>
      {!loading ? (
        children
      ) : (
        <>
          <CircularProgress size={18} />
        </>
      )}
    </IconButton>
  )
}

export default TaskIconButton
