import { HostEnvironment } from './types.ts'

export const KONTAINER_FEATURE_TEMPLATES = !!parseInt(import.meta.env.VITE_KONTAINER_FEATURE_TEMPLATES || '0')
export const KONTAINER_FEATURE_TASKMANAGER = !!parseInt(import.meta.env.VITE_KONTAINER_FEATURE_TASKMANAGER || '0')
export const KONTAINER_FEATURE_SETTINGS = !!parseInt(import.meta.env.VITE_KONTAINER_FEATURE_SETTINGS || '0')
export const KONTAINER_FEATURE_REGISTRIES = !!parseInt(import.meta.env.VITE_KONTAINER_FEATURE_REGISTRIES || '0')
export const KONTAINER_FEATURE_KEYS = !!parseInt(import.meta.env.VITE_KONTAINER_FEATURE_KEYS || '0')

export const KONTAINER_API_LABEL = import.meta.env.VITE_KONTAINER_API_LABEL || 'Default'
export const KONTAINER_API_HOST = import.meta.env.VITE_KONTAINER_API_HOST || window.location.hostname
export const KONTAINER_API_PORT = import.meta.env.VITE_KONTAINER_API_PORT || window.location.port
export const KONTAINER_API_SSL = !!parseInt(import.meta.env.VITE_KONTAINER_API_SSL || '0')

export const STACK_TEMPLATE_URLS = [
  {
    label: 'Official templates',
    url: 'https://raw.githubusercontent.com/fm-labs/kontainer-templates/refs/heads/main/templates.json',
  },
]

export const PORTAINER_TEMPLATE_URLS = [
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

export const DEFAULT_ENVIRONMENT: HostEnvironment = {
  id: 'env0',
  label: KONTAINER_API_LABEL,
  hostname: KONTAINER_API_HOST,
  agentPort: KONTAINER_API_PORT,
  useSSL: KONTAINER_API_SSL,
}
