import React from 'react'
import api from '../../api.ts'
import Grid from '@mui/material/Grid2'
import { Avatar, Card, CardActions, CardContent, CardHeader, Chip, ChipProps, colors, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import ShareIcon from '@mui/icons-material/Share'
import GitHubIcon from '@mui/icons-material/GitHub'
import SourceIcon from '@mui/icons-material/Source'
import BugReportIcon from '@mui/icons-material/BugReport'

interface PortainerTemplatesViewProps {
  templateUrl: string
}

const PortainerTemplateInfoDialog = ({ template }: any) => {
  return (
    <div>
      <h2>{template?.title}</h2>
      <div className={''}>
        {Object.entries(template).map(([key, value]: [string, any]) => {
          let val
          if (['categories', 'ports'].indexOf(key) > -1) {
            val = value.join(', ')
            if (['volumes'].indexOf(key) > -1) {
              value.map((v: any) => {
                val += `\n${v}`
              })
            }
          } else if (typeof value === 'object') {
            val = JSON.stringify(value)
          } else {
            val = value
          }

          return (
            <div key={key}>
              <span style={{ fontWeight: 'bold' }}>{key}</span>: {val}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const PortainerTemplateTypeChip = ({ type }: { type: number }) => {
  const chipProps: ChipProps = {
    size: 'small',
    color: 'info',
    variant: 'outlined',
  }
  switch (type) {
    case 1:
      return <Chip {...chipProps} label={'docker'}></Chip>
    case 2:
      return <Chip {...chipProps} label={'compose'}></Chip>
    case 3:
      return <Chip {...chipProps} label={'compose'}></Chip>
    default:
      return <Chip {...chipProps} color={'error'} label={'unknown'}></Chip>
  }
}

const PortainerTemplatesView = ({ templateUrl }: PortainerTemplatesViewProps) => {
  const [templates, setTemplates] = React.useState<any>({})

  const fetchTemplates = React.useCallback(async () => {
    setTemplates({})
    const response = await fetch(templateUrl)
    const data = await response.json()
    console.log('templates data', data)
    setTemplates(data)
  }, [templateUrl])

  const handleLaunchTemplate = (template: any) => {
    console.log('launch template', template)
    api.launchPortainerTemplate(template)
  }

  React.useEffect(() => {
    fetchTemplates()
  }, [templateUrl])

  if (!templates) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <p>
        URL: {templateUrl}
        <br />
        Version: {templates?.version}
        <br />
        Found templates: {templates?.templates?.length}
      </p>
      <Grid container spacing={2}>
        {templates?.templates?.map((template: any, idx: number) => (
          <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }} key={`${template?.title}-${idx}`}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar
                    variant={'rounded'}
                    src={template?.logo}
                    /*sx={{ bgcolor: colors.red[500] }}*/ aria-label={template?.title}
                  >
                    {template?.title[0]}
                  </Avatar>
                }
                action={
                  <IconButton aria-label='settings'>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={template?.title}
                subheader={template?.image}
              />
              <CardContent>
                <Typography variant='body2' component={'div'} sx={{ color: 'text.secondary', pb: 1 }}>
                  <PortainerTemplateTypeChip type={template?.type} /> | Type: {template?.type} |{' '}
                  {template?.categories?.join(', ')}
                </Typography>
                <Typography variant='body2' sx={{ color: 'text.primary', maxHeight: '40px', overflowY: 'scroll' }}>
                  {template?.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label='Add to favorites'>
                  <FavoriteOutlinedIcon />
                </IconButton>
                {/*<IconButton aria-label='Share'>
                  <ShareIcon />
                </IconButton>*/}
                {template?.repository && template.repository?.url && (
                  <IconButton
                    aria-label='Share'
                    href={template.repository.url}
                    target='_blank'
                    title={'Repository: ' + template?.repository?.url}
                  >
                    <GitHubIcon />
                  </IconButton>
                )}
                {template?.repository && template.repository?.stackfile && (
                  <IconButton
                    aria-label='Source'
                    href={
                      // template.repository.url /*.replace('github.com', 'raw.githubusercontent.com')*/ +
                      // '/blob/master/' +
                      // template.repository.stackfile
                      template.repository.url.replace('github.com', 'raw.githubusercontent.com') +
                      '/refs/heads/master/' +
                      template.repository.stackfile
                    }
                    target='_blank'
                    title={'Stackfile: ' + template?.repository?.stackfile}
                  >
                    <SourceIcon />
                  </IconButton>
                )}
                <IconButton aria-label='JSON' onClick={() => console.log('Template', template)}>
                  <BugReportIcon />
                </IconButton>
              </CardActions>
              {/*<p>
              <Button variant={'contained'} onClick={() => handleLaunchTemplate(template)}>
                Launch {template.title}
              </Button>
            </p>*/}
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default PortainerTemplatesView
