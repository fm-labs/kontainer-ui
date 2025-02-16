import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Container from '@mui/material/Container'
import StacksTableMaterial from '../../components/docker/Stacks/StacksTableMaterial.tsx'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../elements/Heading.tsx'
import StacksCreateButton from '../../components/docker/Stacks/StacksCreate.button.tsx'
import { useEnvApi } from '../../helper/useEnvApi.ts'
import appRepo from '../../lib/repo.ts'
import useAutoreload from '../../helper/useAutoreload.ts'

const StacksPage = () => {
  const loaderData = useLoaderData() as any // IDockerStack[]
  const [data, setData] = React.useState(loaderData)
  const api = useEnvApi()

  const STACKS_FETCH_INTERVAL = 15000

  const fetchStacks = React.useCallback(async () => {
    // api
    //   .getStacks()()
    //   .then((data) => {
    //     setData(data)
    //   })
    appRepo(api)
      .syncStacks()
      .then((data) => {
        setData(data)
      })
  }, [api])

  const autoloader = useAutoreload(fetchStacks, STACKS_FETCH_INTERVAL)

  // React.useEffect(() => {
  //   console.log('StacksPage mounted')
  //   //fetchStacks()
  //   // const timer = setInterval(() => {
  //   //   console.log('Refreshing stacks')
  //   //   fetchStacks()
  //   // }, STACKS_FETCH_INTERVAL)
  //
  //   const timer = setTimeout(fetchStacks, STACKS_FETCH_INTERVAL)
  //
  //   return () => {
  //     console.log('StacksPage unmounted')
  //     //clearInterval(timer)
  //     clearTimeout(timer)
  //   }
  // }, [fetchStacks])

  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Stacks</title>
      </Helmet>
      <Toolbar disableGutters>
        <Heading label={'Stacks'}>
          <div>
            <StacksCreateButton />
          </div>
        </Heading>
      </Toolbar>

      <div>Last update: {autoloader.lastExec ? new Date(autoloader.lastExec).toLocaleTimeString() : '?'}</div>
      <StacksTableMaterial data={data} />
    </Container>
  )
}

export default StacksPage
