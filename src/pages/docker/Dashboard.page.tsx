import React from 'react'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../elements/Heading.tsx'
import Container from '@mui/material/Container'
import DashboardEngineInfoWidget from '../../components/docker/Dashboard/DashboardEngineInfoWidget.tsx'
import DashboardOverview from '../../components/docker/Dashboard/DashboardOverview.tsx'
import AutoreloadButton from '../../elements/Autoreload/AutoreloadButton.tsx'
import { useEnvApi } from '../../helper/useEnvApi.ts'
import useAutoreload from '../../helper/useAutoreload.ts'
import Button from '@mui/material/Button'
import { useAuth } from '../../context/AuthProvider.tsx'
import { useNavigate } from 'react-router'

const DashboardPage = () => {
  const { api, envId } = useEnvApi()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [data, setData] = React.useState<any>(null)

  const fetchData = React.useCallback(() => {
    //console.log('Fetching Engine df data...')
    api.getEngineDf().then((data) => {
      //console.log('Engine df data loaded', data)
      setData(data)
    })
  }, [])

  const autoloader = useAutoreload(fetchData)

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
            <AutoreloadButton autoloader={autoloader} />
          </div>
        </Heading>
      </Toolbar>

      <div>
        <DashboardOverview data={data} />
        <DashboardEngineInfoWidget />
        {/*<DashboardSystemInfoWidget />*/}
      </div>
    </Container>
  )
}

export default DashboardPage
