import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'

const useFetchAnnouncement = () => {
  const [announcement, setAnnouncement] = useState(null)
  const [updateAnnoun, setUpdateAnnoun] = useState(false)

  const fetchAnnouncement = async () => {
    try {
      const { data } = await axiosInstance.get(`${ROUTES.ANNOUNCEMENT}`)
      setAnnouncement(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAnnouncement()
  }, [updateAnnoun])

  return {
    announcement,
    setAnnouncement,
    setUpdateAnnoun,
  }
}

export default useFetchAnnouncement
