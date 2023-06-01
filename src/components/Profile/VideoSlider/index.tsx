import { useRef } from 'react'
import { Button } from 'antd'
import styles from './styles.module.css'
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io'
import VideoCard from '@/components/VideoCard'
import { Video } from '@/types'

interface PropTypes {
  title: String
  videos: Video[]
}

const VideoSlider = ({ title, videos }: PropTypes) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScrollRow = (direction: String) => {
    if (!scrollRef.current) return

    const rowWidth = scrollRef.current.offsetWidth

    if (direction === 'left') {
      scrollRef.current.scrollLeft -= rowWidth / 4
    } else {
      scrollRef.current.scrollLeft += rowWidth / 4
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

export default VideoSlider
