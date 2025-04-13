import appRepo from '../lib/appRepo.ts'
import React from 'react'
import { useEnvironment } from '~/helper/useEnvironmentContext.tsx'

export const useAppRepo = () => {
  const { environment } = useEnvironment()

  return React.useMemo(() => {
    if (!environment) {
      throw new Error('Failed to init app repo: environment not found')
    }

    return appRepo(environment.id)
  }, [environment])
}
