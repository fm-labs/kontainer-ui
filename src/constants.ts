import { HostEnvironment } from './types.ts'

export const MASTER_AGENT_API_BASEURL = import.meta.env.VITE_AGENT_API_BASEURL || 'http://localhost:5000/api'

export const CURRENT_HOSTNAME = window.location.hostname
export const CURRENT_PORT = window.location.port
export const CURRENT_SCHEME = window.location.protocol

export const MASTER_AGENT_LABEL = import.meta.env.VITE_MASTER_AGENT_LABEL || 'Default'
export const MASTER_AGENT_HOST = import.meta.env.VITE_MASTER_AGENT_HOST || CURRENT_HOSTNAME
export const MASTER_AGENT_PORT = import.meta.env.VITE_MASTER_AGENT_PORT || CURRENT_PORT
export const MASTER_AGENT_SSL = !!import.meta.env.VITE_MASTER_AGENT_SSL || CURRENT_SCHEME === 'https:'

export const STACK_TEMPLATE_URLS = [
  {
    label: 'Official templates',
    url: 'https://raw.githubusercontent.com/fm-labs/kstack-templates/refs/heads/main/templates.json',
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
  id: '0',
  label: MASTER_AGENT_LABEL,
  hostname: MASTER_AGENT_HOST,
  agentPort: MASTER_AGENT_PORT,
  useSSL: MASTER_AGENT_SSL,
}
