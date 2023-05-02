import { FC, useRef } from 'react'
import { Button } from 'antd'
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io'
import VideoCard from '@/components/VideoCard'
import styles from './styles.module.css'

const RecommendedVideos: FC = () => {
  const scrollRef = useRef(null)
  
  const handleScrollRow = (direction: String) => {
    if (!scrollRef.current) return 

    const rowWidth = scrollRef.current.offsetWidth

    if (direction === 'left') {
      scrollRef.current.scrollLeft -= (rowWidth / 4);
    } else {
      scrollRef.current.scrollLeft += (rowWidth / 4);
    }
  }

  return (
    <div className={styles.recommended_videos_section}>
      <div className={styles.recommended_videos_container}>
        <div className={styles.left_column}>
          <h2>Videos similares</h2>
          <div className={styles.video_row_navigation}>
            <Button className={styles.row_navigation_button} onClick={() => handleScrollRow('left')}>
              <IoIosArrowRoundBack />
            </Button>
            <Button className={styles.row_navigation_button} onClick={() => handleScrollRow('right')}>
              <IoIosArrowRoundForward />
            </Button>
          </div>
        </div>

        <div className={styles.right_column} ref={scrollRef}>
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
        </div>
      </div>
    </div>
  )
}

export default RecommendedVideos