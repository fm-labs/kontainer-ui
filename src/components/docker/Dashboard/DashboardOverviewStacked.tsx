import React from 'react'
import Grid from '@mui/material/Grid2'
import AppIcons from '../../../elements/AppIcons.tsx'
import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import ContainerBlock from './components/Blocks/ContainerBlock.tsx'
import ImageBlock from './components/Blocks/ImageBlock.tsx'
import VolumeBlock from './components/Blocks/VolumeBlock.tsx'
import Box from '@mui/material/Box'
import StackWidget from '~/components/docker/Dashboard/components/StackWidget.tsx'
import { useEnvironment } from '~/helper/useEnvironmentContext.tsx'
import { Link } from 'react-router-dom'

const DashboardOverviewStacked = () => {
  const { df, buildUrl } = useEnvironment()
  const [onlyActive, setOnlyActive] = React.useState(true)

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

  const ItemContainer = ({ children }) => (
    <Grid container spacing={0.5}>
      {children}
    </Grid>
  )

  if (!df) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked value={onlyActive} onChange={(e) => setOnlyActive(e.target.checked)} />}
            label='Show only active resources'
          />
        </FormGroup>
      </div>
      <h5>
        <AppIcons.ContainerIcon /> Stacks ({stackIds.length})
      </h5>
      <Box>
        {stackIds.map((stackId, idx) => (
          <Box key={stackId} sx={{ mb: 3 }}>
            <div style={{ fontWeight: 'bold' }}>
              <AppIcons.StackIcon /> <Link to={buildUrl(`/docker/stacks/${stackId}`)}>Stack: {stackId}</Link>
            </div>
            <StackWidget stackName={stackId} />
          </Box>
        ))}
      </Box>
    </div>
  )
}

export default DashboardOverviewStacked
