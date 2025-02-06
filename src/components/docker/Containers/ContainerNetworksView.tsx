import React from 'react'

/**
 * ContainerNetworks
 *
 * "Networks": {
 *      "kstack-agent_default": {
 *        "IPAMConfig": null,
 *        "Links": null,
 *        "Aliases": [
 *          "kstack-agent-agent-1",
 *          "agent"
 *        ],
 *        "MacAddress": "02:42:ac:14:00:02",
 *        "DriverOpts": null,
 *        "NetworkID": "ed48be74defd91cc5bd1bdab5708f43405a1df2a2dab2cb27f97bfdda7e80faf",
 *        "EndpointID": "e22358c0c314d6790e2690ba01ddf31b5c3f99141dfd1c0afff252e922dc5f09",
 *        "Gateway": "172.20.0.1",
 *        "IPAddress": "172.20.0.2",
 *        "IPPrefixLen": 16,
 *        "IPv6Gateway": "",
 *        "GlobalIPv6Address": "",
 *        "GlobalIPv6PrefixLen": 0,
 *        "DNSNames": [
 *          "kstack-agent-agent-1",
 *          "agent",
 *          "97c75d7851b1"
 *        ]
 *      }
 *    }
 * @constructor
 */
const ContainerNetworksView = ({ networks }: { networks: any }) => {
  return (
    <div>
      {networks &&
        Object.entries(networks).map(([key, network]: [string, any]) => {
          return (
            <div key={key}>
              <div style={{ fontWeight: 'bold' }}>Network: {key}</div>
              <div>IP Address: {network.IPAddress}</div>
              <div>Gateway: {network.Gateway}</div>
              <div>Mac Address: {network.MacAddress}</div>
              <div>Aliases: {network.Aliases.join(', ')}</div>
              {/*<div>DriverOpts: {network.DriverOpts}</div>*/}
              <div>NetworkID: {network.NetworkID}</div>
              <div>EndpointID: {network.EndpointID}</div>
              {/*<div>IPAMConfig: {network.IPAMConfig}</div>*/}
              {/*<div>Links: {network.Links}</div>*/}
              <div>DNSNames: {network?.DNSNames?.join(', ')}</div>
            </div>
          )
        })}
    </div>
  )
}

export default ContainerNetworksView
