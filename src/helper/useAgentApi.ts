import * as React from 'react'
import { agentInternalApiForEnv } from '~/lib/agentInternalApi.ts'
import { DEFAULT_ENVIRONMENT } from '~/constants.ts'

const useAgentApi = () => {
  return React.useMemo(() => {
    return agentInternalApiForEnv(DEFAULT_ENVIRONMENT)
  }, [])
}

export default useAgentApi
