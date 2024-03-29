import { Avatar, Progress } from 'antd'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io/index'
import { UserOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useUserContext } from '@/context/userContext'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import styles from './styles.module.css'

const VideoCard = ({ video }: any) => {
  const { user } = useUserContext()
  const router = useRouter()
  const [liked, setLiked] = useState(
    video.like && video.like.includes(user?._id)
  )

  const likeVideo = async () => {
    try {
        await axiosInstance.patch(`${ROUTES.VIDEO_LIKE}/${video._id}`, {
        isLike: liked ? false : true
        })
    } catch (error) {
      console.log('[likeVideo]', error)
    }
  }

  const isNewVideo = (date: string) => {
    const creationDate = dayjs(date)
    const today = dayjs()
    const difference = today.diff(creationDate, 'days')
    return difference < 7
  }

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation()

    try {
      await likeVideo()
      setLiked((prevLiked: boolean) => !prevLiked)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setLiked(video.like && video.like.includes(user?._id))
  }, [video.like, user?._id])

  return (
    <div
      className={styles.video_card}
      onClick={() => router.push(`/video/${video._id}`)}
    >
      <div
        className={styles.card_header}
        style={{ backgroundImage: `url(${video?.image})` }}
      >
        {isNewVideo(video.createdAt) && (
          <div className={styles.new_label}>
            <p>Nuevo</p>
          </div>
        )}
        <button className={styles.like_button} onClick={handleLikeClick}>
          {liked ? <IoIosHeart style={{ fill: 'red' }} /> : <IoIosHeartEmpty />}
        </button>
      </div>
      <div className={styles.card_body}>
        {video.progress !== null && (
          <div className={styles.progress_bar_container}>
            <Progress
              percent={video?.progress?.progress}
              status='normal'
              size='small'
              strokeColor={{ from: '#B0D0F6', to: '#0F72EC' }}
              showInfo={false}
              className={styles.progress_bar}
            />
            <p>{video?.progress?.progress.toFixed(0)}%</p>
          </div>
        )}
        <h1 className={styles.video_title}>{video?.title}</h1>
        <p className={styles.video_description}>{video?.description}</p>
        {
          video.isPremium && (
            <div className={styles.premium_bagde}>
              <img src='/images/premium_badge.png' alt='premium badge' />
            </div>
          )
        }
      </div>
      {/* <section className={styles.author}>
        <Avatar size={24} icon={<UserOutlined />} />
        <p>
        </p>
      </section> */}
    </div>
  )
}

export default VideoCard
