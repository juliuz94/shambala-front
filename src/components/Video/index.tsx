import Head from 'next/head'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import VideoHeader from './ui/VideoHeader'
import VideoPlayer from './ui/VideoPlayer'
import VideoTabs from './ui/VideoTabs'
import VideoComments from './ui/VideoComments'
import RecommendedVideos from './ui/RecommendedVideos'
import PremiumBlocker from '../Premium'
import { BiDownArrowAlt } from 'react-icons/bi'
import ROUTES from '@/helpers/routes'
import styles from './styles.module.css'
import useFetchUserPlan from '@/Hooks/useFetchUserPlan'

const Video = () => {
  const [showComments, setShowComments] = useState(false)
  const [related, setRelated] = useState(null)
  const [video, setVideo] = useState<any>(null)
  const [comments, setComments] = useState(null)
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  const { id } = router.query
  const { subscription } = useFetchUserPlan()

  // events related
  const fetchRelated = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${ROUTES.WORKSHOP}/${video?.relatedWorkShops[0]}`
      )
      setRelated(data)
    } catch (error) {
      console.log(error)
    }
  }

  // get video
  const fetchVideo = async () => {
    try {
      const { data } = await axiosInstance.get(`${ROUTES.VIDEOS}/${id}`)
      setVideo(data)
      setProgress(data.progress.progress.toFixed(0) || 0)
    } catch (error) {
      console.log('[fetchVideo]', error)
    }
  }

  // get comments
  const fetchComments = async () => {
    try {
      const { data } = await axiosInstance.get(`${ROUTES.COMMENTS}/${id}`)
      setComments(data)
    } catch (error) {
      console.log('[fetchComments]', error)
    }
  }

  useEffect(() => {
    if (!id) return
    fetchVideo()
    fetchComments()
  }, [id])

  useEffect(() => {
    if (
      video &&
      video?.relatedWorkShops &&
      video?.relatedWorkShops.length > 0
    ) {
      fetchRelated()
    }
  }, [video])

  return (
    <div className={styles.section}>
      {
        (subscription?.status !== 'ACTIVE' &&  video?.isPremium) && (
          createPortal(<PremiumBlocker />, document.body)
        )
      }
      <Head>
        <title>{video?.title}</title>
      </Head>

      <div className={styles.video_container}>
        <VideoHeader video={video} progress={progress} related={related} />
        <VideoPlayer video={(subscription?.status !== 'ACTIVE' &&  video?.isPremium) ? '' : video} videoProgress={progress} />
        <div className={styles.video_info_container}>
          <VideoTabs video={video} />
          {!showComments && (
            <div
              className={styles.video_comments}
              onClick={() => setShowComments(!showComments)}
            >
              <div className={styles.comments_container}>
                <div className={styles.header}>
                  <p>
                    Ver los comentarios{' '}
                    <span>
                      <BiDownArrowAlt />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
          {showComments && (
            <VideoComments
              video={video}
              refreshData={fetchComments}
              comments={comments}
              setShowComments={setShowComments}
            />
          )}
        </div>
      </div>
      {/* <RecommendedVideos /> */}
    </div>
  )
}

export default Video
