import styles from './styles.module.css'
import { PlayBtn } from '../../../public/images/svg'
import Image from 'next/image'

const VideoStart=() => {
  return (
    <div className={styles.video_container} >
      <Image className={styles.play_video} src={PlayBtn} alt={'Play video'} />
    </div >
  )

}

export default VideoStart