import { useRef } from 'react'
import { Button, Progress, Tag } from 'antd'
import {
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
} from 'react-icons/io/index'
import VideoCard from '@/components/VideoCard'
import { Video, Workshop } from '@/types'
import styles from './styles.module.css'

interface PropTypes {
  title: String
  videos: Video[]
  routeData?: {
    progress: number,
    finishDate: number | null
  }
}

const VideoRow = ({ title, videos, routeData }: PropTypes) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScrollRow = (direction: String) => {
    if (!scrollRef.current) return

    const videoCardWidth = 327

    if (direction === 'left') {
      scrollRef.current.scrollLeft -= videoCardWidth
    } else {
      scrollRef.current.scrollLeft += videoCardWidth
    }
  }

  const getTagColor = (daysRemaining: number) => {
    if (daysRemaining > 15) {
      return 'green'
    } else if (daysRemaining > 0) {
      return 'orange'
    } else {
      return 'red'
    }
  }

  const getTagMessage = (daysRemaining: number) => {
    if (daysRemaining > 0) {
      return `${daysRemaining} días restantes`
    } else {
      return `${daysRemaining} días de atraso`
    }
  }

  return (
    <div className={styles.videos_row_container}>
      <div className={styles.video_row_header}>
        <h3 className={styles.video_row_title}>{title}</h3>
        <div className={styles.video_row_navigation}>
          <Button
            className={styles.row_navigation_button}
            onClick={() => handleScrollRow('left')}
          >
            <IoIosArrowRoundBack />
          </Button>
          <Button
            className={styles.row_navigation_button}
            onClick={() => handleScrollRow('right')}
          >
            <IoIosArrowRoundForward />
          </Button>
        </div>
      </div>
      {
        routeData && (
          <div className={styles.route_data}>
            {
              (!isNaN(routeData.progress)) && (
                <div className={styles.left_column}>
                  <p>Progreso</p>
                  <Progress
                    percent={routeData.progress}
                    size="small"
                    className={styles.route_progress}
                    strokeColor={routeData.progress < 100 ? '#0f72ec' : '#54c055'}
                  />
                </div>
              )
            }
            {
              routeData.finishDate && <Tag color={getTagColor(routeData.finishDate)}>
                {getTagMessage(routeData.finishDate)}
              </Tag>
            }
          </div>
        )
      }
      <div className={styles.videos_row} ref={scrollRef}>
        {videos.length > 0 &&
          videos.map((video) => {
            return <VideoCard key={video._id} video={video} />
          })}
      </div>
    </div>
  )
}

export default VideoRow
