import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'

const useFetchStatistics = () => {
  const [statistics, setStatistics] = useState([])

  const fetchStatistics = async () => {
    try {
      const { data } = await axiosInstance.get(ROUTES.STATISTICS)
      setStatistics(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStatistics()
  }, [])

  return { statistics }
}

export default useFetchStatistics
