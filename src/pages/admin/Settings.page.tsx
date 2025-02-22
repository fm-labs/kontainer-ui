import React from 'react'
import Container from '@mui/material/Container'
import BasicTabs, { BasicTabItem } from '../../elements/BasicTabs.tsx'
import JsonSchemaForm from '../../elements/JsonSchemaForm/JsonSchemaForm.tsx'
import ContainerRegistriesManagerWidget from '../../components/admin/ContainerRegistriesManagerWidget.tsx'
import PrivateKeysManagerWidget from '../../components/admin/PrivateKeysManagerWidget.tsx'

const SettingsPage = () => {
  const settingsSchemaUrl = '/schema/settings.schema.json'

  const tabs: BasicTabItem[] = [
    {
      label: 'General Settings',
      name: 'general-settings',
      children: (
        <>
          <h4>General Settings</h4>
          <JsonSchemaForm schemaUrl={settingsSchemaUrl} />
        </>
      ),
    },
    {
      label: 'Container Registries',
      name: 'registries',
      children: (
        <>
          <ContainerRegistriesManagerWidget />
        </>
      ),
    },
    {
      label: 'Private Keys',
      name: 'private-keys',
      children: (
        <>
          <PrivateKeysManagerWidget />
        </>
      ),
    },
  ]

  return (
    <Container maxWidth={false}>
      <h1>Settings</h1>
      <BasicTabs items={tabs} />
    </Container>
  )
}

export default SettingsPage
