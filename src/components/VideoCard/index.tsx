import { Avatar, Progress } from 'antd'
import { useRouter } from 'next/router'
import styles from './styles.module.css'
import { IoIosHeart } from 'react-icons/io'
import { Video } from '@/types'
import { UserOutlined } from '@ant-design/icons'


interface PropTypes {
  video: Video
}

const VideoCard=({video}: PropTypes) => {
  const router=useRouter()

  return (
    <div className={styles.video_card} onClick={() => router.push(`video/${video._id}`)} >
      <div className={styles.card_header} style={{backgroundImage: `url(${video?.image})`}} >
        <div className={styles.new_label} >
          <p >Nuevo</p >
        </div >
        <button className={styles.like_button} >
          <IoIosHeart />
        </button >
      </div >
      <div className={styles.card_body} >
        <div className={styles.progress_bar_container} >
          <Progress
            percent={80}
            status='normal'
            size='small'
            strokeColor={{from: '#B0D0F6', to: '#0F72EC'}}
            showInfo={false}
            className={styles.progress_bar}
          />
          <p >
            80%
          </p >
        </div >
        <h1 className={styles.video_title} >
          {video?.title}
        </h1 >
        <p className={styles.video_description} >
          {video?.description}
        </p >
      </div >
      <section className={styles.author} >
        <Avatar size={24} icon={<UserOutlined />} />
        <p > {video.title}</p >
      </section >
    </div >
  )
}

export default VideoCard