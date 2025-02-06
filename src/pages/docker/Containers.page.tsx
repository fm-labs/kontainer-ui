import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Container from '@mui/material/Container'
import api from '../../api.ts'
import { IDockerResourceAttrs } from '../../types.ts'
import ContainersTableGrouped from '../../components/docker/Containers/ContainersTableGrouped.tsx'
import ContainerCreateButton from '../../components/docker/Containers/ContainerCreate.button.tsx'
import ContainersTableMaterial from '../../components/docker/Containers/ContainersTableMaterial.tsx'
import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../elements/Heading.tsx'
import { Helmet } from 'react-helmet-async'

const ContainersPage = () => {
  const loaderData = useLoaderData() as IDockerResourceAttrs[]
  const [data, setData] = React.useState(loaderData)
  const [showGrouped, setShowGrouped] = React.useState(true)

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowGrouped(e.target.checked)
  }

  React.useEffect(() => {
    console.log('ContainersPage mounted')
    const timer = setInterval(() => {
      console.log('Refreshing containers')
      api
        .getContainers()()
        .then((data) => {
          console.log('Containers refreshed', data)
          setData(data)
        })
    }, 5000)
    return () => {
      console.log('ContainersPage unmounted')
      clearInterval(timer)
    }
  }, [])

  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Containers</title>
      </Helmet>
      <Toolbar disableGutters>
        <Heading label={'Containers'}>
          <div>
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
      </div>
      {showGrouped ? <ContainersTableGrouped data={data} /> : <ContainersTableMaterial data={data} />}
    </Container>
  )
}

export default ContainersPage
