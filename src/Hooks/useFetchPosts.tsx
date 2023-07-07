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
  commentsCount: number
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

const useFetchPosts = (pageNumber: number, category: string) => {
  const [posts, setPosts] = useState<TypePost | null>(null)
  const [updatePost, setUpdatePost] = useState(false)

  const fetchPosts = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${ROUTES.POST}?page=${pageNumber}&category=${category}&sort=acs`
      )
      if (posts) {
        const postMap = new Map([
          ...(posts.docs.map((doc) => [doc._id, doc]) || []),
          ...data.docs.map((doc: { _id: any }) => [doc._id, doc]),
        ])
        const uniquePosts = Array.from(postMap.values())
        setPosts((prevPosts) => ({
          ...data,
          docs: uniquePosts,
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
  }, [updatePost, pageNumber, category])

  useEffect(() => {
    setPosts(null)
    setUpdatePost((prevUpdatePost) => !prevUpdatePost)
  }, [category])

  return { posts, setUpdatePost }
}

export default useFetchPosts
