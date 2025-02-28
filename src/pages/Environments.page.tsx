import React from 'react'
import Container from '@mui/material/Container'
import useEnvironments from '../helper/useEnvironments.ts'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../elements/Heading.tsx'
import Button from '@mui/material/Button'
import { Card, CardActions, CardContent, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider.tsx'

const EnvironmentsPage = () => {
  const { envs } = useEnvironments()
  const { logout } = useAuth()

  //const data = useLoaderData() as any
  //const [envs, setEnvs] = React.useState(defaultEnvs)

  // const handleAddEnvClick = () => {
  //   const hostname = prompt('Enter hostname')
  //   if (!hostname) return
  //
  //   const newEnvs = [...envs, { hostname, name: hostname }]
  //   setEnvs(newEnvs)
  //   saveEnvsInLocalStorage(newEnvs)
  // }

  // React.useEffect(() => {
  //   const envs = restoreEnvsFromLocalStorage()
  //   setEnvs(envs)
  // }, [])

  return (
    <Container maxWidth={'md'} sx={{ mt: 3 }}>
      <Helmet>
        <title>Connect</title>
      </Helmet>
      <Toolbar disableGutters>
        <Heading label={'Environments'}>
          <div>
            <Button variant='contained' color='primary' onClick={() => logout()}>
              Logout
            </Button>
            {/*<EnvironementCreateButton />*/}
          </div>
        </Heading>
      </Toolbar>

      <Grid container spacing={2}>
        {envs.map((env: any) => (
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
                <Button size='small' variant={'outlined'} href={`/${env.id}`}>
                  Connect
                </Button>
                <Button size='small' variant={'outlined'} href={`/${env.id}/disconnect`}>
                  Disconnect
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default EnvironmentsPage
