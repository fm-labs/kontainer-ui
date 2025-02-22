import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const ContainerRegistryForm = ({
  onSubmit,
  initialData,
  editMode,
}: {
  onSubmit: (formData: FormData) => void
  initialData?: any
  editMode?: boolean
}) => {
  const [registryName, setRegistryName] = React.useState(initialData?.name || '')
  const [registryUsername, setRegistryUsername] = React.useState('')
  const [registryPassword, setRegistryPassword] = React.useState('')
  const [registryHost, setRegistryHost] = React.useState(initialData?.host || '')
  const [registryLabel, setRegistryLabel] = React.useState(initialData?.label || '')

  const handleSubmitClick = () => {
    console.log('Submit clicked')

    const formData = new FormData()
    formData.append('name', registryName)
    formData.append('username', registryUsername)
    formData.append('password', registryPassword)
    formData.append('host', registryHost)
    formData.append('label', registryLabel)

    onSubmit(formData)
  }

  return (
    <div>
      <div>
        <TextField
          disabled={editMode}
          aria-readonly={editMode}
          autoFocus
          required
          margin='dense'
          id='registry_name'
          name='registry_name'
          label='Registry Name'
          type='text'
          fullWidth
          variant='standard'
          value={registryName}
          onChange={(e) => setRegistryName(e.target.value)}
        />

        <TextField
          margin='dense'
          id='registry_host'
          name='registry_host'
          label='Registry Host'
          type='text'
          fullWidth
          variant='standard'
          value={registryHost}
          onChange={(e) => setRegistryHost(e.target.value)}
        />

        <TextField
          margin='dense'
          id='registry_label'
          name='registry_label'
          label='Registry Label'
          type='text'
          fullWidth
          variant='standard'
          value={registryLabel}
          onChange={(e) => setRegistryLabel(e.target.value)}
        />

        <TextField
          margin='dense'
          id='registry_username'
          name='registry_username'
          label='Registry Username'
          type='text'
          autoComplete={'new-password'}
          fullWidth
          variant='standard'
          value={registryUsername}
          onChange={(e) => setRegistryUsername(e.target.value)}
        />

        <TextField
          margin='dense'
          id='registry_password'
          name='registry_password'
          label='Registry Password'
          type='password'
          autoComplete={'new-password'}
          fullWidth
          variant='standard'
          value={registryPassword}
          onChange={(e) => setRegistryPassword(e.target.value)}
        />

        <Box sx={{ pt: 2, textAlign: 'right' }}>
          <Button variant='contained' color='primary' onClick={handleSubmitClick}>
            Submit
          </Button>
        </Box>
      </div>
    </div>
  )
}

export default ContainerRegistryForm
