import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'

export interface TypePost {
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
  text: string
  tags: Tag[]
  likes: any[]
  user: User
  isPublic: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Tag {
  _id: string
  es: string
  en: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface User {
  firstName: any
  lastName: any
  vulnerable: boolean
  _id: string
  uid: string
  email: string
  emailWork: any
  nationalIdType: any
  nationalId: any
  bio: any
  image: any
  invitedBy: any
  company: string
  isVolunteer: boolean
  type: string
  createdAt: string
  updatedAt: string
  __v: number
}

const useFetchPosts = (pageNumber: any) => {
  const [posts, setPosts] = useState<TypePost | null>(null)
  const [updatePost, setUpdatePost] = useState(false)

  const fetchPosts = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${ROUTES.POST}?page=${pageNumber}`
      )
      if (posts) {
        setPosts((prevPosts) => ({
          ...data,
          docs: [...(prevPosts?.docs || []), ...data.docs],
        }))
      } else {
        setPosts(data)
      }
    } catch (error) {
      console.log('error')
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [updatePost, pageNumber])

  return { posts, setUpdatePost }
}

export default useFetchPosts
