import React from 'react'

/**
 * Container mounts
 *
 *  "Mounts": [
 *    {
 *      "Type": "bind",
 *      "Source": "/home/user/data/postgres",
 *      "Destination": "/var/lib/postgresql/data",
 *      "Mode": "rw",
 *      "RW": true,
 *      "Propagation": "rprivate"
 *    }
 *    "Mounts": [
 *      {
 *        "Type": "volume",
 *        "Source": "kstack-agent_kstack_agent_data",
 *        "Target": "/app/data",
 *        "VolumeOptions": {}
 *      }
 *    ],
 *  ],
 * @param mounts
 * @constructor
 */
const ContainerMounts = ({ mounts }: { mounts: any[] }) => {
  const renderMount = (mount: any, index: number) => {
    return (
      <div title={`${mount?.Source}:${mount?.Destination}:${mount?.Mode}`} key={`mount-${index}`}>
        {mount?.Source} {'->'} {mount?.Destination} ({mount?.Mode})
      </div>
    )
  }

  return (
    <div>
      {mounts
        .sort((a, b) => {
          if (a.Destination < b.Destination) {
            return -1
          }
          if (a.Destination > b.Destination) {
            return 1
          }
          return 0
        })
        .map((mount, index) => {
          return <div key={`mount-${index}`}>{renderMount(mount, index)}</div>
        })}
    </div>
  )
}

export default ContainerMounts
