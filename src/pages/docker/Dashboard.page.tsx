import React from 'react'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../elements/Heading.tsx'
import Container from '@mui/material/Container'
import DashboardResourcesWidget from '../../components/docker/Dashboard/DashboardResourcesWidget.tsx'
import DashboardSystemInfoWidget from '../../components/docker/Dashboard/DashboardSystemInfoWidget.tsx'
import DashboardEngineInfoWidget from '../../components/docker/Dashboard/DashboardEngineInfoWidget.tsx'

// const DashboardGridItem = styled(Paper)(({ theme }) => ({
//   backgroundColor: '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
//   ...theme.applyStyles('dark', {
//     backgroundColor: '#1A2027',
//   }),
// }))
//
// interface DashboardCardProps extends PropsWithChildren<any> {
//   title: string
// }
//
// const DashboardCard = ({ title, children }: DashboardCardProps) => {
//   return (
//     <Card>
//       <CardHeader title={title}></CardHeader>
//     </Card>
//   )
// }

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
        <DashboardEngineInfoWidget />
        <DashboardSystemInfoWidget />
      </div>
    </Container>
  )
}

export default DashboardPage
