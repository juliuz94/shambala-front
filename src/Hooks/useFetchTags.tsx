import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'

export interface Tag {
  docs: Doc[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: any
  nextPage: any
}

export interface Doc {
  _id: string
  es: string
  en: string
  createdAt: string
  updatedAt: string
  __v: number
}

const useFetchTags = () => {
  const [tags, setTags] = useState<Tag | null>(null)

  const fetchTags = async () => {
    try {
      const { data } = await axiosInstance.get(`${ROUTES.TAGS}`)
      setTags(data)
    } catch (error) {
      console.log('error')
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  return { tags }
}

export default useFetchTags
