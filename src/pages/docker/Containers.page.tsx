import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Container from '@mui/material/Container'
import { IDockerResourceAttrs } from '../../types.ts'
import ContainersTableGrouped from '../../components/docker/Containers/ContainersTableGrouped.tsx'
import ContainerCreateButton from '../../components/docker/Containers/ContainerCreate.button.tsx'
import ContainersTableMaterial from '../../components/docker/Containers/ContainersTableMaterial.tsx'
import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../elements/Heading.tsx'
import { Helmet } from 'react-helmet-async'
import { useHostApi } from '../../helper/useHostApi.ts'
import appRepo from '../../lib/repo.ts'
import useAutoreload from '../../helper/useAutoreload.ts'
import AutoreloadButton from '../../elements/Autoreload/AutoreloadButton.tsx'

const ContainersPage = () => {
  const loaderData = useLoaderData() as IDockerResourceAttrs[]
  const [data, setData] = React.useState(loaderData)
  const [showGrouped, setShowGrouped] = React.useState(true)
  const api = useHostApi()

  const CONTAINER_REFRESH_INTERVAL = 15000

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowGrouped(e.target.checked)
  }

  const fetchContainers = React.useCallback(async () => {
    appRepo(api)
      .syncContainers()
      .then((data) => {
        setData(data)
      })
  }, [api])

  const autoloader = useAutoreload(fetchContainers, CONTAINER_REFRESH_INTERVAL)

  // React.useEffect(() => {
  //   console.log('ContainersPage mounted')
  //   const timer = setInterval(() => {
  //     console.log('Refreshing containers')
  //     fetchContainers()
  //   }, CONTAINER_REFRESH_INTERVAL)
  //   return () => {
  //     console.log('ContainersPage unmounted')
  //     clearInterval(timer)
  //   }
  // }, [])
  //
  // React.useEffect(() => {
  //   fetchContainers()
  // }, [])

  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Containers</title>
      </Helmet>
      <Toolbar disableGutters>
        <Heading label={'Containers'}>
          <div>
            <AutoreloadButton autoloader={autoloader} />
            <ContainerCreateButton />
          </div>
        </Heading>
      </Toolbar>

      <div>
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked value={showGrouped} onChange={handleSwitchChange} />}
            label='Show grouped'
          />
        </FormGroup>
        {/*<div>Last update: {autoloader.lastExec ? new Date(autoloader.lastExec).toLocaleTimeString() : '?'}</div>*/}
      </div>
      {showGrouped ? <ContainersTableGrouped data={data} /> : <ContainersTableMaterial data={data} />}
    </Container>
  )
}

export default ContainersPage
