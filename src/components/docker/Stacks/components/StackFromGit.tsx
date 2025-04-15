import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { toast } from 'react-toastify'
import Typography from '@mui/material/Typography'
import { useAgentDockerApi } from '../../../../helper/useAgentDockerApi.ts'

const StackFromGit = () => {
  const [stackName, setStackName] = React.useState('my-repo-stack')
  const [repoUrl, setRepoUrl] = React.useState('https://github.com/fm-labs/kontainer-templates.git')
  const [repoBasePath, setRepoBasePath] = React.useState('docker/nginx')
  const [composeFileName, setComposeFileName] = React.useState('')
  const [sshKeyId, setSshKeyId] = React.useState('')

  const api = useAgentDockerApi()

  const handleSubmitClick = () => {
    console.log('Submit clicked')

    const formData = new FormData()
    formData.append('launcher', 'git')
    formData.append('stack_name', stackName)
    formData.append('repo_url', repoUrl)
    formData.append('base_path', repoBasePath)
    formData.append('compose_file_name', composeFileName)
    formData.append('ssh_key_id', sshKeyId)

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
      <h1>From Git</h1>

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
          id='repo_url'
          name='repo_url'
          label='Git Repository URL'
          type='text'
          fullWidth
          variant='standard'
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />

        <Typography variant='h5' sx={{ mt: 2 }}>
          Advanced Settings
        </Typography>

        <TextField
          margin='dense'
          id='repo_base_dir'
          name='repo_base_dir'
          label='Base Directory (Default: /)'
          type='text'
          fullWidth
          variant='standard'
          value={repoBasePath}
          onChange={(e) => setRepoBasePath(e.target.value)}
        />
        <TextField
          margin='dense'
          id='compose_file_name'
          name='compose_file_name'
          label='Compose File name (Default: docker-compose.yml)'
          type='text'
          fullWidth
          variant='standard'
          value={composeFileName}
          onChange={(e) => setComposeFileName(e.target.value)}
        />

        <TextField
          margin='dense'
          id='ssh_key_id'
          name='ssh_key_id'
          label='SSH Key ID (set only for private repositories)'
          type='text'
          fullWidth
          variant='standard'
          value={sshKeyId}
          onChange={(e) => setSshKeyId(e.target.value)}
        />

        <Button variant='contained' color='primary' onClick={handleSubmitClick}>
          Launch Stack
        </Button>
      </div>
    </div>
  )
}

export default StackFromGit
