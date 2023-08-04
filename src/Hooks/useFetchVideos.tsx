import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { Video } from '@/types'

type Label = {
  createdAt: String
  updatedAt: String
  en: String
  es: String
  videos: Video[]
}

const useFetchVideoWithProgress = () => {
  const [loadingData, setLoadingData] = useState(false)
  const [videos, setVideos] = useState<Label[]>([])
  const [videosWithProgress, setVideosWithProgress] = useState([])
  const [videosByTag, setVideosByTag] = useState([])

  const fetchVideos = async () => {
    setLoadingData(true)
    try {
      const { data } = await axiosInstance.get(ROUTES.VIDEOS_BY_TAG)
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

  const fetchVideosByTags = async (tagIds?: string) => {
    if (!tagIds) return 
    try {
      const { data } = await axiosInstance.get(`${ROUTES.VIDEOS_BY_TAG}?${tagIds}`)
      if (data.docs.length > 0) {
        return data 
      } else {
        return null
      }
    } catch (error) {
      console.log('[fetchVideosByTags]', error)
    }
  }

  useEffect(() => {
    fetchVideosWithProgress()
    fetchVideos()
  }, [])

  return { videos, videosWithProgress, loadingData, fetchVideosByTags }
}

export default useFetchVideoWithProgress
