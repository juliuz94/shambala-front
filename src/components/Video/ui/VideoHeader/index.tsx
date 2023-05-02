import { useRouter } from 'next/router'
import { Button, Avatar, Progress } from 'antd'
import { HiArrowSmallLeft, HiCalendarDays, HiOutlineClock } from 'react-icons/hi2' 
import { useUserContext } from '@/context/userContext'
import { Video } from '@/types'
import styles from './styles.module.css'

interface PropTypes {
  video: Video | null
}

const VideoHeader = ({ video }: PropTypes) => {
  const { user } = useUserContext()
  const router = useRouter()

  return (
    <section className={styles.video_header}>
      <div className={styles.left_column}>
        <Button type='ghost' onClick={() => router.back()}>
          <HiArrowSmallLeft size={25} />
        </Button>
        <h1 className={styles.video_title}>
          { video?.title }
        </h1>
        <div className={styles.creator_container}>
          <Avatar size='small' src={user.photoURL}>
            A
          </Avatar>
          <p>Autor del video</p>
        </div>
      </div>
      <div className={styles.center_column}>
        <Progress
          type="circle"
          percent={75}
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
            <h2>Próximo taller</h2>
            <div className={styles.workshop_date}>
              <HiCalendarDays size={18} />
              <p>Viernes 24 de Febrero</p>
            </div>
            <div className={styles.workshop_time}>
              <HiOutlineClock size={18} />
              <p>6:00 PM - 7:00 PM</p>
            </div>
          </div>
          <div className={styles.actions_column}>
            <Button type='primary' size='large'>
              Reservar cupo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoHeader