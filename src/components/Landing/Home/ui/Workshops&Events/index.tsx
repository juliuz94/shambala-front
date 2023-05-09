import styles from './styles.module.css'
import EventCard from '@/components/Events/ui/EventCard'
import TitleSections from '@/components/Landing/Home/ui/TitleSections'
import { strings } from '@/constants/strings'

const WorkshopsAndEvents=() => {
  return (
    <div className={styles.container} >
      <TitleSections title={strings.ladingPage.homeSectionsTitles.workshopsAndEvents} />
      <section className={styles.card_container} >
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </section >
    </div >
  )
}

export default WorkshopsAndEvents