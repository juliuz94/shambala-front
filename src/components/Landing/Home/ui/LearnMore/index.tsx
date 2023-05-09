import styles from './styles.module.css'
import { strings } from '@/constants/strings'
import VideoStart from '@/components/VideoStart'
import Divider from '@/components/Divider'

const LearnMore=() => {
  return (
    <div className={styles.container} >
      <div className={styles.learMore} >
        <h2 >
          {strings.ladingPage.home.learMore}
        </h2 >
        <Divider />
        <div className={styles.text_container} >
          <p >
            {strings.ladingPage.home.learMoreDesc}
          </p >
        </div >
      </div >
      <VideoStart />
    </div >
  )
}

export default LearnMore