import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Container from '@mui/material/Container'
import StacksTableMaterial from './components/StacksTableMaterial.tsx'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../../elements/Heading.tsx'
import StacksCreateButton from './components/StacksCreate.button.tsx'
import { useAgentDockerApi } from '~/helper/useAgentDockerApi.ts'
import { useAutoreload } from '~/helper/useAutoreload.ts'
import { useAppRepo } from '~/helper/useAppRepo.ts'
import AutoreloadButton from '../../../elements/Autoreload/AutoreloadButton.tsx'

const StacksPage = () => {
  //const loaderData = useLoaderData() as any // IDockerStack[]
  const [data, setData] = React.useState<any[]>([])
  const api = useAgentDockerApi()
  const repo = useAppRepo()

  const syncStacks = async () => {
    const data = await api.getStacks()
    await repo.updateStacks(data)
    return data
  }

  const fetchStacks = React.useCallback(async () => {
    syncStacks().then((data) => {
      setData(data)
    })
  }, [api])

  const autoloader = useAutoreload(fetchStacks)

  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Stacks</title>
      </Helmet>
      <Toolbar disableGutters>
        <Heading label={'Stacks'}>
          <div>
            <AutoreloadButton autoloader={autoloader} />
            <StacksCreateButton />
          </div>
        </Heading>
      </Toolbar>

      <StacksTableMaterial data={data} />
    </Container>
  )
}

export default StacksPage
