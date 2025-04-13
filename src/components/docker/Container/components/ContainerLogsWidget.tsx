import React from 'react'
import { useAgentDockerApi } from '../../../../helper/useAgentDockerApi.ts'

const ContainerLogsWidget = ({ container }) => {
  const [logs, setLogs] = React.useState<string[]>([])
  const api = useAgentDockerApi()

  const fetchLogs = React.useCallback(async () => {
    api.getContainerLogs(container.Id).then((data) => {
      setLogs(data)
    })
  }, [container])

  React.useEffect(() => {
    fetchLogs()
  }, [])

  return (
    <div>
      {logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  )
}

export default ContainerLogsWidget
