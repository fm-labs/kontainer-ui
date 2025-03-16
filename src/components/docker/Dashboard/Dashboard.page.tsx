import React from 'react'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../../elements/Heading.tsx'
import Container from '@mui/material/Container'
import { useEnvApi } from '~/helper/useEnvApi.ts'
import { useAuth } from '~/helper/useAuth.tsx'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router'
import DashboardOverview2 from './DashboardOverview2.tsx'
import DashboardOverviewStacked from '~/components/docker/Dashboard/DashboardOverviewStacked.tsx'
import DockerEngineInfoWidget from '~/components/docker/Dashboard/components/DockerEngineInfoWidget.tsx'

const DashboardPage = () => {
  const { env } = useEnvApi()
  const envId = env.id
  const { logout } = useAuth()
  const navigate = useNavigate()

  // const [data, setData] = React.useState<any>(null)
  //
  // const fetchData = React.useCallback(() => {
  //   //console.log('Fetching Engine df data...')
  //   api.getEngineDf().then((data) => {
  //     //console.log('Engine df data loaded', data)
  //     setData(data)
  //   })
  // }, [])
  //
  // const autoloader = useAutoreload(fetchData)

  const handleDisconnectClick = () => {
    logout().then(() => {
      console.log('Disconnected')
      localStorage.removeItem(envId + '.authToken')
      navigate('/')
    })
  }

  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Toolbar disableGutters>
        <Heading label={'Dashboard'}>
          <div>
            <Button variant={'outlined'} onClick={handleDisconnectClick}>
              Disconnect
            </Button>
            {/*<AutoreloadButton autoloader={autoloader} />*/}
          </div>
        </Heading>
      </Toolbar>

      <div>
        <DashboardOverviewStacked />
        <hr />
        <DashboardOverview2 />
        {/*<DashboardOverview data={data} />*/}
        <DockerEngineInfoWidget />
        {/*<SystemInfoWidget />*/}
      </div>
    </Container>
  )
}

export default DashboardPage
