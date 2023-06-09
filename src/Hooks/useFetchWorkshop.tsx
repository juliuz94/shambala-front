import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'

export interface Workshop {
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
  title: string
  image: string
  imageGallery: ImageGallery[]
  description: string
  location: string
  isVirtual: boolean
  coordinates: any
  maxUsers: number
  subscribedUsers: string[]
  companyWhiteList: string[]
  companyBlackList: string[]
  tags: string[]
  attachments: Attachment[]
  sponsors: any[]
  type: string
  speaker?: any[]
  date: string
  agenda: Agenda[]
  createdAt: string
  updatedAt: string
  __v: number
  isLandingPage: boolean
  isPublic: boolean
  speakers: any[]
  like: any[]
}

export interface ImageGallery {
  title: string
  description: string
  link: boolean
  url: string
  size: string
  guide: boolean
  _id: string
}

export interface Attachment {
  title: string
  description: string
  link: boolean
  url: string
  size: string
  guide: boolean
  _id: string
}

export interface Agenda {
  time: string
  title: string
  place: string
  _id: string
}

const useFetchWorkshop = (id: string) => {
  const [workshop, setWorkshop] = useState<Workshop | null>(null)

  const fetchWorkshop = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${ROUTES.WORKSHOP}?whiteList=${id}&limit=100`
      )
      setWorkshop(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchWorkshop()
  }, [id])

  return { workshop }
}

export default useFetchWorkshop
