import styles from './styles.module.css'
import EventCard from '@/components/Events/ui/EventCard'
import TitleSections from '../../../../TitleSections'
import GlobalContainer from '../../../../GlobalContainer'
import React from 'react'


interface WorkshopsAndEventsProps {
  title: string
  style?: React.CSSProperties
}

const WorkshopsAndEvents=({title, style}: WorkshopsAndEventsProps) => {
  return (
    <GlobalContainer >
      <main className={styles.container} >
        <TitleSections title={title} />
        <article className={`${styles.container_tag} ${style}`} >
          <div className={styles.tags} >
            <p >Todos</p >
          </div >
          <div className={styles.tags} >
            <p >Talleres</p >
          </div >
          <div className={styles.tags} >
            <p >Eventos</p >
          </div >
          <div className={styles.tags} >
            <p >Conferencia</p >
          </div >
        </article >
        <section className={styles.card_container} >
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </section >
      </main >
    </GlobalContainer >

  )
}

export default WorkshopsAndEvents