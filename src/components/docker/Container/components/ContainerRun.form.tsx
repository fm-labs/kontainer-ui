import React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'

interface ContainerRunFormProps {
  onSubmit: (formJson: any) => void
  result?: any
}

const ContainerRunForm = ({ onSubmit, result }: ContainerRunFormProps) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const imageInputRef = React.useRef<HTMLInputElement>(null)
  const commandInputRef = React.useRef<HTMLInputElement>(null)

  const handleRunClick = () => {
    if (!imageInputRef.current || !imageInputRef.current.value) {
      alert('Invalid image')
      return
    }

    const formData = new FormData()
    formData.append('image', imageInputRef.current?.value)
    formData.append('command', commandInputRef.current?.value || '')
    //formData.append('args', textareaRef.current?.value || '')
    const formJson = Object.fromEntries((formData as any).entries())
    const command = formJson.command
    console.log('Run command', command, formJson)

    if (onSubmit) {
      onSubmit(formJson)
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <div>docker run</div>
        <div>
          <input ref={imageInputRef} type='text' placeholder='nginx:latest' />
        </div>
        <div>
          <input ref={commandInputRef} type='text' placeholder='command' />
        </div>
        <textarea ref={textareaRef} placeholder='-p 8080' style={{ width: '100%', minHeight: 300 }} autoFocus={true} />
        <Button variant='contained' color='primary' onClick={handleRunClick}>
          Run
        </Button>
      </Grid>
      <Grid size={6}>
        {result && (
          <>
            <div>Result</div>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default ContainerRunForm
