import React from 'react'
import EventCard from '@/components/Events/ui/EventCard'
import TitleSections from '@/components/TitleSections'
import GlobalContainer from '@/components/GlobalContainer'
import Filter from '@/components/PageFilter'
import useFetchLandingWorkshop from '@/Hooks/useFetchLandingWorkshop'
import styles from './styles.module.css'

interface WorkshopsAndEventsProps {
  title: string
}

const WorkshopsAndEvents = ({ title }: WorkshopsAndEventsProps) => {
  const { landingWorkshop } = useFetchLandingWorkshop()

  const show = true

  const filters = [
    {
      tag: 'Todos',
      category: 'todos',
    },
    {
      tag: 'Talleres',
      category: 'talleres',
    },
    {
      tag: 'Eventos',
      category: 'eventos',
    },
  ]

  return (
    <GlobalContainer>
      <main className={styles.container}>
        <TitleSections title={title} />
        <div className={styles.container_tag}>
          <Filter filters={filters} show={show} />
        </div>
        <section className={styles.card_container}>
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </section>
      </main>
    </GlobalContainer>
  )
}

export default WorkshopsAndEvents
