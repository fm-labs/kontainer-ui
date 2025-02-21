import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { toast } from 'react-toastify'
import { useEnvApi } from '../../../helper/useEnvApi.ts'

const StackFromTemplateRepo = () => {
  const [stackName, setStackName] = React.useState('my-nginx-stack')
  const [templateRepo, setTemplateRepo] = React.useState('fm-labs/kstack-templates')
  const [templateName, setTemplateName] = React.useState('nginx')
  const api = useEnvApi()

  const handleSubmitClick = () => {
    console.log('Submit clicked')

    const formData = new FormData()
    formData.append('launcher', 'template')
    formData.append('name', stackName)
    formData.append('template_repo', templateRepo)
    formData.append('template_name', templateName)

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
      <h1>From Template Repository</h1>
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
          id='template_repo'
          name='template_repo'
          label='Template Repository'
          type='text'
          fullWidth
          variant='standard'
          value={templateRepo}
          onChange={(e) => setTemplateRepo(e.target.value)}
        />
        <TextField
          margin='dense'
          id='template_name'
          name='template_name'
          label='Template Name'
          type='text'
          fullWidth
          variant='standard'
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />

        <Button variant='contained' color='primary' onClick={handleSubmitClick}>
          Launch Stack
        </Button>
      </div>
    </div>
  )
}

export default StackFromTemplateRepo
