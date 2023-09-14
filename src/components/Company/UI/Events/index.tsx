import Image from 'next/image'
import { useRouter } from 'next/router'
import { Avatar, Button } from 'antd'
import {
  HiCalendarDays,
  HiOutlineClock,
  HiOutlineHeart,
  HiOutlineMapPin,
} from 'react-icons/hi2'
import { Doc } from '@/Hooks/useFetchWorkshop'
import dayjs from 'dayjs'
import locale from 'dayjs/locale/es'
import styles from './styles.module.css'

dayjs.locale(locale)

interface EventsTypes {
  work: Doc
}

const Events = ({ work }: EventsTypes) => {
  const router = useRouter()

  return (
    <div
      className={`${styles.event_card} ${styles.small}`}
      onClick={() => router.push(`/event/${work?._id}`)}
    >
      <div className={styles.card_content_mobile}>
        <div className={styles.line} />

        <div className={styles.header_card}>
          <div className={styles.date_container}>
            <p className={styles.week_day}>
              {work?.date && dayjs(work.date).format('MMM')}
            </p>

            <h2 className={styles.calendar_day}>
              {work?.date && dayjs(work.date).format('DD')}
            </h2>
          </div>

          <div className={styles.title_header}>
            <h2 className={styles.event_title}>{work?.title || ''}</h2>
          </div>
        </div>

        {work && work?.speakers.length > 0 && (
          <div className={styles.speakers}>
            {work?.speakers.map((speaker) => {
              return (
                <div key={speaker._id} className={styles.speaker}>
                  <Avatar
                    size='small'
                    style={{
                      backgroundColor: '#0F72EC',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    src={speaker.image}
                  >
                    {/* <p style={{ fontSize: '0.5rem' }}>
                      {speaker?.name?.split(' ')[0].split('')[0]}
                      {speaker?.name?.split(' ')[1]?.split('')[0]}
                    </p> */}
                  </Avatar>
                  {/* <p className={styles.speaker_name}>{speaker.name}</p> */}
                </div>
              )
            })}
          </div>
        )}

        <div
          className={styles.image_container}
          style={{ backgroundImage: `url(${work?.image})` }}
        />

        <div className={styles.event_info}>
          <div className={styles.event_time}>
            <HiOutlineClock />
            <p>{dayjs(work?.date).format('MMM D, YYYY')}</p>
          </div>

          <div className={styles.event_time}>
            <HiOutlineMapPin />
            <p>{work?.location}</p>
          </div>

          <p className={styles.event_description}>{work?.description}</p>
        </div>

        <div className={styles.sponsors}>
          <p>Presentado por:</p>
          <Image
            src='/images/shambala_logo.png'
            alt='sponsor_logo'
            width={80}
            height={25}
          />
        </div>
      </div>

      <div className={styles.card_content}>
        <div className={styles.date_container}>
          <p className={styles.week_day}>{dayjs(work?.date).format('MMM')}</p>

          <h2 className={styles.calendar_day}>
            {dayjs(work?.date).format('DD')}
          </h2>
        </div>

        <div className={styles.event_info}>
          <h2 className={styles.event_title}>{work?.title}</h2>

          <div className={styles.event_time}>
            <HiOutlineClock />
            <p>{dayjs(work?.date).format('MMM D, YYYY')}</p>
          </div>

          <div className={styles.event_location}>
            <HiOutlineMapPin />
            <p>{work?.location}</p>
          </div>

          <p className={styles.event_description}>{work?.description}</p>
          {work && work?.speakers.length > 0 && (
            <div className={styles.speakers}>
              {work?.speakers.map((speaker) => {
                return (
                  <div key={speaker._id} className={styles.speaker}>
                    <Avatar
                      size='small'
                      style={{
                        backgroundColor: '#0F72EC',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      // src={speaker.image}
                    >
                      {/* <p style={{ fontSize: '0.75rem' }}>
                        {speaker.name.split(' ')[0].split('')[0]}
                        {speaker.name.split(' ')[1]?.split('')[0]}
                      </p> */}
                    </Avatar>
                    {/* <p className={styles.speaker_name}>{speaker.name}</p> */}
                  </div>
                )
              })}
            </div>
          )}

          {work && work?.sponsors.length > 0 && (
            <div className={styles.sponsors}>
              <p>Presentado por:</p>
              {work?.sponsors.map(
                (sponsor, index) =>
                  sponsor && (
                    <div key={index} className={styles.sponsor_image}>
                      <img src={sponsor.image} alt='sponsor_logo' />
                    </div>
                  )
              )}
            </div>
          )}
        </div>

        <div className={styles.image_container}>
          <img src={work?.image} alt='img' />
          <div className={styles.event_type}>
            <HiCalendarDays />
            <p>{work?.type === 'EVENT' ? 'Evento' : 'Taller'}</p>
          </div>

          <div className={styles.like_event}>
            <Button type='ghost'>
              <HiOutlineHeart />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events
