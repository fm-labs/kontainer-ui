import React from 'react'
import AppIcons from '../../../../elements/AppIcons.tsx'
import ContainerFormatters from '../../Containers/ContainerFormatters.tsx'
import { Link } from 'react-router-dom'
import ContainerStatusText from '../../Containers/ContainerStatusText.tsx'
import { FileSizeFormatter } from '../../../../elements/Formatters.tsx'
import ContainerIconControls from '../../Containers/ContainerIconControls.tsx'
import BlockItem from './BlockItem.tsx'

const ContainerBlock = ({ container }) => {
  let color = 'default'
  if (container.State === 'running') {
    color = 'success'
  } else if (container.State === 'exited') {
    color = 'error'
  }

  const containerName = (container.Names && container.Names[0]) || container.Id
  const containerNameShort = (container.Names && container.Names[0]) || container.Id.substring(0, 12)

  return (
    <BlockItem key={container.Id} color={color}>
      <div
        style={{
          fontWeight: 'bold',
          textOverflow: 'ellipsis',
          maxWidth: '100%',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
        title={containerName}
      >
        <AppIcons.ContainerIcon />{' '}
        {/*<Link to={`/container/${container.Id}`}>{container.Names[0] || container.Id.substring(0, 32)}</Link>*/}
        <ContainerFormatters.ContainerName value={containerNameShort} />
      </div>
      <div>
        <Link to={`containers/${container.Id}`}>
          <ContainerFormatters.ContainerId value={container.Id} showLink={false} />
        </Link>
      </div>
      <div>
        <AppIcons.ImageIcon /> {container.Image}
      </div>
      <div>
        {container?.Status} / <ContainerStatusText status={container?.State} />
      </div>
      <div>
        <FileSizeFormatter value={container.SizeRootFs} /> / <FileSizeFormatter value={container.SizeRw} />
      </div>
      <div>
        <span title={`${container?.Mounts?.length} mounts`} aria-label={`${container?.Mounts?.length} mounts`}>
          <AppIcons.VolumeIcon /> {container?.Mounts?.length}
        </span>{' '}
        <span title={`${container?.Ports?.length} ports`} aria-label={`${container?.Ports?.length} ports`}>
          <AppIcons.NetworkIcon /> {container?.Ports?.length}
        </span>{' '}
        <span
          title={`${Object.keys(container?.NetworkSettings?.Networks).length} networks`}
          aria-label={`${Object.keys(container?.NetworkSettings?.Networks).length} networks`}
        >
          <AppIcons.NetworkIcon />
          {Object.keys(container?.NetworkSettings?.Networks).length}
        </span>{' '}
        <span
          title={`${Object.keys(container?.Labels).length} labels`}
          aria-label={`${Object.keys(container?.Labels).length} labels`}
        >
          <AppIcons.LabelsIcon /> {Object.keys(container?.Labels).length}
        </span>
      </div>
      <div>
        <ContainerIconControls
          containerId={container}
          containerStatus={container?.State}
          buttonProps={{
            style: { fontSize: '0.8rem', padding: '0.1rem' },
          }}
        />
      </div>
    </BlockItem>
  )
}

export default ContainerBlock
