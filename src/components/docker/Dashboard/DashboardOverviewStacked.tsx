import React from 'react'
import AppIcons from '../../../elements/AppIcons.tsx'
import Box from '@mui/material/Box'
import StackWidget from '~/components/docker/Dashboard/components/StackWidget.tsx'
import { useDockerContext } from '~/helper/useDockerContext.tsx'
import { Link } from 'react-router-dom'
import StackIconControls from '~/components/docker/Stacks/components/StackIconControls.tsx'
import { Typography } from '@mui/material'

const DashboardOverviewStacked = () => {
  const { df, buildUrl } = useDockerContext()

  const stackIds = React.useMemo(() => {
    if (!df) return []
    const labels =
      df?.Containers?.reduce((acc, c) => {
        if (c.Labels['com.docker.compose.project']) {
          acc[c.Labels['com.docker.compose.project']] = true
        }
        return acc
      }, {}) || {}
    return Object.keys(labels).sort()
  }, [df])

  if (!df) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Box>
        {stackIds.map((stackId, idx) => (
          <Box key={stackId} sx={{ mb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                verticalAlign: 'middle',
              }}
            >
              <Typography variant='h5' color='textSecondary' sx={{ mr: 1 }}>
                <AppIcons.StackIcon /> <Link to={buildUrl(`/stacks/${stackId}`)}>{stackId}</Link>
              </Typography>
              <StackIconControls stackId={stackId} />
            </Box>
            <StackWidget stackName={stackId} />
          </Box>
        ))}
      </Box>
    </div>
  )
}

export default DashboardOverviewStacked
