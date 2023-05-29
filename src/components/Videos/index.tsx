import { useState, useEffect, useMemo } from 'react'
import Header from '@/components/Header'
import styles from './styles.module.css'
import { Button } from 'antd'
import Filter from '@/components/PageFilter'
import SearchInput from '@/components/SearchInput'
import VideoRow from './ui/VideoRow'
import VideoRowSkeleton from './ui/Skeleton'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { Video } from '@/types'

type Label = {
  createdAt: String;
  updatedAt: String;
  en: String;
  es: String;
  videos: Video[];
};

const VideosComponent = () => {
  const [loadingData, setLoadingData] = useState(false)
  const [videos, setVideos] = useState<Label[]>([])
  const [videosWithProgress, setVideosWithProgress] = useState([])

  const fetchVideos = async () => {
    setLoadingData(true)
    try {
      const { data } = await axiosInstance.get(ROUTES.VIDEOS_BY_TAG)
      setVideos(data.docs)
      console.log('fetchVideos', data.docs)
      // console.log('[fetchVideos] res', data)
    } catch (error) {
      console.log('[fetchVideos]', error)
    } finally {
      setLoadingData(false)
    }
  }

  const fetchVideosWithProgress = async () => {
    try {
      const { data } = await axiosInstance.get(ROUTES.VIDEOS_WITH_PROGRESS)
      console.log('fetchVideosWithProgress', data)
      if (data.docs.length > 0) {
        const videos = data.docs.map(video => video.videoId)
        setVideosWithProgress(videos)
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
      <Header />
      <div className={styles.content_container}>
        {
          loadingData ?
            <div style={{ marginTop: '2rem' }}>
              <VideoRowSkeleton />
              <VideoRowSkeleton />
            </div>
            :
            <>
              <div className={styles.video_options}>
                <SearchInput />
                <Filter />
              </div>
              <VideoRow
                title='En progreso'
                videos={videosWithProgress}
              />
              {
                videos.length > 0 && videos.map(videoCategory => {
                  return (
                    <VideoRow
                      key={videoCategory.es}
                      title={videoCategory.es}
                      videos={videoCategory.videos}
                    />
                  )
                })
              }
              {/* <VideoRow title='En Progreso' />
              <VideoRow title='En Progreso' />
              <VideoRow title='En Progreso' /> */}
            </>

        }

      </div>
    </div>
  )
}

export default VideosComponent