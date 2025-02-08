import React from 'react'

/**
 *     "Ports": {
 *       "5000/tcp": [
 *         {
 *           "HostIp": "0.0.0.0",
 *           "HostPort": "5000"
 *         }
 *       ]
 *     },
 * @param ports
 * @constructor
 */
export const ContainerPorts = ({ ports }: { ports: any }) => {
  //console.log('ContainerPorts', ports)

  if (!ports) {
    return <div>-</div>
  }

  return (
    <div>
      {Object.keys(ports).map((port) => {
        let hostSchema = 'http'
        let hostIp = '0.0.0.0'
        let hostPort = port

        const portData = ports[port]
        if (portData && portData[0]) {
          hostIp = portData[0].HostIp || hostIp
          hostPort = portData[0].HostPort || port
        }

        if (hostPort.endsWith('443')) {
          hostSchema = 'https'
        }

        const url = `${hostSchema}://${hostIp}:${hostPort}`
        return (
          <div key={port}>
            <a href={url} target={'_blank'} rel='noreferrer'>{`${hostPort}:${port}`}</a>
          </div>
        )
      })}
    </div>
  )
}
