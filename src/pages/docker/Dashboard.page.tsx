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

const DashboardPage = () => {
  const api = useEnvApi()

  const [data, setData] = React.useState<any>(null)

  const fetchData = React.useCallback(() => {
    //console.log('Fetching Engine df data...')
    api
      .getEngineDf()()
      .then((data) => {
        //console.log('Engine df data loaded', data)
        setData(data)
      })
  }, [])

  const autoloader = useAutoreload(fetchData)

  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Toolbar disableGutters>
        <Heading label={'Dashboard'}>
          <div>
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
