import React from 'react'
import Container from '@mui/material/Container'
import useEnvironments from '../../helper/useEnvironments.ts'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../elements/Heading.tsx'
import Button from '@mui/material/Button'
import { Card, CardActions, CardContent, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Link, useHref } from 'react-router-dom'
import { useEnvironment } from '~/helper/useEnvironmentContext.tsx'

const EnvironmentDockerHostsPage = () => {
  const { environment, dockerHosts } = useEnvironment()

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
            <Card sx={{ minWidth: 275, mb: 3, p: 1 }}>
              <CardContent>
                <Typography variant='h5' component='div'>
                  {dockerHost.id}
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
                {/*<Button size='small' variant={'outlined'} href={useHref(`/${dockerHost.id}/connect`)}>
                  Connect
                </Button>*/}
                {/*<Button size='small' variant={'outlined'} href={`/${env.id}/disconnect`}>
                  Disconnect
                </Button>*/}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default EnvironmentDockerHostsPage
