import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'

const useFetchCategory = () => {
  const [categories, setCategories] = useState(null)

  const fetchCategories = async () => {
    try {
      const { data } = await axiosInstance.get(`${ROUTES.CATEGORY}`)
      setCategories(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return { categories }
}

export default useFetchCategory
