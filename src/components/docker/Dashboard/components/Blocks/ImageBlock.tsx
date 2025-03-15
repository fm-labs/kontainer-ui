import React from 'react'
import AppIcons from '../../../../../elements/AppIcons.tsx'
import { Link } from 'react-router-dom'
import { FileSizeFormatter } from '../../../../../elements/Formatters.tsx'
import GridResourceBlock from './GridResourceBlock.tsx'

const ImageBlock = ({ image }) => {
  let color = 'default'
  if (image.Containers > 0) {
    color = 'success'
  } else {
    //color = 'warning'
  }

  return (
    <GridResourceBlock key={image.Id} color={color}>
      <div style={{ fontWeight: 'bold' }}>
        <AppIcons.ImageIcon /> {image?.RepoTags ? image.RepoTags[0] : image.Id.substring(0, 32)}
      </div>
      <div>
        <Link to={`images/${image.Id}`}>{image.Id.substring(7, 19)}</Link>
      </div>
      <div>
        <FileSizeFormatter value={image.Size} /> / <FileSizeFormatter value={image.SharedSize} />
      </div>
      <div title={`${image.Containers} container using this image`}>
        <AppIcons.ContainerIcon /> {image.Containers}
      </div>
    </GridResourceBlock>
  )
}

export default ImageBlock
