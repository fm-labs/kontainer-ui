import React from 'react'
import PortainerTemplatesView from '../../components/portainer/PortainerTemplatesView.tsx'
import Container from '@mui/material/Container'
import { PORTAINER_TEMPLATE_URLS } from '../../constants.ts'

const PortainerTemplatesPage = () => {
  const templateUrls = PORTAINER_TEMPLATE_URLS
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
