import { FC } from 'react'
import Header from '@/components/Header'
import { Button } from 'antd'
import CompanyBio from './UI/CompanyBio'
import Announcements from './UI/Announcements'
import EventCard from '../Events/ui/EventCard'
import styles from './styles.module.css'

const Company: FC = () => {
  return (
    <main className={styles.company_container}>
      <Header />
      <section className={styles.company_content_container}>
        <div className={styles.left_column}>
          <div className={styles.left_column_top}>
            <div className={styles.left_column_header}>
              <div className={styles.logo_container}>
                <img src='/images/argos_logo.png' />
              </div>
              <div className={styles.company_stats}>
                <div className={styles.stat}>
                  <h3>
                    225
                  </h3>
                  <p>
                    Usuario
                  </p>
                </div>
                <div className={styles.stat}>
                  <h3>
                    25
                  </h3>
                  <p>
                    Cursos
                  </p>
                </div>
                <div className={styles.stat}>
                  <h3>
                    14
                  </h3>
                  <p>
                    Eventos
                  </p>
                </div>
              </div>
            </div>
            <Button type='primary' size='large' className={styles.comment_button}>
              Añadir comentario
            </Button>
          </div>
          <CompanyBio />
          <Announcements />
        </div>

        <div className={styles.right_column}>
          <h1>
            Eventos para Argos
          </h1>
          <div className={styles.events_container}>
            <EventCard small={true} /> 
            <EventCard small={true} /> 
            <EventCard small={true} /> 
            <EventCard small={true} /> 
            <EventCard small={true} /> 
          </div>
        </div>
      </section>
    </main>
  )
}

export default Company