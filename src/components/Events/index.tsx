import { useState } from 'react'
import Header from '@/components/Header'
import Filter from '@/components/PageFilter'
import SearchInput from '@/components/SearchInput'
import EventCard from './ui/EventCard'
import styles from './styles.module.css'

const Events = () => {
  const [activeMonth, setActiveMonth] = useState('1')

  const months = [
    {
      key: '1',
      label: `Abril`
    },
    {
      key: '2',
      label: `Mayo`
    },
    {
      key: '3',
      label: `Junio`
    },
  ]

  return (
    <div>
      <Header />
      <div className={styles.content_container}>
        <div className={styles.events_options}>
          <SearchInput />
          <Filter />
        </div>

        <div className={styles.tabs}>
          {months.map(month => {
            return (
              <div key={month.key} className={`${styles.tab} ${month.key === activeMonth ? styles.active : null}`}>
                <p>{month.label}</p>
              </div>
            )
          })}
        </div>

        <div className={styles.events_container}>
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </div>
    </div>
  )
}

export default Events