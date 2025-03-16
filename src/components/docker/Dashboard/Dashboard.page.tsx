import React from 'react'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../../elements/Heading.tsx'
import Container from '@mui/material/Container'
import DashboardOverview2 from './DashboardOverview2.tsx'
import DashboardOverviewStacked from '~/components/docker/Dashboard/DashboardOverviewStacked.tsx'
import DockerEngineInfoWidget from '~/components/docker/Dashboard/components/DockerEngineInfoWidget.tsx'
import DisconnectButton from '~/components/user/components/DisconnectButton.tsx'

const DashboardPage = () => {
  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Toolbar disableGutters>
        <Heading label={'Dashboard'}>
          <div>
            <DisconnectButton />
          </div>
        </Heading>
      </Toolbar>

      <div>
        <DashboardOverviewStacked />
        <DashboardOverview2 />
        {/*<DashboardOverview />*/}
        <DockerEngineInfoWidget />
        {/*<SystemInfoWidget />*/}
      </div>
    </Container>
  )
}

export default DashboardPage
