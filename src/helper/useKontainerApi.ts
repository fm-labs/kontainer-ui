import * as React from 'react'
import { kontainerApiForEnv } from '~/lib/kontainerApi.ts'
import { useEnvironment } from '~/helper/useEnvironmentContext.tsx'

const useKontainerApi = () => {
  const { environment } = useEnvironment()
  return React.useMemo(() => {
    return kontainerApiForEnv(environment)
  }, [])
}

export default useKontainerApi
