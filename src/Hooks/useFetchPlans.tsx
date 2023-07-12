import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { Plans } from '@/types'

const useFetchPlans = () => {
  const [plans, setPlans] = useState<Plans>([])

  const fetchPlans = async () => {
    try {
      const { data } = await axiosInstance.get(`${ROUTES.PLANS}`)
      setPlans(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  return { plans }
}

export default useFetchPlans
