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
        const portData = ports[port]
        if (!portData) {
          return (
            <div key={port}>
              0.0.0.0:{port} {'->'} {port}
            </div>
          )
        }
        const portData0 = portData[0]
        return (
          <div key={port}>
            {portData0.HostIp}:{portData0.HostPort} {'->'} {port}
          </div>
        )
      })}
    </div>
  )
}
