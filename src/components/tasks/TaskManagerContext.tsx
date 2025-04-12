import React, { PropsWithChildren } from 'react'
import { TaskStatusResponse } from '~/types.ts'

export type TaskManagerContextType = {
  tasks: TaskStatusResponse[]
  addTask: (task: TaskStatusResponse) => void
  updateTask: (taskId: string, task: TaskStatusResponse) => void
  removeTask: (taskId: string) => void
}

export const TaskManagerContext = React.createContext<TaskManagerContextType | null>(null)

export const TaskManagerProvider = ({ children }: PropsWithChildren<any>) => {
  const [tasks, setTasks] = React.useState<any[]>([])

  const addTask = React.useCallback((task: any) => {
    setTasks((tasks) => [...tasks, task])
  }, [])

  const updateTask = React.useCallback((taskId: string, task: TaskStatusResponse) => {
    setTasks((tasks) => tasks.map((t) => (t.id === taskId ? task : t)))
  }, [])

  const removeTask = React.useCallback((taskId: string) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId))
  }, [])

  React.useEffect(() => {
    const timer = setInterval(() => {
      console.log('Tasks', tasks)
    }, 30000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const taskManagerContext = { tasks, addTask, updateTask, removeTask }
  return <TaskManagerContext.Provider value={taskManagerContext}>{children}</TaskManagerContext.Provider>
}
