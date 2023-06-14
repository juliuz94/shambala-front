import { useRouter } from 'next/router'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { Button, Avatar, Progress } from 'antd'
import {
  HiArrowSmallLeft,
  HiCalendarDays,
  HiOutlineClock,
} from 'react-icons/hi2'
import useFetchInterested from '@/Hooks/useFetchInterested'
import { useUserContext } from '@/context/userContext'
import { Video } from '@/types'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import styles from './styles.module.css'

interface PropTypes {
  video: Video | null
  progress: number
  related: any
}

const VideoHeader = ({ video, progress, related }: PropTypes) => {
  const { user } = useUserContext()
  const router = useRouter()
  const { interested } = useFetchInterested()

  let userHasShownInterest = false
  if (Array.isArray(interested)) {
    userHasShownInterest = (interested as any[]).find(
      (i) => i.user === user?._id
    )
  }

  // subscribe to new event
  const subscribe = async () => {
    try {
      await axiosInstance.post(`${ROUTES.WORKSHOP}/subscribeToInterested`, {
        video: video?._id,
      })
    } catch (error) {
      console.log('error')
    }
  }

  // reserve space
  const reserve = async () => {
    try {
      await axiosInstance.post(`${ROUTES.WORKSHOP}/signUpForEvent`, {
        displayName: user?.firstName,
        email: user?.email,
        position: '',
        workshop: video?._id,
      })
    } catch (error) {
      console.log('error')
    }
  }

  const handleClick = () => {
    if (related !== null) {
      reserve()
    } else {
      subscribe()
    }
  }

  let formattedDate = ''
  let formattedTime = ''

  if (related?.date) {
    dayjs.locale('es')
    const date = dayjs(related.date)
    formattedDate = date.format('dddd D [de] MMMM')
    formattedTime = date.format('h:mm A')
  }

  return (
    <section className={styles.video_header}>
      <div className={styles.left_column}>
        <Button type='ghost' onClick={() => router.back()}>
          <HiArrowSmallLeft size={25} />
        </Button>
        <h1 className={styles.video_title}>{video?.title}</h1>
        {/* <div className={styles.creator_container}>
          <Avatar size='small' src={user.photoURL}>
            A
          </Avatar>
          <p>Autor del video</p>
        </div> */}
      </div>
      <div className={styles.center_column}>
        <Progress
          type='circle'
          percent={progress}
          strokeWidth={8}
          format={(percent) => (
            <div className={styles.progress_circle}>
              <p>{percent}%</p>
              <p>Completado</p>
            </div>
          )}
          strokeColor={{ '0%': '#B0D0F6', '100%': '#0F72EC' }}
        />
      </div>

      <div className={styles.right_column}>
        <div className={styles.next_workshop}>
          <div className={styles.info_column}>
            <h2>{related?.title || 'Próximo taller en vivo'}</h2>

            <div className={styles.workshop_date}>
              {formattedDate ? <HiCalendarDays size={18} /> : ''}
              <p className={styles.date}>{formattedDate || ''}</p>
            </div>

            <div className={styles.workshop_time}>
              {formattedTime ? <HiOutlineClock size={18} /> : ''}
              <p>{formattedTime || ''}</p>
            </div>

            <Button
              type={userHasShownInterest ? 'default' : 'primary'}
              size='large'
              className={styles.new_button}
              onClick={handleClick}
              disabled={userHasShownInterest}
            >
              {related !== null
                ? 'Reservar cupo'
                : userHasShownInterest
                ? 'Manifestaste tu interés'
                : '¿Te interesa un evento?'}
            </Button>
          </div>

          <Button
            type={userHasShownInterest ? 'default' : 'primary'}
            size='large'
            className={styles.classic_button}
            onClick={handleClick}
            disabled={userHasShownInterest}
          >
            {related !== null
              ? 'Reservar cupo'
              : userHasShownInterest
              ? 'Manifestaste tu interés'
              : '¿Te interesa un evento?'}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default VideoHeader
