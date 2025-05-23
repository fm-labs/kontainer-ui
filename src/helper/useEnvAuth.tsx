import React from 'react'
import { useEnvAuthProcessor } from '~/helper/useEnvAuthProcessor.ts'
import { AuthProvider } from '~/helper/useAuth.tsx'
import { useEnvironment } from '~/helper/useEnvironmentContext.tsx'

export const EnvAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { environment } = useEnvironment()
  if (!environment) {
    throw new Error('EnvAuthProvider must be used within an EnvironmentProvider')
  }

  const authProcessor = useEnvAuthProcessor()
  return <AuthProvider authProcessor={authProcessor}>{children}</AuthProvider>
}
