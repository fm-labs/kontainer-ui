const hosts = [
  {
    hostname: 'localmachine',
    ip: '127.0.0.1',
  },
  {
    hostname: 'remotemachine',
    ip: '172.16.0.33',
  },
]

export const getHosts = () => {
  return hosts
}
