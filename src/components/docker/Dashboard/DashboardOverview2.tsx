import React from 'react'
import Grid from '@mui/material/Grid2'
import AppIcons from '../../../elements/AppIcons.tsx'
import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import ContainerBlock from './components/Blocks/ContainerBlock.tsx'
import ImageBlock from './components/Blocks/ImageBlock.tsx'
import VolumeBlock from './components/Blocks/VolumeBlock.tsx'
import { useEnvironment } from '~/helper/useEnvironmentContext.tsx'

const DashboardOverview2 = () => {
  const { df } = useEnvironment()
  const [onlyActive, setOnlyActive] = React.useState(true)

  const containersData = React.useMemo(() => {
    if (!df) return []
    return df?.Containers?.sort((a, b) => a?.Names[0].localeCompare(b?.Names[0]))
  }, [df, onlyActive])

  const imagesData = React.useMemo(() => {
    if (!df) return []

    let _data = df?.Images || []
    //_data = data.Images.sort((a, b) => a?.RepoTags[0].localeCompare(b?.RepoTags[0]))
    _data = _data || []
    if (onlyActive) {
      _data = _data.filter((image) => image.Containers > 0)
    } else {
      // sort by usage
      _data = _data.sort((a, b) => b.Containers - a.Containers)
    }

    return _data
  }, [df, onlyActive])

  const volumesData = React.useMemo(() => {
    if (!df) return []
    let _data
    _data = df?.Volumes?.sort((a, b) => a?.Name.localeCompare(b?.Name))
    _data = _data || []
    if (onlyActive) {
      _data = _data.filter((volume) => volume.UsageData.RefCount > 0)
    } else {
      // sorty by usage
      _data = _data.sort((a, b) => b.UsageData.RefCount - a.UsageData.RefCount)
    }

    return _data
  }, [df, onlyActive])

  // React.useEffect(() => {
  //   fetchData()
  //   const timer = setInterval(() => {
  //     fetchData()
  //   }, 5000)
  //
  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])

  // const columns = 4
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

  if (!df) {
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
        <AppIcons.ContainerIcon /> Containers ({containersData?.length}/{df?.Containers?.length})
      </h5>
      <ItemContainer>
        {containersData?.map((c, idx) => <ContainerBlock key={`Container-${idx}`} container={c} />)}
      </ItemContainer>
      <h5>
        <AppIcons.ImageIcon /> Images ({imagesData.length}/{df?.Images?.length})
      </h5>
      <ItemContainer>
        {imagesData.map((i, idx) => (
          <ImageBlock key={`Image-${idx}`} image={i} />
        ))}
      </ItemContainer>
      <h5>
        <AppIcons.VolumeIcon /> Volumes ({volumesData.length}/{df?.Volumes?.length})
      </h5>
      <ItemContainer>
        {volumesData.map((v, idx) => (
          <VolumeBlock key={`Volume-${idx}`} volume={v} />
        ))}
      </ItemContainer>
    </div>
  )
}

export default DashboardOverview2
