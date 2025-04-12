import * as React from 'react'
import { TaskManagerContext, TaskManagerContextType } from '~/components/tasks/TaskManagerContext.tsx'

export const useTaskManager = (): TaskManagerContextType => {
  const context = React.useContext(TaskManagerContext)
  if (!context) {
    throw new Error('useTaskManager must be used within a TaskManagerProvider')
  }
  return context
}
