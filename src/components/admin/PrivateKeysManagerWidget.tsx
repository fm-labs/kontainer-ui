import React from 'react'
import { Paper } from '@mui/material'
import { useEnvApi } from '../../helper/useEnvApi.ts'
import BasicDialogButton from '../../elements/Dialog/BasicDialogButton.tsx'
import PrivateKeyForm from './PrivateKeyForm.tsx'
import DeleteButton from '../../elements/DeleteButton/DeleteButton.tsx'
import Box from '@mui/material/Box'
import { toast } from 'react-toastify'

const PrivateKeysManagerWidget = () => {
  const [pkeys, setPkeys] = React.useState<string[]>([])
  const api = useEnvApi()

  const fetchKeys = React.useCallback(async () => {
    const response = await api.listPrivateKeys()
    setPkeys(response)
  }, [api])

  const handleFormSubmit = (formData: FormData) => {
    const payload = Object.fromEntries(formData)
    const keyId = formData.get('key_id') as string
    console.log(formData, payload)
    api
      .updatePrivateKey(keyId, payload)
      .then((response) => {
        console.log(response)
        toast.success('Key successfully updated')
      })
      .catch((error) => {
        toast.error('Something went wrong: ' + error?.response?.data?.error)
        throw error
      })
      .finally(() => {
        fetchKeys()
      })
  }

  const handleDeleteKey = (name: string) => async () => {
    await api.deletePrivateKey(name)
    fetchKeys()
  }

  React.useEffect(() => {
    fetchKeys()
  }, [fetchKeys])

  if (!pkeys) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <BasicDialogButton label={'Add Key'} dialogLabel={'Add Key'}>
        <PrivateKeyForm onSubmit={handleFormSubmit} />
      </BasicDialogButton>
      {pkeys && pkeys.length > 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
          {pkeys.map((pkey) => (
            <div key={pkey} style={{ flexGrow: 0, flexBasis: '25%', marginTop: '1rem' }}>
              <Paper sx={{ p: 2 }} elevation={2}>
                <h4>{pkey}</h4>
                <div>
                  <BasicDialogButton size={'small'} label={'Edit'} dialogLabel={'Edit Container Key'}>
                    <PrivateKeyForm onSubmit={handleFormSubmit} initialData={pkey} editMode={true} />
                  </BasicDialogButton>
                  <DeleteButton size={'small'} onConfirm={handleDeleteKey(pkey)}></DeleteButton>
                </div>
              </Paper>
            </div>
          ))}
        </Box>
      ) : (
        <div>No keys found</div>
      )}
    </div>
  )
}

export default PrivateKeysManagerWidget
