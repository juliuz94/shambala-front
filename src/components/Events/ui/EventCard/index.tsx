import { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Avatar, Button } from 'antd'
import { HiCalendarDays, HiOutlineClock, HiOutlineHeart, HiOutlineMapPin } from 'react-icons/hi2'
import styles from './styles.module.css'

interface PropTypes {
  small?: boolean
}

const EventCard = ({ small }: PropTypes) => {
  const router=useRouter()

  return (
    <div className={`${styles.event_card} ${small ? styles.small : null}`} onClick={() => router.push('/event/123')}>

      <div className={styles.card_content_mobile} >

        <div className={styles.line} />

        <div className={styles.header_card} >
          <div className={styles.date_container} >
            <p className={styles.week_day} >
              Mar
            </p >
            <h2 className={styles.calendar_day} >
              04
            </h2 >
          </div >
          <div className={styles.title_header} >
            <h2 className={styles.event_title} >
              FIMA Feria Internacional del Medio Ambiente
            </h2 >
          </div >
        </div >

        <div className={styles.speakers} >
          <Avatar
            size='small'
            src='/images/person_image.jpg'
          />
          <p >
            Kai Olivares
          </p >
        </div >

        <div className={styles.image_container} style={{backgroundImage: `url('/images/event_image.jpg')`}} />

        <div className={styles.event_info} >
          <div className={styles.event_time} >
            <HiOutlineClock />
            <p >
              mar, 16 de marzo, 5:00 pm. - vie, 19 de marzo, 5:00 pm.
            </p >
          </div >
          <div className={styles.event_time} >
            <HiOutlineMapPin />
            <p >
              Corferias Cra. 37 #24 - 67, Bogotá
            </p >
          </div >
          <p className={styles.event_description} >
            La Gestión Ambiental de las empresas se encuentra en constante evolución. En este momento el análisis de los
            productos
          </p >
        </div >

        <div className={styles.sponsors} >
          <p >Presentado por:</p >
          <Image src='/images/shambala_logo.png' alt='sponsor_logo' width={80} height={25} />
        </div >
      </div >


      <div className={styles.card_content} >
        <div className={styles.date_container} >
          <p className={styles.week_day} >
            Mar
          </p >
          <h2 className={styles.calendar_day} >
            04
          </h2 >
        </div >
        <div className={styles.event_info} >
          <h2 className={styles.event_title} >
            FIMA Feria Internacional del Medio Ambiente
          </h2 >
          <div className={styles.event_time} >
            <HiOutlineClock />
            <p >
              mar, 16 de marzo, 5:00 pm. - vie, 19 de marzo, 5:00 pm.
            </p >
          </div >
          <div className={styles.event_location} >
            <HiOutlineMapPin />
            <p >
              Corferias Cra. 37 #24 - 67, Bogotá
            </p >
          </div >
          <p className={styles.event_description} >
            La Gestión Ambiental de las empresas se encuentra en constante evolución. En este momento el análisis de los
            productos
          </p >
          <div className={styles.speakers} >
            <div className={styles.speaker} >
              <Avatar
                size='small'
                src='/images/person_image.jpg'
              />
              <p >
                Kai Olivares
              </p >
            </div >
          </div >
          <div className={styles.sponsors} >
            <p >Presentado por:</p >
            <Image src='/images/shambala_logo.png' alt='sponsor_logo' width={80} height={25} />
          </div >
        </div >

        <div className={styles.image_container} style={{backgroundImage: `url('/images/event_image.jpg')`}} >
          <div className={styles.event_type} >
            <HiCalendarDays />
            <p >Evento</p >
          </div >
          <div className={styles.like_event} >
            <Button type='ghost' >
              <HiOutlineHeart />
            </Button >
          </div >
        </div >
      </div >
    </div >
  )
}

export default EventCard