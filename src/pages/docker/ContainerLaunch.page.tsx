import React from 'react'
import Container from '@mui/material/Container'

const ContainerLaunchPage = () => {
  return (
    <Container maxWidth={false}>
      <h1>Launch container</h1>

      <div>
        <h2>Launch container from Form</h2>
        <input name={'image'} type={'text'} placeholder={'Image'} />
        <input name={'command'} type={'text'} placeholder={'Command'} />
        <input name={'ports'} type={'text'} placeholder={'Ports e.g. 8080:80,9443:443'} />
      </div>
      <hr />

      <div>
        <h2>Launch container from inline Dockerfile</h2>
        <textarea placeholder={'Dockerfile contents here'} />
      </div>
      <hr />

      <div>
        <h2>Launch container from URL</h2>
        <input type={'text'} placeholder={'URL'} />
      </div>
      <hr />

      <div>
        <h2>Launch container from Repo</h2>
        <input type={'text'} placeholder={'Repo URL'} />
      </div>
      <hr />

      <div>
        <h2>Launch container from Portainer Template</h2>
        <input type={'text'} placeholder={'Templates URL'} />
        <input type={'text'} placeholder={'Template Name'} />
      </div>
      <hr />
    </Container>
  )
}

export default ContainerLaunchPage
