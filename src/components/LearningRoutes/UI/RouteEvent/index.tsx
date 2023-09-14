import { useRouter } from 'next/router'
import { Workshop } from '@/types'
import { Avatar } from 'antd'
import dayjs from 'dayjs'
import {
  HiCalendarDays,
  HiOutlineClock,
  HiOutlineHeart,
  HiOutlineMapPin,
} from 'react-icons/hi2'
import styles from './styles.module.css'

interface PropTypes {
  event: Workshop
}
const RouteEvent = ({ event }: PropTypes) => {
  console.log(event)
  const router = useRouter()

  return (
    <div key={event._id} className={styles.workshops_card} onClick={() => router.push(`/event/${event?._id}`)}>
      <div className={styles.left_column}>
        <div className={styles.event_image_container}>
          <img src={event?.image} alt='img' />
        </div>
        <div className={styles.date_container}>
          <p className={styles.week_day}>
            {event?.date && dayjs(event.date).format('MMM')}
          </p>

          <h2 className={styles.calendar_day}>
            {event?.date && dayjs(event.date).format('DD')}
          </h2>
        </div>
      </div>
      <div className={styles.event_info}>
        <h2 className={styles.event_title}>{event?.title}</h2>

        {event?.isPremium && (
          <div className={styles.premium_bagde}>
            <img src='/images/premium_badge.png' alt='premium badge' />
          </div>
        )}

        <div className={styles.event_time}>
          <HiOutlineClock />
          <p className={styles.time}>
            {dayjs(event?.date).format('MMM D, YYYY')}
          </p>
        </div>

        {!event?.isVirtual && (
          <div className={styles.event_location}>
            <HiOutlineMapPin />
            <p>{event?.location}</p>
          </div>
        )}

        {/* {event && event?.speakers.length > 0 && (
          <div className={styles.speakers}>
            {event?.speakers.map((speaker) => {
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
                    <p style={{ fontSize: '0.75rem' }}>
                      {speaker?.name?.split(' ')[0].split('')[0]}
                      {speaker?.name?.split(' ')[1]?.split('')[0]}
                    </p>
                  </Avatar>
                  <p className={styles.speaker_name}>{speaker?.name}</p>
                </div>
              )
            })}
          </div>
        )} */}

        {event && event?.sponsors.length > 0 && (
          <div className={styles.sponsors}>
            <p>Presentado por:</p>
            {event?.sponsors.map((sponsor) => {
              return (
                <div key={sponsor._id} className={styles.sponsor_image}>
                  <img src={sponsor.image} alt='sponsor_logo' />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default RouteEvent