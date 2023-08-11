import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { defaultCategories } from '@/constants/posts'
import { TypePost } from '@/types'

type ReturnTypeOfUseFetchPosts = {
  posts: TypePost | null
  setUpdatePost: Dispatch<SetStateAction<boolean>>
}

type UseFetchPostsHook = (
  pageNumber: number,
  category: string,
  searchString: string,
  setPageNumber: Dispatch<SetStateAction<number>>,
  tagId: string
) => ReturnTypeOfUseFetchPosts

const useFetchPosts: UseFetchPostsHook = (
  pageNumber,
  category,
  searchString,
  setPageNumber,
  tagId
) => {
  const [posts, setPosts] = useState<TypePost | null>(null)
  const [updatePost, setUpdatePost] = useState(false)

  const fetchPosts = async () => {
    let paramsString
    if (defaultCategories.includes(category)) {
      paramsString = `?page=${pageNumber}&category=${category}&sort=acs&search=${searchString}&tag=${tagId}`
    } else {
      paramsString = `?page=${pageNumber}&category=NULL&community=${category}&sort=acs&search=${searchString}&tag=${tagId}`
    }

    try {
      const { data } = await axiosInstance.get(`${ROUTES.POST}${paramsString}`)

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
  }, [updatePost, pageNumber, category, searchString, tagId])

  useEffect(() => {
    setPosts(null)
    setUpdatePost((prevUpdatePost) => !prevUpdatePost)
    setPageNumber(1)
  }, [category])

  return { posts, setUpdatePost }
}

export default useFetchPosts
