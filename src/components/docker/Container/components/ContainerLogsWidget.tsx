import React from 'react'
import { useAgentDockerApi } from '~/helper/useAgentDockerApi.ts'
import { IDockerResourceAttrs } from '~/types.ts'
import moment from 'moment'

const ContainerLogsWidget = ({ container }: { container: IDockerResourceAttrs }) => {
  const [logs, setLogs] = React.useState<string[]>([])
  const [firstLog, setFirstLog] = React.useState<number>()
  const [lastLog, setLastLog] = React.useState<number>()
  const [isLoadingNew, setIsLoadingNew] = React.useState<boolean>(false)
  const [autoloadNew, setAutoloadNew] = React.useState<boolean>(true)

  const api = useAgentDockerApi()

  const LOG_FETCH_INTERVAL = 5000 // 5 seconds

  const fetchOlderLogs = React.useCallback(async () => {
    api.getContainerLogs(container.Id, undefined, firstLog).then((data) => {
      setLogs([...data, ...logs]) // prepend new logs to existing logs

      // @todo updated the firstFetched timestamp based on the logs fetched
    })
  }, [container, firstLog])

  const fetchNewLogs = React.useCallback(async () => {
    setIsLoadingNew(true)
    api
      .getContainerLogs(container.Id, lastLog)
      .then((data) => {
        setLogs([...logs, ...data])

        if (firstLog === undefined) {
          // if firstLog is not set, set it to the timestamp of the first log
          const firstLogTimestamp = data.length > 0 ? new Date(data[0].split(' ')[0]).getTime() : Date.now()
          setFirstLog(firstLogTimestamp)
        }
        setLastLog(Date.now())
      })
      .finally(() => setIsLoadingNew(false))
  }, [container, firstLog, lastLog])

  React.useEffect(() => {
    fetchNewLogs()
  }, [])

  const renderLine = (line: string, idx: number) => {
    const style: any = {}
    if (line.startsWith('Error: ')) {
      style['color'] = 'red'
    }
    // get timestamp, the first space-separated parted of the line
    const parts = line.split(' ')
    let timestamp = ''
    if (parts.length < 1) {
      return ''
    }
    timestamp = parts[0]
    // if timestamp is a valid date, format it
    // const date = new Date(timestamp)
    // if (!isNaN(date.getTime())) {
    //   style['color'] = 'gray'
    //   line = line.replace(timestamp, date.toLocaleTimeString())
    // }
    // remove timestamp from line
    line = line.replace(timestamp, '').trim()

    // parse ANSII colors
    if (line.includes('[m\x1b[')) {
      // replace ANSII color codes with HTML span tags
      line = line.replace(/\[m\x1b\[(\d+)(;\d+)*m/g, (match, p1) => {
        const colorCode = parseInt(p1, 10)
        let color = 'black'
        switch (colorCode) {
          case 31:
            color = 'red'
            break
          case 32:
            color = 'green'
            break
          case 33:
            color = 'orange'
            break
          case 34:
            color = 'blue'
            break
          case 35:
            color = 'magenta'
            break
          case 36:
            color = 'cyan'
            break
          case 37:
            color = 'white'
            break
        }
        return `<span style="color:${color}">`
      })
      line += '</span>'
    }

    let timestampEl = ''
    if (isNaN(new Date(timestamp).getTime())) {
      // if timestamp is not a valid date, just show it as is
      timestampEl = `<span style="color:gray; font-size:0.8rem;">${timestamp}</span>`
    } else {
      // const timestampFormatted = new Date(timestamp).toLocaleTimeString('en-US', {
      //   day: 'numeric',
      //   month: '2-digit',
      //   year: 'numeric',
      //   hour: '2-digit',
      //   minute: '2-digit',
      //   second: '2-digit',
      //   fractionalSecondDigits: '2',
      //   hour12: false,
      // })
      const timestampFormatted = moment(timestamp).format('YYYY-MM-DD HH:mm:ss.SSS')
      timestampEl = `<span style="color:gray; font-size:0.8rem;">${timestampFormatted}</span>`
    }

    return <div key={`log-${idx}`} style={style} dangerouslySetInnerHTML={{ __html: `${timestampEl} ${line}` }} />
  }

  // auto-fetch new logs with interval
  React.useEffect(() => {
    if (!autoloadNew) return
    const timer = setInterval(fetchNewLogs, LOG_FETCH_INTERVAL) // fetch new logs every 5 seconds
    return () => {
      clearInterval(timer)
    }
  }, [fetchNewLogs, autoloadNew])

  return (
    <div>
      <div onClick={fetchOlderLogs}>Load older logs (before {moment(firstLog).format('YYYY-MM-DD HH:mm:ss.SSS')})</div>
      <hr />
      <div>{logs.map((log, index) => renderLine(log, index))}</div>
      <hr />
      <div onClick={fetchNewLogs}>
        Last refresh: {moment(lastLog).fromNow()} <button onClick={fetchNewLogs}>Refresh</button>{' '}
        {isLoadingNew && 'Refreshing...'}
      </div>
      <div>
        Auto-fetch new logs is{' '}
        <button onClick={() => setAutoloadNew(!autoloadNew)}>{autoloadNew ? 'Enabled' : 'Disabled'}</button>
      </div>
    </div>
  )
}

export default ContainerLogsWidget
