import styles from './styles.module.css'
import { strings } from '@/constants/strings'
import VideoStart from '@/components/VideoStart'
import TitleSections from '@/components/Landing/Home/ui/TitleSections'
import GlobalContainer from '@/components/Landing/Home/ui/GlobalContainer'

const LearnMore=() => {
  return (
    <GlobalContainer >
      <div className={styles.container} >
        <div className={styles.learMore} >
          <TitleSections title={strings.ladingPage.home.learMore} />
          <div className={styles.text_container} >
            <p >
              {strings.ladingPage.home.learMoreDesc}
            </p >
          </div >
        </div >
        <div className={styles.video_container} >
          <VideoStart />
        </div >
      </div >
    </GlobalContainer >

  )
}

export default LearnMore