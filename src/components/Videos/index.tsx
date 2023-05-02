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
  label: string;
  videos: Video[];
};

const VideosComponent = () => {
  const [loadingData, setLoadingData] = useState(false)
  const [videos, setVideos] = useState<Label[]>([])

  const organizeVideos = (videos: Video[]) => {
    let organizedVideos: Label[] = []

    videos.forEach((video: Video) => {
      const category = organizedVideos.find(category => category.label === video.tags[0])
      if (!category) {
        organizedVideos.push({
          label: video.tags[0],
          videos: [video]
        })
      } else {
        category.videos.push(video)
      }
    })
    
    console.log(organizedVideos)
    setVideos(organizedVideos)
  }

  const fetchVideos = async () => {
    try {
      const { data } = await axiosInstance.get(ROUTES.VIDEOS)
      organizeVideos(data.docs)
      console.log('[fetchVideos] res', data)
    } catch (error) {
      console.log('[fetchVideos]', error)
    }
  } 

  useEffect(() => {
    fetchVideos()
  }, [])

  return (
    <div>
      <Header />
      <div className={styles.content_container}>
        {
          loadingData ?
            <div style={{marginTop: '2rem'}}>
              <VideoRowSkeleton />
              <VideoRowSkeleton />
            </div>
            :
            <>
              <div className={styles.video_options}>
                <SearchInput />
                <Filter />
              </div>
              {
                videos.length > 0 && videos.map(videoCategory => {
                  return (
                    <VideoRow 
                      key={videoCategory.label} 
                      title={videoCategory.label} 
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