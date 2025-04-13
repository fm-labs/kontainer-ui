import React from 'react'
import AppIcons from '../../../elements/AppIcons.tsx'
import Box from '@mui/material/Box'
import StackWidget from '~/components/docker/Dashboard/components/StackWidget.tsx'
import { useDockerContext } from '~/helper/useDockerContext.tsx'
import { Link } from 'react-router-dom'
import Heading from '~/elements/Heading.tsx'
import StackIconControls from '~/components/docker/Stacks/components/StackIconControls.tsx'

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
            <div>
              <AppIcons.StackIcon /> <Link to={buildUrl(`/docker/stacks/${stackId}`)}>{stackId}</Link> stack{' '}
              <StackIconControls stackId={stackId} />
            </div>
            <StackWidget stackName={stackId} />
          </Box>
        ))}
      </Box>
    </div>
  )
}

export default DashboardOverviewStacked
