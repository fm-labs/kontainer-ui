import React from 'react'
import { useDockerContext } from '~/helper/useDockerContext.tsx'
import ImagesDfTableMaterial from '~/components/docker/Images/components/ImagesDfTableMaterial.tsx'
import { ImageDetailsDrawer } from '~/components/docker/Images/components/ImageDetailsDrawer.tsx'
import { IDockerResourceAttrs } from '~/types.ts'

const ImagesDfView = () => {
  const { df } = useDockerContext()
  const [selectedImage, setSelectedImage] = React.useState<IDockerResourceAttrs | null>(null)
  const toggleDrawer = (open) => setSelectedImage(open ? selectedImage : null)

  return (
    <div>
      {selectedImage && <ImageDetailsDrawer image={selectedImage} open={!!selectedImage} setOpen={toggleDrawer} />}
      <ImagesDfTableMaterial data={df.Images || []} onRowClick={(row) => setSelectedImage(row)} />
    </div>
  )
}

export default ImagesDfView
