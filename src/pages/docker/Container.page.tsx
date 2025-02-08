import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Container from '@mui/material/Container'
import Button, { ButtonProps } from '@mui/material/Button'
import { FaPlay, FaStop, FaTrash } from 'react-icons/fa'
import api from '../../api.ts'
import ReactJson from 'react-json-view'
import RoutedTabs, { RoutedTabItem } from '../../elements/RoutedTabs.tsx'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../elements/Heading.tsx'
import ContainerCreateButton from '../../components/docker/Containers/ContainerCreate.button.tsx'
import ContainerState from '../../components/docker/Containers/ContainerState.tsx'
import { HiOutlinePlay, HiPause, HiStop, HiTrash } from 'react-icons/hi2'
import moment from 'moment'
import { ContainerPorts } from '../../components/docker/Containers/ContainerPorts.tsx'
import ContainerMountPoints from '../../components/docker/Containers/ContainerMountPoints.tsx'
import ContainerLabels from '../../components/docker/Containers/ContainerLabels.tsx'
import ContainerEnvVariables from '../../components/docker/Containers/ContainerEnvVariables.tsx'
import ContainerNetworksView from '../../components/docker/Containers/ContainerNetworksView.tsx'
import ContainerMounts from '../../components/docker/Containers/ContainerMounts.tsx'
import ContainerPaths from '../../components/docker/Containers/ContainerPaths.tsx'
import ContainerLabelsTable from '../../components/docker/Containers/ContainerLabelsTable.tsx'
import ContainerEnvVariablesTable from '../../components/docker/Containers/ContainerEnvVariablesTable.tsx'
import ContainerPathsTable from '../../components/docker/Containers/ContainerPathsTable.tsx'

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

  React.useEffect(() => {
    console.log('ContainerPage mounted')
    const timer = setInterval(() => {
      console.log('Refreshing containers')
      api
        .getContainer()(data.Id)
        .then((data) => {
          console.log('Container refreshed', data)
          setData(data)
        })
    }, 5000)
    return () => {
      console.log('ContainerPage unmounted')
      clearInterval(timer)
    }
  }, [])

  const tabs: RoutedTabItem[] = [
    // {
    //   label: 'Info',
    //   name: 'info',
    //   children: <ReactJson src={data} displayDataTypes={false} displayObjectSize={false} enableClipboard={true} />,
    // },
    {
      label: 'Inspect',
      name: 'inspect',
      children: <ReactJson src={data} displayDataTypes={false} displayObjectSize={false} enableClipboard={true} />,
    },
    {
      label: 'Labels',
      name: 'labels',
      children: <ContainerLabelsTable labels={data?.Config?.Labels} />,
    },
    {
      label: 'Environment',
      name: 'env',
      children: <ContainerEnvVariablesTable env={data?.Config?.Env} />,
    },
    {
      label: 'Networks',
      name: 'networks',
      children: <ContainerNetworksView networks={data?.NetworkSettings?.Networks} />,
    },
    {
      label: 'Mounts',
      name: 'mounts',
      children: <ContainerMounts mounts={data?.Mounts} />,
    },
    {
      label: 'Paths',
      name: 'paths',
      children: <ContainerPathsTable container={data} />,
    },
    // {
    //   label: 'Logs',
    //   name: 'logs',
    //   children: (
    //     <>
    //       <h1>Logs</h1>
    //       <p>Not available yet</p>
    //     </>
    //   ),
    // },
    // {
    //   label: 'Exec',
    //   name: 'exec',
    //   children: (
    //     <>
    //       <h1>Exec</h1>
    //       <p>Not available yet</p>
    //     </>
    //   ),
    // },
    // {
    //   label: 'Stats',
    //   name: 'stats',
    //   children: (
    //     <>
    //       <h1>Stats</h1>
    //       <p>Not available yet</p>
    //     </>
    //   ),
    // },
  ]

  const buttonProps: ButtonProps = {
    size: 'small',
    variant: 'outlined',
  }

  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Container {data?.Id?.substring(0, 12)}</title>
      </Helmet>
      <Toolbar disableGutters>
        <Heading label={`Container ${data?.Id?.substring(0, 12)}`}>
          <div>
            <ContainerState state={data?.State} />{' '}
            {data?.State?.Status !== 'running' && (
              <Button {...buttonProps} onClick={handleContainerStartClick(data.Id)} startIcon={<HiOutlinePlay />}>
                Start
              </Button>
            )}
            {data?.State?.Status === 'running' && (
              <Button {...buttonProps} onClick={handleContainerStartClick(data.Id)} startIcon={<HiPause />}>
                Pause
              </Button>
            )}
            {data?.State?.Status === 'running' && (
              <Button {...buttonProps} onClick={handleContainerStopClick(data.Id)} startIcon={<HiStop />}>
                Stop
              </Button>
            )}
            <Button {...buttonProps} color={'error'} startIcon={<HiTrash />}>
              Remove
            </Button>
          </div>
        </Heading>
      </Toolbar>

      <div className={'flex-grid'}>
        {/*Platform*/}
        <div>
          <div className={'info-label'}>Platform</div>
          <div>{data?.Platform}</div>
        </div>
        {/*Runtime*/}
        <div>
          <div className={'info-label'}>Runtime</div>
          <div>{data?.HostConfig?.Runtime}</div>
        </div>
        {/*Image*/}
        <div>
          <div className={'info-label'}>Image</div>
          <div>
            {data?.Config?.Image}
            <br />
            {data?.Image.substring(0, 23)}
          </div>
        </div>
        <div>
          <div className={'info-label'}>Created</div>
          <div>{data?.Created ? moment(data?.Created).fromNow() : '-'}</div>
        </div>
        {/*State*/}
        <div>
          <div className={'info-label'}>State</div>
          <div>
            <ContainerState state={data?.State} />
            <p>Last Exit code: {data?.State?.ExitCode}</p>
          </div>
        </div>
        {/*Command*/}
        <div>
          <div className={'info-label'}>Command</div>
          <div>{data?.Config?.Cmd}</div>
        </div>
        <div>
          <div className={'info-label'}>Entrypoint</div>
          <div>{data?.Config?.Entrypoint || '-'}</div>
        </div>
        {/*Ports*/}
        <div>
          <div className={'info-label'}>Ports</div>
          <div>
            <ContainerPorts ports={data?.NetworkSettings?.Ports} />
          </div>
        </div>
        {/*Mounts*/}
        <div>
          <div className={'info-label'}>Mount points</div>
          <div>
            <ContainerMountPoints mounts={data?.Mounts} />
          </div>
        </div>
        {/*Labels*/}
        {/*<div>
          <div className={'info-label'}>Labels</div>
          <div>
            <ContainerLabels labels={data?.Config?.Labels} />
          </div>
        </div>*/}
        {/*Environment*/}
        {/*<div>
          <div className={'info-label'}>Environment</div>
          <div>
            <ContainerEnvVariables env={data?.Config?.Env} />
          </div>
        </div>*/}
        {/*Networks*/}
        <div>
          <div className={'info-label'}>Networks</div>
          <div>
            {Object.keys(data?.NetworkSettings?.Networks || {}).map((network) => {
              return (
                <div key={network}>
                  {network} {data?.NetworkSettings?.Networks[network].IPAddress}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <RoutedTabs items={tabs}></RoutedTabs>
    </Container>
  )
}

export default ContainerPage
