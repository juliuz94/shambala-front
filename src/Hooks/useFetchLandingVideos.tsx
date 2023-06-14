import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'

const useFetchLandingVideos = () => {
  const [landingVideos, setLandingVideos] = useState(false)

  const fetchLandingVideos = async () => {
    try {
      const { data } = await axiosInstance.get(`${ROUTES.LANDING_VIDEOS}`)
      setLandingVideos(data.docs)
    } catch (error) {
      console.log('error')
    }
  }

  useEffect(() => {
    fetchLandingVideos()
  }, [])

  return { landingVideos }
}

export default useFetchLandingVideos
