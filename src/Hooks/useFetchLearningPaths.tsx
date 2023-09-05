import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'

const useFetchLearningPaths = () => {
  const [learningPaths, setLearningPaths] = useState([])

  const fetchPaths = async () => {
    try {
      const { data } = await axiosInstance.get(`${ROUTES.LEARNING_PATHS}`)
      setLearningPaths(data)
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPaths()
  }, [])

  return { learningPaths }
}

export default useFetchLearningPaths
