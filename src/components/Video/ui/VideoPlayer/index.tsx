import { useState, useRef, useEffect } from 'react'
import { Progress, Button, Slider } from 'antd'
import ReactPlayer from 'react-player'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { HiPlay, HiPause } from 'react-icons/hi2'
import { Video } from '@/types'
import styles from './styles.module.css'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'

interface PropTypes {
  video: Video | null
  videoProgress: number
}

interface VideoStatus {
  played: number
  playedSeconds: number
  loaded: number
  loadedSeconds: number
}

type ArithmeticOperand = any | number | bigint

const VideoPlayer = ({ video, videoProgress }: PropTypes) => {
  const [progress, setProgress] = useState(0)
  const [progressSeconds, setProgressSeconds] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [playBackRate, setPlayBackRate] = useState(1)
  const [lastProgress, setLastProgress] = useState(0)
  const player = useRef<ReactPlayer>(null)

  const onProgress = (progress: VideoStatus) => {
    if (!playing) return
    const { played, playedSeconds } = progress
    setProgress(played * 100)
    setProgressSeconds(playedSeconds)
    if (
      Math.floor(playedSeconds) % 3 === 0 &&
      lastProgress < Math.floor(playedSeconds)
    ) {
      setLastProgress(Math.floor(playedSeconds))
      saveVideoProgress(played)
    }
  }

  const onPlay = () => {
    if (player.current) {
      setPlaying(true)
    }
  }

  const onPause = () => {
    if (player.current) {
      setPlaying(false)
    }
  }

  const seek = (time: number) => {
    player.current?.seekTo(time, 'seconds')
    setProgressSeconds(time)
  }

  const onChangePlayBackRate = () => {
    switch (playBackRate) {
      case 2:
        setPlayBackRate(1)
        break

      default:
        setPlayBackRate(playBackRate + 0.5)
        break
    }
  }

  useEffect(() => {
    const progressInSeconds = (totalDuration * videoProgress) / 100
    player.current?.seekTo(progressInSeconds, 'seconds')
    setProgressSeconds(progressInSeconds)
    setProgress(videoProgress)
  }, [videoProgress, player, setProgressSeconds, totalDuration])

  const onChange = (newValue: ArithmeticOperand) => {
    if (player.current) {
      player.current.seekTo(newValue, 'seconds')
      setProgressSeconds(newValue)
    }
  }

  const saveVideoProgress = async (timeInSeconds: ArithmeticOperand) => {
    if (!video) return
    try {
      await axiosInstance.patch(`${ROUTES.VIDEO_PROGRESS}/${video._id}`, {
        videoId: video._id,
        progress: timeInSeconds * 100,
        finished: false,
      })
    } catch (error) {
      console.log('[saveVideoProgress]', error)
    }
  }

  const onVideoEnded = async () => {
    try {
      if (video) {
        await axiosInstance.patch(`${ROUTES.VIDEO_PROGRESS}/${video._id}`, {
          videoId: video._id,
          progress: 100,
          finished: true,
        })
      }

      setProgress(100)
      setProgressSeconds(totalDuration)
    } catch (error) {
      console.log('onVideoEnded', error)
    }
  }

  function toTimeString(totalSeconds: ArithmeticOperand) {
    const totalMs = totalSeconds * 1000
    const result = new Date(totalMs).toISOString().slice(11, 19)
    return result
  }

  return (
    <section className={styles.video_player_container}>
      <div className={styles.player_container}>
        <ReactPlayer
          ref={player}
          width='100%'
          height='100%'
          className={styles.react_player}
          style={{ position: 'absolute', top: 0, left: 0 }}
          url={video?.url}
          onProgress={onProgress}
          onDuration={(duration) => setTotalDuration(duration)}
          onPlay={onPlay}
          onPause={onPause}
          playing={playing}
          muted={muted}
          playbackRate={playBackRate}
          onEnded={onVideoEnded}
        />
        <div className={styles.controllers}>
          <Button
            className={styles.play_control_button}
            type='ghost'
            onClick={() => setPlaying(!playing)}
          >
            {playing ? <HiPause /> : <HiPlay />}
          </Button>
          <Button
            className={styles.play_control_button}
            type='ghost'
            onClick={() => setMuted(!muted)}
          >
            {muted ? <HiVolumeOff /> : <HiVolumeUp />}
          </Button>
          <Button
            className={styles.play_control_button}
            type='ghost'
            onClick={onChangePlayBackRate}
          >
            <p>{playBackRate}x</p>
          </Button>
          <div className={styles.progress_container}>
            <Progress
              percent={progress}
              strokeColor={{ '0%': '#54C055', '100%': '#54C055' }}
              trailColor='#C1C2C3'
              showInfo={false}
              className={styles.progress_bar}
            />
            <Slider
              min={0}
              max={totalDuration}
              onChange={onChange}
              value={progressSeconds}
              className={styles.seek}
              railStyle={{
                backgroundColor: 'transparent',
              }}
              trackStyle={{
                backgroundColor: 'transparent',
              }}
              handleStyle={{
                maxWidth: '1px',
              }}
              // marks={marks}
            />
          </div>
          <div className={styles.time_progress}>
            <p>{toTimeString(progressSeconds)} </p>
            <p>/</p>
            <p>{toTimeString(totalDuration)}</p>
          </div>
        </div>
      </div>

      <div className={styles.sections_container}>
        <div className={styles.sections_header}>
          <p>Contenido</p>
        </div>
        <div>
          {video &&
            video?.sections.map((section: any) => {
              return (
                <div
                  key={section.title}
                  className={styles.section_card}
                  onClick={() => seek(section.time)}
                >
                  <p>{section.title}</p>
                  <p>{toTimeString(section.time)}</p>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}

export default VideoPlayer
