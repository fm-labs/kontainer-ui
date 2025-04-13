import { useDockerContext } from '~/helper/useDockerContext.tsx'

export const useAgentDockerApi = () => {
  const { api } = useDockerContext()
  return api
}
