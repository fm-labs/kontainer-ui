import React from 'react'
import { useTaskManager } from '~/components/tasks/useTaskManager.ts'
import { TaskStatusResponse } from '~/types.ts'
import useAgentApi from '~/helper/useAgentApi.ts'

const TaskItem = ({ task: initialTask }) => {
  const { updateTask, removeTask } = useTaskManager()
  const api = useAgentApi()

  const [task, setTask] = React.useState<TaskStatusResponse>(initialTask)

  React.useEffect(() => {
    const timer = setInterval(() => {
      console.log('Task', task)
      api.getTaskStatus(task.task_id).then((statusData) => {
        console.log('Task status', task.task_id, statusData)
        setTask(statusData)

        if (statusData.status?.toLowerCase() === 'success') {
          console.log('Task done', task.task_id)
          clearInterval(timer)
          //removeTask(task.task_id)
        } else if (statusData.status?.toLowerCase() === 'failure') {
          console.error('Task failed', task.task_id, statusData)
          clearInterval(timer)
          //removeTask(task.task_id)
        }
        updateTask(task.task_id, statusData)
      })
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div>
      <p>TaskID: {task.task_id}</p>
      <p>Status: {task.status}</p>
      <p>{task.result}</p>
      <button onClick={() => removeTask(task.task_id)}>Remove</button>
    </div>
  )
}

const TaskManagerView = () => {
  const { tasks, addTask, removeTask } = useTaskManager()

  return (
    <div>
      <h1>Task Manager</h1>
      <p>Tasks: {tasks.length}</p>
      {tasks.map((task: TaskStatusResponse, index: number) => {
        return (
          <div key={index}>
            <TaskItem task={task} />
          </div>
        )
      })}
    </div>
  )
}

export default TaskManagerView
