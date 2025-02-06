import React from 'react'
import PortainerTemplatesView from '../../components/portainer/PortainerTemplatesView.tsx'
import Container from '@mui/material/Container'

const templateUrls = [
  {
    label: 'Official Portainer Templates (v3)',
    url: 'https://raw.githubusercontent.com/portainer/templates/refs/heads/v3/templates.json',
  },
  {
    label: 'Official Portainer Templates (v2)',
    url: 'https://raw.githubusercontent.com/portainer/templates/refs/heads/master/templates-2.0.json',
  },
  {
    label: 'Portainer Templates by Lissy93 (v2)',
    url: 'https://raw.githubusercontent.com/Lissy93/portainer-templates/refs/heads/main/templates.json',
  },
]

const PortainerTemplatesPage = () => {
  const [templateUrl, setTemplateUrl] = React.useState(templateUrls[0].url)

  return (
    <Container maxWidth={false}>
      <h1>Portainer Templates</h1>

      <div>
        <select onChange={(e) => setTemplateUrl(e.target.value)}>
          {templateUrls.map((templateUrl) => (
            <option key={templateUrl.url} value={templateUrl.url}>
              {templateUrl.label}
            </option>
          ))}
        </select>
      </div>

      <PortainerTemplatesView templateUrl={templateUrl} />
    </Container>
  )
}

export default PortainerTemplatesPage
