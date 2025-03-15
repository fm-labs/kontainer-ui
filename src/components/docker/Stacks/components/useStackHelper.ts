import { toast } from 'react-toastify'
import { useErrorHandler } from '../../../../helper/useErrorHandler.ts'
import { useEnvApi } from '../../../../helper/useEnvApi.ts'

export const useStackHelper = () => {
  const { api } = useEnvApi()
  const { defaultErrorHandler } = useErrorHandler()

  const handleStackStartClick = (id: string) => () => {
    console.log('Starting stack', id)
    return toast
      .promise(api.startStack(id), {
        success: 'Starting stack',
        pending: 'Submitting request',
        error: 'Failed to start stack',
      })
      .catch(defaultErrorHandler)
  }

  const handleStackStopClick = (id: string) => () => {
    console.log('Stopping stack', id)
    return toast
      .promise(api.stopStack(id), {
        success: 'Stopping stack',
        pending: 'Submitting request',
        error: 'Failed to stop stack',
      })
      .catch(defaultErrorHandler)
  }

  const handleStackDeleteClick = (id: string) => () => {
    console.log('Deleting stack', id)
    return toast
      .promise(api.deleteStack(id), {
        success: 'Deleting stack',
        pending: 'Submitting request',
        error: 'Failed to delete stack',
      })
      .catch(defaultErrorHandler)
  }

  const handleStackDestroyClick = (id: string) => () => {
    console.log('Destroying stack', id)
    return toast
      .promise(api.destroyStack(id), {
        success: 'Destroying stack',
        pending: 'Submitting request',
        error: 'Failed to destroy stack',
      })
      .catch(defaultErrorHandler)
  }

  const handleStackSyncClick = (id: string) => () => {
    console.log('Syncing stack', id)
    return toast
      .promise(api.syncStack(id), {
        success: 'Syncing stack',
        pending: 'Submitting request',
        error: 'Failed to sync stack',
      })
      .catch(defaultErrorHandler)
  }

  return {
    handleStackStartClick,
    handleStackStopClick,
    handleStackDeleteClick,
    handleStackDestroyClick,
    handleStackSyncClick,
  }
}
