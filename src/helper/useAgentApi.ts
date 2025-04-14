import * as React from 'react'
import { agentInternalApiForEnv } from '~/lib/agentInternalApi.ts'
import { DEFAULT_ENVIRONMENT } from '~/constants.ts'
import { useEnvironment } from '~/helper/useEnvironmentContext.tsx'

const useAgentApi = () => {
  const { environment } = useEnvironment()
  return React.useMemo(() => {
    return agentInternalApiForEnv(environment)
  }, [])
}

export default useAgentApi
