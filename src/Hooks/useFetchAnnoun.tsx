import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'

export interface Announ {
  _id: string
  title: string
  content: string
  createdBy: string
  image: string
  company: string
  likes: any[]
  comments: any[]
  createdAt: string
  updatedAt: string
  __v: number
}

const useFetchAnnoun = (id: any) => {
  const [announ, setAnnoun] = useState<Announ | null>(null)

  const fetchAnnoun = async () => {
    try {
      const { data } = await axiosInstance.get(`${ROUTES.ANNOUNCEMENT}/${id}`)
      setAnnoun(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAnnoun()
  }, [])

  return {
    announ,
    setAnnoun,
  }
}

export default useFetchAnnoun
