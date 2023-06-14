import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'

const useFetchInterested = () => {
  const [interested, setInterested] = useState(false)

  const fetchInterested = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${ROUTES.WORKSHOP}/lookForInterested`
      )
      setInterested(data.docs)
    } catch (error) {
      console.log('error')
    }
  }

  useEffect(() => {
    fetchInterested()
  }, [])

  return { interested }
}

export default useFetchInterested
