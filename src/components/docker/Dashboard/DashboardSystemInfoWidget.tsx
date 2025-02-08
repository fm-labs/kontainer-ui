import React from 'react'
import api from '../../../api.ts'
import ReactJson from 'react-json-view'
import DashboardResourcesWidget from './DashboardResourcesWidget.tsx'

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
      <div>System Info</div>
      {systemInfo ? <ReactJson src={systemInfo} /> : <div>Loading...</div>}
    </div>
  )
}

export default DashboardSystemInfoWidget
