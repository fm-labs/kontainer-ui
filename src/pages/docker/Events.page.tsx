import React from 'react'
import Container from '@mui/material/Container'
import { Helmet } from 'react-helmet-async'
import Toolbar from '@mui/material/Toolbar'
import Heading from '../../elements/Heading.tsx'
import EventsTableMaterial from '../../components/docker/Engine/EventsTableMaterial.tsx'
import api from '../../api.ts'
import { toast } from 'react-toastify'
import { useLoaderData } from 'react-router-dom'

const EventsPage = () => {
  const data = useLoaderData() as any
  const [events, setEvents] = React.useState<any[]>(data || [])
  const [lastEventTime, setLastEventTime] = React.useState<number>()

  const fetchEvents = React.useCallback(async () => {
    console.log('fetching events')
    return await api
      .getEngineEvents()({ since: lastEventTime })
      .then((_newEvents) => {
        if (_newEvents.length === 0) return
        // sort new Events by 'time' field
        _newEvents = _newEvents.sort((a, b) => {
          return b.time - a.time
        })
        setEvents([..._newEvents, ...events])
      })
      .catch((error) => {
        console.error('error fetching events', error)
        toast.error('Error fetching events')
      })
      .finally(() => {
        setLastEventTime(Math.floor(Date.now() / 1000))
      })
  }, [lastEventTime])

  // React.useEffect(() => {
  //   fetchEvents().finally(() => {
  //     setTimeout(() => {
  //       fetchEvents()
  //     })
  //   })
  // }, [])

  React.useEffect(() => {
    //fetchEvents()
    const timer = setInterval(() => {
      fetchEvents()
    }, 6000)
    console.log('EventsPage mounted')

    return () => {
      console.log('EventsPage unmounted')
      clearInterval(timer)
    }
  }, [fetchEvents])

  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Events</title>
      </Helmet>
      <Toolbar disableGutters>
        <Heading label={'Events'}></Heading>
      </Toolbar>
      <EventsTableMaterial data={events} />
    </Container>
  )
}

export default EventsPage
