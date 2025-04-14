import React from 'react'
import Container from '@mui/material/Container'
import useEnvironments from '../../helper/useEnvironments.ts'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../elements/Heading.tsx'
import Button from '@mui/material/Button'
import { Card, CardActions, CardContent, Chip, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Link, useHref } from 'react-router-dom'
import { useEnvironment } from '~/helper/useEnvironmentContext.tsx'
import useAgentApi from '~/helper/useAgentApi.ts'
import { DockerHost } from '~/types.ts'

const DockerHostCard = ({ dockerHost }: { dockerHost: DockerHost }) => {
  const api = useAgentApi()

  const [connectionStatus, setConnectionStatus] = React.useState<any>(null)
  const [clientInfo, setClientInfo] = React.useState<any>(null)
  const [df, setDf] = React.useState<any>(null)

  const [autoConnect, setAutoConnect] = React.useState(false)
  const AUTO_CONNECT_TIMEOUT = 2000

  const handleConnect = async () => {
    // Implement the connect logic here
    console.log('Connecting to Docker Host:', dockerHost.id)
    const response = await api.connectToDockerHost(dockerHost.id).catch(() => {
      setConnectionStatus(null)
      setClientInfo(null)
    })
    console.log('Connection response:', response)
    if (!response) {
      return
    }
    setClientInfo(response)
    setConnectionStatus(response ? 'connected' : 'disconnected')
  }

  const renderConnectionStatus = () => {
    let label
    let color
    switch (connectionStatus) {
      case 'connected':
        label = 'Connected'
        color = 'success'
        break
      case 'disconnected':
        label = 'Disconnected'
        color = 'warning'
        break
      case 'error':
        label = 'Error'
        color = 'error'
        break
      default:
        label = 'Not Connected'
        color = 'warning'
    }
    return <Chip color={color} label={label}></Chip>
  }

  // Auto-connect logic
  React.useEffect(() => {
    let timer
    if (autoConnect) {
      timer = setTimeout(handleConnect, AUTO_CONNECT_TIMEOUT)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [autoConnect])

  return (
    <Card sx={{ minWidth: 275, mb: 3, p: 1 }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {dockerHost.id}
          {renderConnectionStatus()}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{dockerHost.host}</Typography>
        <div>
          <Link to={`/docker/${dockerHost.id}`}>Dashboard</Link> |{' '}
          <Link to={`/docker/${dockerHost.id}/containers`}>Containers</Link> |{' '}
          <Link to={`/docker/${dockerHost.id}/images`}>Images</Link> |{' '}
          <Link to={`/docker/${dockerHost.id}/volumes`}>Volumes</Link> |{' '}
          <Link to={`/docker/${dockerHost.id}/stacks`}>Stacks</Link>
        </div>
      </CardContent>
      <CardActions>
        <Button size='small' variant={'outlined'} onClick={() => handleConnect()}>
          Connect
        </Button>
        {/*<Button size='small' variant={'outlined'} href={`/${env.id}/disconnect`}>
                  Disconnect
                </Button>*/}
      </CardActions>
    </Card>
  )
}

const EnvironmentDockerHostsPage = () => {
  const { environment, dockerHosts } = useEnvironment()
  const api = useAgentApi()

  return (
    <Container maxWidth={'md'} sx={{ mt: 3 }}>
      <Helmet>
        <title>Connect</title>
      </Helmet>
      <Toolbar disableGutters>
        <Heading label={'Connect to Docker Host'}>
          <div>
            Environment: {environment.label} ({environment.hostname})
          </div>
        </Heading>
      </Toolbar>

      <Grid container spacing={2}>
        {dockerHosts.map((dockerHost: any) => (
          <Grid key={dockerHost.id} size={6}>
            <DockerHostCard dockerHost={dockerHost} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default EnvironmentDockerHostsPage
