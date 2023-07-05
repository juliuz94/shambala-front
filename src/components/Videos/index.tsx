import Head from 'next/head'
import { useState, useEffect } from 'react'
import SearchInput from '@/components/SearchInput'
import VideoRow from './ui/VideoRow'
import VideoRowSkeleton from './ui/Skeleton'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { Video } from '@/types'
import styles from './styles.module.css'

type Label = {
  createdAt: String
  updatedAt: String
  en: String
  es: String
  videos: Video[]
}

const VideosComponent = () => {
  const [loadingData, setLoadingData] = useState(false)
  const [videos, setVideos] = useState<Label[]>([])
  const [videosWithProgress, setVideosWithProgress] = useState([])

  const fetchVideos = async () => {
    setLoadingData(true)
    try {
      const { data } = await axiosInstance.get(`${ROUTES.VIDEOS_BY_TAG}`)
      setVideos(data.docs)
    } catch (error) {
      console.log('[fetchVideos]', error)
    } finally {
      setLoadingData(false)
    }
  }

  const fetchVideosWithProgress = async () => {
    try {
      const { data } = await axiosInstance.get(ROUTES.VIDEOS_WITH_PROGRESS)
      if (data.videos.length > 0) {
        setVideosWithProgress(data.videos)
      }
    } catch (error) {
      console.log('[fetchVideosWithProgress]', error)
    }
  }

  useEffect(() => {
    fetchVideosWithProgress()
    fetchVideos()
  }, [])

  return (
    <div>
      <Head>
        <title>Videos</title>
      </Head>

      <div className={styles.content_container}>
        {loadingData ? (
          <div style={{ marginTop: '2rem' }}>
            <VideoRowSkeleton />
            <VideoRowSkeleton />
          </div>
        ) : (
          <>
            <div className={styles.video_options}>
              <SearchInput />
            </div>
            <VideoRow title='En progreso' videos={videosWithProgress} />
            {videos.length > 0 &&
              videos.map((videoCategory, index) => (
                <VideoRow
                  key={index}
                  title={videoCategory.es}
                  videos={videoCategory.videos}
                />
              ))}
          </>
        )}
      </div>
    </div>
  )
}

export default VideosComponent
