import React from 'react'
import EventCard from '@/components/Landing/Home/ui/Workshops&Events/EventWorkshop'
import TitleSections from '@/components/TitleSections'
import GlobalContainer from '@/components/GlobalContainer'
import Filter from '@/components/Landing/Home/ui/Workshops&Events/FilterWorkshop'
import useFetchLandingWorkshop from '@/Hooks/useFetchLandingWorkshop'
import styles from './styles.module.css'

interface WorkshopsAndEventsProps {
  title: string
}

const WorkshopsAndEvents = ({ title }: WorkshopsAndEventsProps) => {
  const { landingWorkshop, setCategory } = useFetchLandingWorkshop()

  return (
    <GlobalContainer>
      <main className={styles.container}>
        <TitleSections title={title} />
        <div className={styles.container_tag}>
          <Filter setCategory={setCategory} />
        </div>
        <section className={styles.card_container}>
          {landingWorkshop.map((workshop: any) => (
            <EventCard key={workshop._id} event={workshop} />
          ))}
          {landingWorkshop.length === 0 && <p>No hay ningún elemento</p>}
        </section>
      </main>
    </GlobalContainer>
  )
}

export default WorkshopsAndEvents
