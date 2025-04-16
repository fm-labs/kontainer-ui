import React from 'react'
import Container from '@mui/material/Container'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../elements/Heading.tsx'
import Button from '@mui/material/Button'
import { Card, CardActions, CardContent, Chip, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Link } from 'react-router-dom'
import { useEnvironment } from '~/helper/useEnvironmentContext.tsx'
import useKontainerApi from '~/helper/useKontainerApi.ts'
import { DockerHost } from '~/types.ts'
import { agentDockerApiForEnv } from '~/lib/agentDockerApi.ts'
import Box from '@mui/material/Box'
import KontainerLabel from '~/layout/KontainerLabel.tsx'

const DockerHostCard = ({ environment, dockerHost }: { environment: any; dockerHost: DockerHost }) => {
  const api = useKontainerApi()
  const dockerApi = agentDockerApiForEnv(environment, dockerHost)

  const [connectionStatus, setConnectionStatus] = React.useState<any>(null)
  const [clientInfo, setClientInfo] = React.useState<any>(null)
  const [df, setDf] = React.useState<any>(null)
  const [error, setError] = React.useState<any>(null)

  const [autoConnect, setAutoConnect] = React.useState(true)
  const AUTO_CONNECT_TIMEOUT = 2000

  const handleConnect = async () => {
    // Implement the connect logic here
    console.log('Connecting to Docker Host:', dockerHost.id)
    const response = await api.connectToDockerHost(dockerHost.id).catch((err) => {
      setConnectionStatus('error')
      setError(err?.response?.data?.error || err?.message || 'Error connecting to Docker host')
      setClientInfo(null)
    })
    console.log('Connection response:', response)
    if (!response) {
      return
    }
    setClientInfo(response)
    setConnectionStatus(response ? 'connected' : 'disconnected')
    setError(null)

    const dfResponse = await dockerApi.getEngineDf()
    console.log('Engine df response:', dfResponse)
    setDf(dfResponse)
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
    return <Chip size={'small'} color={color} label={label}></Chip>
  }

  const renderLinks = () => {
    if (!df) {
      return null
    }

    return (
      <Box sx={{ mt: 1 }}>
        <Link to={`/docker/${dockerHost.id}`}>Dashboard</Link> |{' '}
        <Link to={`/docker/${dockerHost.id}/containers`}>Containers ({df?.Containers?.length})</Link> |{' '}
        <Link to={`/docker/${dockerHost.id}/images`}>Images ({df?.Images?.length})</Link> |{' '}
        <Link to={`/docker/${dockerHost.id}/volumes`}>Volumes ({df?.Volumes?.length})</Link>
      </Box>
    )
  }

  const renderError = () => {
    if (!error) {
      return null
    }

    return <div>{error}</div>
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
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{dockerHost.host}</Typography>
        {renderConnectionStatus()}
        {renderLinks()}
        {renderError()}
      </CardContent>
      <CardActions>
        {connectionStatus !== 'connected' && (
          <Button size='small' variant={'outlined'} onClick={() => handleConnect()}>
            Connect
          </Button>
        )}
        {/*<Button size='small' variant={'outlined'} href={`/${env.id}/disconnect`}>
                  Disconnect
                </Button>*/}
      </CardActions>
    </Card>
  )
}

const EnvironmentDockerHostsPage = () => {
  const { environment, dockerHosts } = useEnvironment()

  return (
    <Container maxWidth={false} sx={{ mt: 2 }}>
      <Toolbar disableGutters>
        <Heading label={<KontainerLabel />}>
          <div>
            Environment: {environment.label} ({environment.hostname})
          </div>
        </Heading>
      </Toolbar>

      <Grid container spacing={2}>
        {dockerHosts.map((dockerHost: any) => (
          <Grid key={dockerHost.id} size={3}>
            <DockerHostCard environment={environment} dockerHost={dockerHost} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default EnvironmentDockerHostsPage
