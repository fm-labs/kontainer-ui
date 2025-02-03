import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap'
import { FaPlay, FaStop, FaTrash } from 'react-icons/fa'
import api from '../api.ts'
import ReactJson from 'react-json-view'

const ContainerPage = () => {

  const loaderData = useLoaderData() as any // IDockerComposeContainer
  const [data, setData] = React.useState(loaderData)

  const handleContainerStartClick = (id: string) => () => {
    console.log('Starting container', id)
    //api.startContainer()(id)
  }

  const handleContainerStopClick = (id: string) => () => {
    console.log('Stopping container', id)
    //api.stopContainer()(id)
  }

  React.useEffect(()=> {
    console.log('ContainerPage mounted')
    let timer = setInterval(() => {
      console.log('Refreshing containers')
      api.getContainer()(data.Id).then((data) => {
        console.log('Container refreshed', data)
        setData(data);
      })
    }, 5000)
    return () => {
      console.log('ContainerPage unmounted')
      clearInterval(timer)
    }
  }, [])

  return (
    <Container>
      <h1>Container {data.Id || 'Untitled'}</h1>
      <Button size={'sm'} onClick={handleContainerStartClick(data.Id)}><FaPlay />{' '}Start</Button>
      <Button size={'sm'} onClick={handleContainerStopClick(data.Id)}><FaStop />{' '}Stop</Button>
      <Button size={'sm'} variant={'danger'}><FaTrash />{' '}Remove</Button>
      <hr />
      <ReactJson src={data} />
    </Container>
  )
}

export default ContainerPage
