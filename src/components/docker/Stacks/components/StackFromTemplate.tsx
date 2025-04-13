import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { toast } from 'react-toastify'
import { useAgentDockerApi } from '../../../../helper/useAgentDockerApi.ts'

const exampleTemplateContent = ` 
  {
    "name": "my-nginx-stack",
    "type": "docker-compose",
    "description": "My Test Nginx Stack",
    "repository": {
      "private": false,
      "type": "git",
      "url": "https://github.com/fm-labs/kstack-templates.git",
      "ref": "/ref/heads/main"
    },
    "base_path": "docker/nginx",
    "compose_file": "docker-compose.yml"
  }
  `

interface StackFromTemplateProps {
  initialData?: {
    stackName?: string
    templateContent?: string
  }
}

const StackFromTemplate = ({ initialData }: StackFromTemplateProps) => {
  const [stackName, setTemplateName] = React.useState(initialData?.stackName || '')
  const [templateContent, setTemplateContent] = React.useState(initialData?.templateContent || '')
  const api = useAgentDockerApi()

  const handleSubmitClick = () => {
    console.log('Submit clicked')

    const formData = new FormData()
    formData.append('launcher', 'template')
    formData.append('stack_name', stackName)
    formData.append('template_content', templateContent)

    // basic validation
    if (!stackName || !templateContent) {
      toast.error('Please fill in all required fields')
      return
    }

    const payload = JSON.stringify(Object.fromEntries(formData))
    console.log(formData, payload)
    api
      .createStack(payload)
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
      <div>
        <TextField
          autoFocus
          required
          margin='dense'
          id='stack_name'
          name='stack_name'
          label='Stack Name'
          type='text'
          fullWidth
          variant='standard'
          value={stackName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
        <TextField
          multiline={true}
          rows={10}
          required={true}
          margin='dense'
          id='template_content'
          name='template_content'
          placeholder={exampleTemplateContent}
          label='Template Contents'
          type='text'
          fullWidth
          variant='standard'
          value={templateContent}
          onChange={(e) => setTemplateContent(e.target.value)}
        />
        <Button variant='contained' color='primary' onClick={handleSubmitClick}>
          Launch Template
        </Button>
      </div>
    </div>
  )
}

export default StackFromTemplate
