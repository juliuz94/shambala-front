import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { TypePost } from '@/types'

type ReturnTypeOfUseFetchPosts = {
  posts: TypePost | null
  setUpdatePost: Dispatch<SetStateAction<boolean>>
}

type UseFetchPostsHook = (
  pageNumber: number,
  category: string,
  setPageNumber: Dispatch<SetStateAction<number>>
) => ReturnTypeOfUseFetchPosts

const useFetchPosts: UseFetchPostsHook = (
  pageNumber,
  category,
  setPageNumber
) => {
  const [posts, setPosts] = useState<TypePost | null>(null)
  const [updatePost, setUpdatePost] = useState(false)

  const fetchPosts = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${
          ROUTES.POST
        }?page=${pageNumber}&category=${category}&sort=asc&search=${''}`
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
    setPageNumber(1)
  }, [category])

  return { posts, setUpdatePost }
}

export default useFetchPosts
