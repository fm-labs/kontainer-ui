import React from 'react'
import KeyValueTable from '../../../../elements/KeyValueTable.tsx'

const ContainerEnvVariablesTable = ({ env }: { env: string[] }) => {
  const kvData = React.useMemo(() => {
    return env.map((envVar) => {
      const [key, value] = envVar.split('=')
      return {
        key,
        value,
      }
    })
  }, [env])

  return (
    <div>
      <KeyValueTable data={kvData} />
    </div>
  )
}

export default ContainerEnvVariablesTable
