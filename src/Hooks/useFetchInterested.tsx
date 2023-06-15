import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'

export interface Interested {
  _id: string
  user: string
  video: string
  createdAt: string
  updatedAt: string
  __v: number
}

const useFetchInterested = (id: any) => {
  const [interested, setInterested] = useState<Interested | null>(null)

  const fetchInterested = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${ROUTES.WORKSHOP}/checkUserInterestPerVideo?video=${id}`
      )
      setInterested(data)
    } catch (error) {
      console.log('error')
    }
  }

  useEffect(() => {
    fetchInterested()
  }, [id])

  return { interested }
}

export default useFetchInterested
