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

const EnvironmentsPage = () => {
  const { dockerHosts } = useEnvironments()

  return (
    <Container maxWidth={'md'} sx={{ mt: 3 }}>
      <Helmet>
        <title>Connect</title>
      </Helmet>
      <Toolbar disableGutters>
        <Heading label={'Connect to Environment'}>
          <div>{/*<EnvironmentCreateButton />*/}</div>
        </Heading>
      </Toolbar>

      <Grid container spacing={2}>
        {dockerHosts.map((env: any) => (
          <Grid key={env.id}>
            <Card sx={{ minWidth: 275, mb: 3, p: 1 }}>
              <CardContent>
                <Typography variant='h5' component='div'>
                  {env.label}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                  {env.hostname}:{env.agentPort}
                </Typography>
                <div>
                  <Link to={`/${env.id}`}>Dashboard</Link> | <Link to={`/${env.id}/docker/containers`}>Containers</Link>{' '}
                  | <Link to={`/${env.id}/docker/images`}>Images</Link> |{' '}
                  <Link to={`/${env.id}/docker/volumes`}>Volumes</Link> |{' '}
                  <Link to={`/${env.id}/docker/stacks`}>Stacks</Link>
                </div>
              </CardContent>
              <CardActions>
                <Button size='small' variant={'outlined'} href={useHref(`/${env.id}/connect`)}>
                  Connect
                </Button>
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

export default EnvironmentsPage
