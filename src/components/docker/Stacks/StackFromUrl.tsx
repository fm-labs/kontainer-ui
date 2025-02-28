import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { toast } from 'react-toastify'
import { useEnvApi } from '../../../helper/useEnvApi.ts'

const StackFromUrl = () => {
  const [stackName, setStackName] = React.useState('')
  const [composeUrl, setComposeUrl] = React.useState('')
  const { api } = useEnvApi()

  const handleSubmitClick = () => {
    console.log('Submit clicked')

    const formData = new FormData()
    formData.append('launcher', 'url')
    formData.append('stack_name', stackName)
    formData.append('copmose_url', composeUrl)

    const payload = JSON.stringify(Object.fromEntries(formData))
    console.log(formData, payload)
    api
      .createStack(payload)
      .then((response) => {
        console.log(response)
        toast.success('Stack successfully created')
      })
      .catch((error) => {
        console.error('error creating stack', error)
        toast.error('Error creating stack')
      })
  }

  return (
    <div>
      <h1>From Url</h1>
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
          margin='dense'
          id='compose_url'
          name='compose_url'
          label='Compose URL'
          type='text'
          fullWidth
          variant='standard'
          value={composeUrl}
          onChange={(e) => setComposeUrl(e.target.value)}
        />

        <Button variant='contained' color='primary' onClick={handleSubmitClick}>
          Launch Stack
        </Button>
      </div>
    </div>
  )
}

export default StackFromUrl
