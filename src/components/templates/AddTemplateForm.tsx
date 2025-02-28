import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { toast } from 'react-toastify'
import { useEnvApi } from '../../helper/useEnvApi.ts'

const AddTemplateForm = () => {
  const defaultValue = `[]`
  const [templateId, setTemplateId] = React.useState('')
  const [templateContents, setTemplateContents] = React.useState(defaultValue)
  const { api } = useEnvApi()

  const handleSubmitClick = () => {
    console.log('Submit clicked')

    const formData = new FormData()
    formData.append('template_id', templateId)
    formData.append('template_content', templateContents)

    const payload = JSON.stringify(Object.fromEntries(formData))
    console.log(formData, payload)
    api
      .addTemplate(payload)
      .then((response) => {
        console.log(response)
        toast.success('Template successfully written')
      })
      .catch((error) => {
        toast.error('Something went wrong: ' + error?.response?.data?.error)
      })
  }

  return (
    <div>
      <div>
        <TextField
          autoFocus
          required
          margin='dense'
          id='template_id'
          name='template_id'
          label='Template Id'
          type='text'
          fullWidth
          variant='standard'
          value={templateId}
          onChange={(e) => setTemplateId(e.target.value)}
        />
        <TextField
          multiline={true}
          rows={10}
          required={true}
          margin='dense'
          id='template_content'
          name='template_content'
          label='Template Contents'
          type='text'
          fullWidth
          variant='standard'
          value={templateContents}
          onChange={(e) => setTemplateContents(e.target.value)}
        />
        <Button variant='contained' color='primary' onClick={handleSubmitClick}>
          Save Template
        </Button>
      </div>
    </div>
  )
}

export default AddTemplateForm
