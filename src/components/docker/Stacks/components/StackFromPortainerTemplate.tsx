import React from 'react'
import PortainerTemplatesView from '~/components/templates/PortainerTemplatesView.tsx'
import { PORTAINER_TEMPLATE_URLS } from '../../../../constants.ts'

const StackFromPortainerTemplate = () => {
  const templateUrl = PORTAINER_TEMPLATE_URLS[0].url

  return (
    <div>
      <h1>From Portainer Template</h1>
      <PortainerTemplatesView templateUrl={templateUrl} />
    </div>
  )
}

export default StackFromPortainerTemplate
