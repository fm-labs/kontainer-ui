import React from 'react'
import api from '../../../lib/api.ts'
import JsonView from '../../../elements/JsonView.tsx'
import { Paper } from '@mui/material'
import AppIcons from '../../../elements/AppIcons.tsx'

const DashboardSystemInfoWidget = () => {
  const [systemInfo, setSystemInfo] = React.useState<any>(null)

  const fetchSystemInfo = React.useCallback(() => {
    api
      .getSystemInfo()()
      .then((data) => {
        console.log('data', data)
        setSystemInfo(data)
      })
  }, [])

  React.useEffect(() => {
    fetchSystemInfo()
  }, [])

  return (
    <div>
      <h5>
        <AppIcons.BugIcon /> System Info
      </h5>
      <Paper sx={{ padding: 2 }}>{systemInfo ? <JsonView src={systemInfo} /> : <div>Loading...</div>}</Paper>
    </div>
  )
}

export default DashboardSystemInfoWidget
