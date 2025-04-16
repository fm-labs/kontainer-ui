import React from 'react'
import appRepo from '../lib/appRepo.ts'
import { useDockerContext } from '~/helper/useDockerContext.tsx'
import { useEnvironment } from '~/helper/useEnvironmentContext.tsx'

export const useAppRepo = () => {
  const { environment } = useEnvironment()
  const { dockerHost } = useDockerContext()

  return React.useMemo(() => {
    if (!dockerHost) {
      throw new Error('Failed to init app repo: environment not found')
    }

    return appRepo(environment.id + '_' + dockerHost.id)
  }, [dockerHost])
}
