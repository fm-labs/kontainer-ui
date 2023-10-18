
interface IDockerContainer {
  id: string
  name?: string
  status?: string
}

interface IDockerImage {
  id: string
  tags?: string
  labels?: string[]
}

interface IDockerVolume {
  id: string
  name?: string
  status?: string
}

interface IDockerNetwork {
  id: string
  name?: string
  status?: string
}
