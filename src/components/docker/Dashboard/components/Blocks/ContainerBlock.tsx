import React from 'react'
import AppIcons from '../../../../../elements/AppIcons.tsx'
import ContainerFormatters from '~/components/docker/Container/components/ContainerFormatters.tsx'
import { Link } from 'react-router-dom'
import ContainerStatusText from '~/components/docker/Container/components/ContainerStatusText.tsx'
import { FileSizeFormatter } from '~/elements/Formatters.tsx'
import ContainerIconControls from '~/components/docker/Container/components/ContainerIconControls.tsx'
import GridResourceBlock from './GridResourceBlock.tsx'
import { useDockerContext } from '~/helper/useDockerContext.tsx'

const ContainerBlock = ({ container }) => {
  const { df, buildUrl } = useDockerContext()

  let color = 'default'
  if (container.State === 'running') {
    color = 'success'
  } else if (container.State === 'exited') {
    color = 'error'
  }

  const containerName = (container.Names && container.Names[0]) || container.Id
  //const containerNameShort = (container.Names && container.Names[0]) || container.Id.substring(0, 12)

  return (
    <GridResourceBlock key={container.Id} color={color}>
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <AppIcons.ContainerIcon />{' '}
            <Link to={buildUrl(`/docker/containers/${container.Id}`)}>
              <ContainerFormatters.ContainerName value={containerName} />
            </Link>
          </div>
          <div>
            <ContainerIconControls
              containerId={container.Id}
              containerStatus={container?.State}
              buttonProps={{
                style: { fontSize: '0.8rem', padding: '0.1rem' },
              }}
            />
          </div>
        </div>
      </div>
      {/*<div>
        <Link to={buildUrl(`/docker/containers/${container.Id}`)}>
          <ContainerFormatters.ContainerId value={container.Id} />
        </Link>
      </div>*/}
      <div>
        <AppIcons.ImageIcon />{' '}
        <Link to={buildUrl(`/docker/images/${container.ImageID.substring(7)}`)}>
          <ContainerFormatters.ContainerImage value={container.Image} />
        </Link>
      </div>
      <div>
        <ContainerStatusText status={container?.State} /> / {container?.Status}
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
    </GridResourceBlock>
  )
}

export default ContainerBlock
