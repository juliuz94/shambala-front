import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'

const useFetchAnnouncement = () => {
  const [announcement, setAnnouncement] = useState(null)

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
  }, [])

  const refreshData = async () => {
    fetchAnnouncement()
  }

  return { announcement, setAnnouncement, refreshData }
}

export default useFetchAnnouncement
