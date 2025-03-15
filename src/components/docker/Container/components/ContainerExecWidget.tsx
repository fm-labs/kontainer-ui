import React from 'react'
import { useEnvApi } from '../../../../helper/useEnvApi.ts'
import { toast } from 'react-toastify'

const ContainerExecCommandWidget = ({ container }) => {
  const [logs, setLogs] = React.useState<string[]>([])
  const { api } = useEnvApi()
  const [command, setCommand] = React.useState('whoami')

  const execCommand = React.useCallback(async () => {
    if (!container) {
      toast.error('Container not found')
      return
    }
    if (!command) {
      toast.error('Command is empty')
      return
    }

    const p = api.execContainerCommand(container.Id, command).then((response) => {
      setLogs(response.data)
    })

    await toast.promise(p, {
      pending: 'Executing command',
      success: 'Command executed',
      error: 'Error executing command',
    })
  }, [container])

  return (
    <div>
      <textarea value={command} onChange={(e) => setCommand(e.target.value)} cols={100} rows={3} />
      <button onClick={execCommand}>Execute</button>

      {logs.map((log, index) => (
        <div key={index}>{log}</div>
      ))}
    </div>
  )
}

export default ContainerExecCommandWidget
