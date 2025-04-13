import React from 'react'
import { useAgentDockerApi } from '../../../../helper/useAgentDockerApi.ts'
import { toast } from 'react-toastify'
import { Button } from '@mui/material'

const ContainerExecCommandWidget = ({ container }) => {
  const [logs, setLogs] = React.useState<string[]>([])
  const api = useAgentDockerApi()
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

    api
      .execContainerCommand(container.Id, command)
      .then((response) => {
        setLogs(response.data)
      })
      .catch((error) => {
        setLogs(['An error occured', error?.message || 'Unknown error'])
      })
  }, [container, command])

  return (
    <div>
      <div>
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
      <div>
        <textarea
          style={{ maxWidth: '800px' }}
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          cols={100}
          rows={3}
        />
      </div>
      <div>
        <Button onClick={execCommand} variant={'outlined'}>
          Execute
        </Button>
      </div>
    </div>
  )
}

export default ContainerExecCommandWidget
