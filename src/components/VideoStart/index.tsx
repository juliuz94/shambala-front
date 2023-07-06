import styles from './styles.module.css'

type VideoStartProps = {
  videoId: string
}

const VideoStart = ({ videoId }: VideoStartProps) => {
  return (
    <div className={styles.youtube_video_container}>
      <div className={styles.youtube_video}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title='YouTube Video'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default VideoStart
