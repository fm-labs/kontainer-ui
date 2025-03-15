import React from 'react'
import { IDockerResourceAttrs } from '../../../../types.ts'
import KeyValueTable from '../../../../elements/KeyValueTable.tsx'

const ContainerPathsTable = ({ container }: { container: IDockerResourceAttrs }) => {
  const kvData = React.useMemo(() => {
    return Object.entries(container)
      .filter((entry) => entry[0].endsWith('Path') && entry[0] !== 'Path')
      .map((entry) => {
        return {
          key: entry[0],
          value: entry[1],
        }
      })
  }, [container])

  return (
    <div>
      <KeyValueTable data={kvData} />
    </div>
  )
}

export default ContainerPathsTable
