import { useState, useRef } from 'react'
import { Modal } from 'antd'
import ReactPlayer from 'react-player'
import styles from './styles.module.css'

type PropTypes = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  videoUrl: string
}


const CompanyVideoModal = ({ open, setOpen, videoUrl }: PropTypes) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const player = useRef<ReactPlayer>(null)

  const handleCloseModal = () => {
    console.log('player.current', player.current)
    setIsPlaying(false)
    setOpen(false)
  }

  return (
    <Modal
      open={open}
      onCancel={handleCloseModal}
      footer={false}
    >
      <div className={styles.react_player}>
      <ReactPlayer
        ref={player}
        width='100%'
        height='100%'
        controls={true}
        // style={{ position: 'absolute', top: 0, left: 0 }}
        url={videoUrl ? videoUrl : ''}
        // onProgress={onProgress}
        // onDuration={(duration) => setTotalDuration(duration)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        playing={isPlaying}
        // muted={muted}
        // playbackRate={playBackRate}
        // onEnded={onVideoEnded}
      />
      </div>
    </Modal>
  )
}

export default CompanyVideoModal