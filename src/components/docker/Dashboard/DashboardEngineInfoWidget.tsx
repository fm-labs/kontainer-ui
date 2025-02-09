import React from 'react'
import api from '../../../lib/api.ts'
import ReactJson from 'react-json-view'
import DashboardResourcesWidget from './DashboardResourcesWidget.tsx'
import KeyValueGrid from '../../../elements/KeyValueGrid.tsx'
import { Paper } from '@mui/material'

const DashboardEngineInfoWidget = () => {
  const [systemInfo, setEngineInfo] = React.useState<any>(null)

  const kvInfo = React.useMemo(() => {
    if (!systemInfo) return []

    return Object.entries(systemInfo)
      .filter((entry) => typeof entry[1] !== 'object' && Array.isArray(entry[1]) === false)
      .map((entry) => {
        return {
          key: entry[0],
          value: systemInfo[entry[0]],
        }
      })
  }, [systemInfo])

  const fetchEngineInfo = React.useCallback(() => {
    api
      .getEngineInfo()()
      .then((data) => {
        console.log('data', data)
        setEngineInfo(data)
      })
  }, [])

  React.useEffect(() => {
    fetchEngineInfo()
  }, [])

  return (
    <div>
      <div>Engine Info</div>
      {systemInfo && <DashboardResourcesWidget systemInfo={systemInfo} />}

      <hr />
      <Paper sx={{ padding: 2 }}>
        <KeyValueGrid data={kvInfo} />
        {/*<KeyValueTable data={kvInfo} />*/}
      </Paper>

      <hr />
      {systemInfo ? <ReactJson src={systemInfo} /> : <div>Loading...</div>}
    </div>
  )
}

export default DashboardEngineInfoWidget
