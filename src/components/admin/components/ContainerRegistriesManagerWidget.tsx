import React from 'react'
import { Paper, Typography } from '@mui/material'
import { useEnvApi } from '~/helper/useEnvApi.ts'
import { ContainerRegistry } from '~/types.ts'
import BasicDialogButton from '../../../elements/Dialog/BasicDialogButton.tsx'
import ContainerRegistryForm from './ContainerRegistryForm.tsx'
import DeleteButton from '../../../elements/DeleteButton/DeleteButton.tsx'
import Box from '@mui/material/Box'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'

const ContainerRegistriesManagerWidget = () => {
  const [registries, setRegistries] = React.useState<ContainerRegistry[]>([])
  const { api } = useEnvApi()

  const fetchRegistries = React.useCallback(async () => {
    const response = await api.getContainerRegistries()
    setRegistries(response)
  }, [api])

  const handleFormSubmit = (formData: FormData) => {
    const payload = Object.fromEntries(formData)
    const registryName = formData.get('name') as string
    api
      .updateContainerRegistry(registryName, payload)
      .then((response) => {
        console.log(response)
        toast.success('Registry successfully updated')
      })
      .catch((error) => {
        toast.error('Something went wrong: ' + error?.response?.data?.error)
      })
      .finally(fetchRegistries)
  }

  const handleRegistryDelete = (name: string) => async () => {
    await api.deleteContainerRegistry(name).finally(fetchRegistries)
  }

  const handleRegistryLogin = (name: string) => async () => {
    await api
      .loginContainerRegistry(name, {})
      .then(() => {
        toast.success('Registry login successfully')
      })
      .catch((error) => {
        toast.error('Something went wrong: ' + error?.response?.data?.error)
      })
      .finally(fetchRegistries)
  }

  React.useEffect(() => {
    fetchRegistries()
  }, [fetchRegistries])

  return (
    <div>
      <BasicDialogButton label={'Add Registry'} dialogLabel={'Add Registry'}>
        <ContainerRegistryForm onSubmit={handleFormSubmit} />
      </BasicDialogButton>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
        {registries.map((registry) => (
          <div key={registry.name} style={{ flexGrow: 0, flexBasis: '33%', height: '100%' }}>
            <Paper sx={{ p: 2, marginTop: '1rem', marginRight: '1rem', height: '100%' }} elevation={2}>
              <h4>{registry?.label || registry.name}</h4>
              <div>
                <div>{registry.name}</div>
                <div>host={registry.host}</div>
                <div>username={registry?.username}</div>
                <div>password={registry?.password}</div>
              </div>
              <div>
                <Button
                  variant={'contained'}
                  color={'secondary'}
                  size={'small'}
                  onClick={handleRegistryLogin(registry.name)}
                >
                  Login
                </Button>
                <BasicDialogButton size={'small'} label={'Edit'} dialogLabel={'Edit Container Registry'}>
                  <ContainerRegistryForm onSubmit={handleFormSubmit} initialData={registry} editMode={true} />
                </BasicDialogButton>
                <DeleteButton size={'small'} onConfirm={handleRegistryDelete(registry.name)}></DeleteButton>
              </div>
            </Paper>
          </div>
        ))}
      </Box>
    </div>
  )
}

export default ContainerRegistriesManagerWidget
