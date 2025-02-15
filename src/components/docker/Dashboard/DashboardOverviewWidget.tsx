import React from 'react'
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import { FileSizeFormatter } from '../../../elements/Formatters.tsx'
import AppIcons from '../../../elements/AppIcons.tsx'
import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import { Link } from 'react-router-dom'
import ContainerFormatters from '../Containers/ContainerFormatters.tsx'
import { useHostApi } from '../../../helper/useHostApi.ts'

const DashboardOverviewWidget = () => {
  const [data, setData] = React.useState<any>(null)
  const [onlyActive, setOnlyActive] = React.useState(true)
  const api = useHostApi()

  const fetchData = React.useCallback(() => {
    console.log('Fetching data...')
    api
      .getEngineDf()()
      .then((data) => {
        console.log('Engine df data loaded', data)
        setData(data)
      })
  }, [data])

  const containersData = React.useMemo(() => {
    if (!data) return []
    return data.Containers.sort((a, b) => a?.Names[0].localeCompare(b?.Names[0]))
  }, [data, onlyActive])

  const imagesData = React.useMemo(() => {
    if (!data) return []

    let _data
    _data = data.Images.sort((a, b) => a?.RepoTags[0].localeCompare(b?.RepoTags[0]))

    if (onlyActive) {
      _data = _data.filter((image) => image.Containers > 0)
    } else {
      // sort by usage
      _data = _data.sort((a, b) => b.Containers - a.Containers)
    }

    return _data
  }, [data, onlyActive])

  const volumesData = React.useMemo(() => {
    if (!data) return []
    let _data
    _data = data.Volumes.sort((a, b) => a?.Name.localeCompare(b?.Name))

    if (onlyActive) {
      _data = _data.filter((volume) => volume.UsageData.RefCount > 0)
    } else {
      // sorty by usage
      _data = _data.sort((a, b) => b.UsageData.RefCount - a.UsageData.RefCount)
    }

    return _data
  }, [data, onlyActive])

  React.useEffect(() => {
    fetchData()
    const timer = setInterval(() => {
      fetchData()
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const columns = 4
  // const containerStyle: any = { columns: columns }
  // const containerStyle2: any = {}
  // const itemStyle: any = { border: '1px solid #ccc', marginBottom: '0.2rem', breakInside: 'avoid', fontSize: '0.8rem' }
  // const itemStyle2: any = { border: '1px solid #ccc', fontSize: '0.8rem' }

  const ItemContainer = ({ children }) => (
    <Grid container spacing={0.5}>
      {children}
    </Grid>
  )
  //const ItemContainer = ({ children }) => <div style={containerStyle}>{children}</div>
  //const ItemContainer = ({ children }) => <>{children}</>
  // const Item = ({ children, ...props }) => (
  //   <div style={itemStyle} {...props}>
  //     {children}
  //   </div>
  // )
  const Item = ({ children, color, ...props }) => {
    color = color || 'default'
    return (
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} {...props}>
        <Box
          color={color}
          sx={{
            border: '1px solid #ccc',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: `${color}.main`,
            fontSize: '0.8rem',
            p: 0.5,
          }}
        >
          {children}
        </Box>
      </Grid>
    )
  }

  const renderContainer = (container: any) => {
    let color = 'default'
    if (container.State === 'running') {
      color = 'success'
    } else if (container.State === 'exited') {
      color = 'error'
    }

    return (
      <Item key={container.Id} color={color}>
        <div
          style={{
            fontWeight: 'bold',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
          title={container.Names[0] || container.Id}
        >
          <AppIcons.ContainerIcon />{' '}
          {/*<Link to={`/container/${container.Id}`}>{container.Names[0] || container.Id.substring(0, 32)}</Link>*/}
          <ContainerFormatters.ContainerName value={container.Names[0] || container.Id} />
        </div>
        <div>
          <Link to={`containers/${container.Id}`}>
            <ContainerFormatters.ContainerId value={container.Id} showLink={false} />
          </Link>
        </div>
        <div>
          <AppIcons.ImageIcon /> {container.Image.substring(0, 32)}
        </div>
        <div>
          {container?.Status} / {container?.State}
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
      </Item>
    )
  }

  const renderImage = (image: any) => {
    let color = 'default'
    if (image.Containers > 0) {
      color = 'success'
    } else {
      //color = 'warning'
    }

    return (
      <Item key={image.Id} color={color}>
        <div style={{ fontWeight: 'bold' }}>
          <AppIcons.ImageIcon /> {image.RepoTags[0]}
        </div>
        <div>
          <Link to={`images/${image.Id}`}>{image.Id.substring(0, 32)}</Link>
        </div>
        <div>
          <FileSizeFormatter value={image.Size} /> / <FileSizeFormatter value={image.SharedSize} />
        </div>
        <div title={`${image.Containers} container using this image`}>
          <AppIcons.ContainerIcon /> {image.Containers}
        </div>
      </Item>
    )
  }

  const renderVolume = (volume: any) => {
    let color = 'default'
    if (volume.UsageData.RefCount > 0) {
      color = 'success'
    } else {
      //color = 'warning'
    }

    return (
      <Item key={volume.Name} color={color}>
        <div style={{ fontWeight: 'bold' }}>
          <AppIcons.VolumeIcon /> {volume.Name.substring(0, 32)}
        </div>
        <div>{volume.Id}</div>
        <div>
          Size: <FileSizeFormatter value={volume?.UsageData?.Size} />
        </div>
        <div>Usage: {volume?.UsageData?.RefCount}</div>
      </Item>
    )
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked value={onlyActive} onChange={(e) => setOnlyActive(e.target.checked)} />}
            label='Show only active resources'
          />
        </FormGroup>
      </div>
      <h5>
        <AppIcons.ContainerIcon /> Containers ({containersData.length}/{data?.Containers?.length})
      </h5>
      <ItemContainer>{containersData.map(renderContainer)}</ItemContainer>
      <h5>
        <AppIcons.ImageIcon /> Images ({imagesData.length}/{data?.Images?.length})
      </h5>
      <ItemContainer>{imagesData.map(renderImage)}</ItemContainer>
      <h5>
        <AppIcons.VolumeIcon /> Volumes ({volumesData.length}/{data?.Volumes?.length})
      </h5>
      <ItemContainer>{volumesData.map(renderVolume)}</ItemContainer>
    </div>
  )
}

export default DashboardOverviewWidget
