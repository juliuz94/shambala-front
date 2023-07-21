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
        }?page=${pageNumber}&category=${category}&sort=acs&search=${''}`
      )

      if (pageNumber === 1) {
        setPosts(data)
      } else if (pageNumber > 1) {
        setPosts((prevPosts) => ({
          ...data,
          docs: prevPosts ? [...prevPosts.docs, ...data.docs] : [...data.docs],
        }))
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
