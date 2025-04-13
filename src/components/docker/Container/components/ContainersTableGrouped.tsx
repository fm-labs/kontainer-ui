import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'
import Table from '@mui/material/Table'
import { TableCell, TableRow } from '@mui/material'
import { IDockerResourceAttrs } from '~/types.ts'
import ContainerPorts from './ContainerPorts.tsx'
import ContainerState from './ContainerState.tsx'
import ContainerIconControls from './ContainerIconControls.tsx'
import ContainerId from './ContainerId.tsx'
import StackIconControls from '../../Stacks/components/StackIconControls.tsx'
import { useDockerContext } from '~/helper/useDockerContext.tsx'

const ContainersTableGrouped = ({ data }: { data: IDockerResourceAttrs[] }) => {
  const { buildUrl } = useDockerContext()

  const groupedData = React.useMemo(() => {
    if (!data) {
      return {}
    }
    const grouped = {}
    data.forEach((row: any) => {
      const labels = row?.Config?.Labels
      const composeProject = labels?.['com.docker.compose.project'] || '_'
      if (!composeProject) {
        return
      }
      if (!grouped[composeProject]) {
        grouped[composeProject] = []
      }
      grouped[composeProject].push(row)
    })

    // Sort grouped by key
    const sorted: object = Object.keys(grouped)
      .sort()
      .reduce((obj, key) => {
        obj[key] = grouped[key]
        return obj
      }, {})
    return sorted
  }, [data])

  return (
    <Table size={'small'}>
      <tbody>
        {Object.entries(groupedData).map(([key, rows]: any) => {
          const composeProject = key
          const running = rows.filter((row: any) => row?.State?.Status === 'running').length

          return (
            <React.Fragment key={composeProject}>
              {composeProject !== '_' && (
                <TableRow key={composeProject}>
                  <TableCell>
                    <Link style={{ textDecoration: 'dashed underline' }} to={`../stacks/${composeProject}`}>
                      {composeProject}
                    </Link>
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>{`${running}/${rows.length} running`}</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell style={{ textAlign: 'right' }}>
                    <StackIconControls stackId={composeProject} />
                  </TableCell>
                </TableRow>
              )}
              {rows.map((row: any) => {
                const name = row?.Name.substring(1).replace(`${composeProject}-`, '')
                const labels = row?.Config?.Labels
                const hasProtectedLabel = labels?.['kstack.protected'] === 'true'
                const url = buildUrl(`/containers/${row?.Id}`)

                return (
                  <tr key={row.Id}>
                    <TableCell>
                      <div
                        style={{
                          display: 'inline-block',
                          paddingLeft: composeProject !== '_' ? '1em' : 0,
                        }}
                      >
                        {/*<Link to={`/container/${row?.Id}`}>{name}</Link>*/}
                        <Link to={url}>{name}</Link>
                        {hasProtectedLabel && <span style={{ color: 'red' }}> PROTECTED</span>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <ContainerId value={row.Id} />
                    </TableCell>
                    <TableCell>{row?.Config?.Image}</TableCell>
                    {/*<TableCell><ContainerPorts ports={row?.NetworkSettings?.Ports} /></TableCell>*/}
                    <TableCell>
                      <ContainerPorts ports={row?.HostConfig?.PortBindings} />
                    </TableCell>
                    <TableCell>
                      <ContainerState state={row?.State} />
                    </TableCell>
                    <TableCell>{row?.State?.StartedAt && moment(row?.State?.StartedAt).fromNow()}</TableCell>
                    <TableCell style={{ textAlign: 'right' }}>
                      <ContainerIconControls containerId={row.Id} containerStatus={row?.State?.Status} />
                    </TableCell>
                  </tr>
                )
              })}
            </React.Fragment>
          )
        })}
      </tbody>
    </Table>
  )
}

export default ContainersTableGrouped
