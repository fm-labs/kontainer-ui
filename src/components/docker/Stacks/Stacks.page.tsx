import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Container from '@mui/material/Container'
import StacksTableMaterial from './components/StacksTableMaterial.tsx'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../../elements/Heading.tsx'
import StacksCreateButton from './components/StacksCreate.button.tsx'
import { useEnvApi } from '~/helper/useEnvApi.ts'
import { useAutoreload } from '~/helper/useAutoreload.ts'
import { useEnvRepo } from '~/helper/useEnvRepo.ts'
import AutoreloadButton from '../../../elements/Autoreload/AutoreloadButton.tsx'

const StacksPage = () => {
  const loaderData = useLoaderData() as any // IDockerStack[]
  const [data, setData] = React.useState(loaderData)
  const { api } = useEnvApi()
  const repo = useEnvRepo()

  const fetchStacks = React.useCallback(async () => {
    repo.syncStacks().then((data) => {
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
