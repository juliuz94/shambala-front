import Head from 'next/head'
import { useState, useEffect, useMemo, useCallback } from 'react'
import SearchInput from '@/components/SearchInput'
import VideoRow from './ui/VideoRow'
import VideoRowSkeleton from './ui/Skeleton'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { Video, VideoProfile, NewVideoProfile } from '@/types'
import styles from './styles.module.css'
import { useRouter } from 'next/router'

type Label = {
  createdAt: String
  updatedAt: String
  en: String
  es: String
  videos: Video[]
}

const VideosComponent = () => {
  const router = useRouter()
  // const searchQuery = useMemo(
  //   () => router?.query?.search ?? '',
  //   [router.query.search]
  // )

  const [loadingData, setLoadingData] = useState(false)
  const [videos, setVideos] = useState<Label[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [videosWithProgress, setVideosWithProgress] = useState<
    NewVideoProfile[]
  >([])
  const [unfinishedVideos, setUnfinishedVideos] = useState([])

  const fetchVideos = useCallback(async () => {
    setLoadingData(true)
    try {
      const { data } = await axiosInstance.get(
        `${ROUTES.VIDEOS_BY_TAG}?search=${searchQuery}`
      )
      setVideos(data.docs)
    } catch (error) {
      console.log('[fetchVideos]', error)
    } finally {
      setLoadingData(false)
    }
  }, [searchQuery])

  const fetchVideosWithProgress = async () => {
    try {
      const { data } = await axiosInstance.get(ROUTES.VIDEOS_WITH_PROGRESS)
      if (data.videos.length > 0) {
        const unfinished = data.videos.filter(
          (video: VideoProfile) => !video.progress.finished
        )
        setVideosWithProgress(data.videos)
        setUnfinishedVideos(unfinished)
      }
    } catch (error) {
      console.log('[fetchVideosWithProgress]', error)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [fetchVideos, searchQuery])
  useEffect(() => {
    fetchVideosWithProgress()
  }, [])

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    // router.query.search = value
    // router.push(router)

  }

  return (
    <div>
      <Head>
        <title>Videos</title>
      </Head>

      <div className={styles.content_container}>
        {false ? (
          <div style={{ marginTop: '2rem' }}>
            <VideoRowSkeleton />
            <VideoRowSkeleton />
          </div>
        ) : (
          <>
            <div className={styles.video_options}>
              <SearchInput onSearch={handleSearch} />
            </div>

            {videosWithProgress.some((video) => !video.progress.finished) && (
              <VideoRow title='En progreso' videos={unfinishedVideos} />
            )}

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
