import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'

const useFetchUserPlan = () => {
  const [subscription, setSubscription] = useState<any>(null)

  const fetchUserPlan = async () => {
    try {
      const { data } = await axiosInstance.get(`${ROUTES.SUBSCRIPTION}`)
      setSubscription(data)
    } catch (error) {
      console.log('[fetchUserPlan]', error)
    }
  }

  useEffect(() => {
    fetchUserPlan()
  }, [])

  return { subscription }

}

export default useFetchUserPlan