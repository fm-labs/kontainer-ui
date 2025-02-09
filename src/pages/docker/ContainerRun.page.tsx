import React from 'react'
import ContainerRunForm from '../../components/docker/Containers/ContainerRun.form.tsx'
import Container from '@mui/material/Container'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../elements/Heading.tsx'
import api from '../../lib/api.ts'
import { toast } from 'react-toastify'

const ContainerRunPage = () => {
  const onRun = (data) => {
    console.log('Run', data)

    api
      .runContainer()(data)
      .then((response) => {
        const data = response.data
        console.log('Container run', data)
        toast.success('Container run')
        // toast.info(
        //   <>
        //     <Link to={`/containers/${data.Id}`}>View container</Link>
        //   </>,
        // )
        toast.info(<a href={`/container/${data.Id}`}>View container {data?.Id.substring(0, 12)}</a>)
      })
      .catch((error) => {
        console.error('error running container', error)
        toast.error('Error running container')
      })
  }

  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Run</title>
      </Helmet>
      <Toolbar disableGutters>
        <Heading label={'Run'}>
          <div></div>
        </Heading>
      </Toolbar>
      <div>
        <ContainerRunForm onSubmit={onRun} />
      </div>
    </Container>
  )
}

export default ContainerRunPage
