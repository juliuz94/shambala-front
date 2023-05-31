import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'

interface Props {
  id: string
}

const useFetchComments = ({ id }: any) => {
  const [comments, setComments] = useState(null)
  const [updateComments, setUpdateComments] = useState(false)

  const fetchComments = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${ROUTES.POST_COMMENT}?id=${id}`
      )
      setComments(data)
    } catch (error) {
      console.log('error')
    }
  }

  useEffect(() => {
    fetchComments()
  }, [updateComments])

  return { comments, setUpdateComments }
}

export default useFetchComments
