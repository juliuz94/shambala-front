import { useRef } from 'react'
import { Button } from 'antd'
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io'
import VideoCard from '@/components/VideoCard'
import { Video } from '@/types'
import styles from './styles.module.css'

interface PropTypes {
  title: String
  videos: Video[]
}

const VideoRow = ({ title, videos }: PropTypes) => {
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
