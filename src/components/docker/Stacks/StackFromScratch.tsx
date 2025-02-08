import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import api from '../../../api.ts'
import { toast } from 'react-toastify'

const StackFromScratch = () => {
  const defaultValue = ` 
  services:
    web:
      image: nginx:alpine
      ports:
        - "8080:80"
  `
  const [stackName, setStackName] = React.useState('my-scratch-stack')
  const [stackContents, setStackContents] = React.useState(defaultValue)

  const handleSubmitClick = () => {
    console.log('Submit clicked')

    const formData = new FormData()
    formData.append('launcher', 'scratch')
    formData.append('stack', stackName)
    formData.append('compose_content', stackContents)

    const payload = JSON.stringify(Object.fromEntries(formData))
    console.log(formData, payload)
    api
      .createStack()(payload)
      .then((response) => {
        console.log(response)
        toast.success('Stack successfully created')
      })
      .catch((error) => {
        console.error('error creating stack', error?.response)
        toast.error('Error creating stack: ' + error?.response?.data?.error)
      })
  }

  return (
    <div>
      <h1>From Scratch</h1>
      <div>
        <TextField
          autoFocus
          required
          margin='dense'
          id='name'
          name='name'
          label='Stack Name'
          type='text'
          fullWidth
          variant='standard'
          value={stackName}
          onChange={(e) => setStackName(e.target.value)}
        />
        <TextField
          multiline={true}
          rows={10}
          required={true}
          margin='dense'
          id='compose_content'
          name='compose_content'
          label='Stack Contents'
          type='text'
          fullWidth
          variant='standard'
          value={stackContents}
          onChange={(e) => setStackContents(e.target.value)}
        />
        <Button variant='contained' color='primary' onClick={handleSubmitClick}>
          Launch Stack
        </Button>
      </div>
    </div>
  )
}

export default StackFromScratch
