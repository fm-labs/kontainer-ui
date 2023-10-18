import React from 'react'
import SimpleModal from '../elements/modal/SimpleModal.tsx'

const ContainerCreateModal = () => {
  return (
    <>
      <SimpleModal title={"Create container"} buttonLabel={"Create"}>
        <p>Create a new container from an image</p>
      </SimpleModal>
    </>
  )
}

export default ContainerCreateModal
