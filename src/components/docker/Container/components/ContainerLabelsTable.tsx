import React from 'react'
import KeyValueTable from '../../../../elements/KeyValueTable.tsx'

const ContainerLabelsTable = ({ labels }: { labels: { [key: string]: string } }) => {
  const kvData = React.useMemo(() => {
    return Object.entries(labels).map((entry) => {
      return {
        key: entry[0],
        value: entry[1],
      }
    })
  }, [labels])

  return (
    <div>
      <KeyValueTable data={kvData} />
    </div>
  )
}

export default ContainerLabelsTable
