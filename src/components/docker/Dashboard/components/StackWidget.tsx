import React from 'react'
import { useEnvironment } from '~/helper/useEnvironmentContext.tsx'
import ContainerBlock from '~/components/docker/Dashboard/components/Blocks/ContainerBlock.tsx'

const StackWidget = ({ stackName }: { stackName: string }) => {
  const { df } = useEnvironment()

  const containers = React.useMemo(() => {
    if (!df) return []
    return df?.Containers?.filter((c) => c.Labels['com.docker.compose.project'] === stackName)
  }, [df, stackName])

  return (
    <div style={{ columns: 3, columnGap: '1rem', margin: '0.5rem 0' }}>
      {containers?.length === 0 && <div>No active containers found</div>}
      {containers?.map((c, idx) => <ContainerBlock key={`Container-${idx}`} container={c} />)}
    </div>
  )
}

export default StackWidget
