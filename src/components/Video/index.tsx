import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import { useUserContext } from '@/context/userContext'
import VideoHeader from './ui/VideoHeader'
import VideoPlayer from './ui/VideoPlayer'
import VideoTabs from './ui/VideoTabs'
import VideoComments from './ui/VideoComments'
import RecommendedVideos from './ui/RecommendedVideos'
import styles from './styles.module.css'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'

const Video = () => {
  const [video, setVideo] = useState(null)
  const [comments, setComments] = useState(null)
  const router = useRouter()
  const { id } = router.query

  const fetchVideo = async () => {
    try {
      const { data } = await axiosInstance.get(`${ROUTES.VIDEOS}/${id}`)
      setVideo(data)

    } catch (error) {
      console.log('[fetchVideo]', error)
    }
  }

  const fetchComments = async () => {
    try {
      const { data } = await axiosInstance.get(`${ROUTES.COMMENTS}/${id}`)
      setComments(data)
      console.log(data)
    } catch (error) {
      console.log('[fetchComments]', error)
    }
  }

  useEffect(() => {
    fetchVideo()
    fetchComments()
  }, [id])

  return (
    <div>
      <Header />
      <div className={styles.video_container}>
        <VideoHeader video={video} />
        <VideoPlayer video={video} />
        <div className={styles.video_info_container}>
          <VideoTabs video={video} />
          <VideoComments 
            video={video} 
            refreshData={fetchComments} 
            comments={comments}
          />
        </div>
      </div>
      <RecommendedVideos />
    </div>
  )
}

export default Video