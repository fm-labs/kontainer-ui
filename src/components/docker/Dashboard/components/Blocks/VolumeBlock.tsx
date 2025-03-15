import React from 'react'
import AppIcons from '../../../../../elements/AppIcons.tsx'
import { FileSizeFormatter } from '../../../../../elements/Formatters.tsx'
import GridResourceBlock from './GridResourceBlock.tsx'

const VolumeBlock = ({ volume }) => {
  let color = 'default'
  if (volume.UsageData.RefCount > 0) {
    color = 'success'
  } else {
    //color = 'warning'
  }

  return (
    <GridResourceBlock key={volume.Name} color={color}>
      <div style={{ fontWeight: 'bold' }}>
        <AppIcons.VolumeIcon /> {volume.Name.substring(0, 32)}
      </div>
      <div>{volume.Id}</div>
      <div>
        Size: <FileSizeFormatter value={volume?.UsageData?.Size} />
      </div>
      <div>Usage: {volume?.UsageData?.RefCount}</div>
    </GridResourceBlock>
  )
}

export default VolumeBlock
