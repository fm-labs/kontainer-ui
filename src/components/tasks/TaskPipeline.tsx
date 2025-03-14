import React from 'react'
import Button from '@mui/material/Button'

const TaskPipeline = () => {
  const handleSubmit = () => {
    console.log('Submit Pipeline')
  }

  return (
    <div>
      <h1>Task Pipeline</h1>
      <Button>Submit Pipeline</Button>
    </div>
  )
}

export default TaskPipeline
