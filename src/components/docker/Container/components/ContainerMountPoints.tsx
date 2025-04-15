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
 *        "Source": "kontainer-agent_kontainer_agent_data",
 *        "Target": "/app/data",
 *        "VolumeOptions": {}
 *      }
 *    ],
 *  ],
 * @param mounts
 * @constructor
 */
const ContainerMountPoints = ({ mounts }: { mounts: any[] }) => {
  const renderMountPoint = (mount: any, index: number) => {
    // if (mount?.Type === 'volume') {
    //   return (
    //     <>
    //       {mount?.Target} ({mount?.Type})
    //     </>
    //   )
    // }
    //
    // if (mount?.Type === 'bind') {
    //   return (
    //     <>
    //       {mount?.Destination} ({mount?.Mode})
    //     </>
    //   )
    // }

    return (
      <div title={`${mount?.Source}:${mount?.Destination}:${mount?.Mode}`} key={`mount-${index}`}>
        {mount?.Destination} ({mount?.Mode})
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
          return <div key={`mount-${index}`}>{renderMountPoint(mount, index)}</div>
        })}
    </div>
  )
}

export default ContainerMountPoints
