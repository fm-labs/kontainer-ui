import React from 'react'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../elements/Heading.tsx'
import Container from '@mui/material/Container'
import DashboardEngineInfoWidget from '../../components/docker/Dashboard/DashboardEngineInfoWidget.tsx'
import DashboardOverviewWidget from '../../components/docker/Dashboard/DashboardOverviewWidget.tsx'

const DashboardPage = () => {
  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Toolbar disableGutters>
        <Heading label={'Dashboard'}>
          <div></div>
        </Heading>
      </Toolbar>

      <div>
        <DashboardOverviewWidget />
        <DashboardEngineInfoWidget />
        {/*<DashboardSystemInfoWidget />*/}
      </div>
    </Container>
  )
}

export default DashboardPage
