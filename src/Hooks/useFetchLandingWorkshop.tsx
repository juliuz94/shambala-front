import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'
import { LandWorkshop } from '@/types'

const useFetchLandingWorkshop = () => {
  const [landingWorkshop, setLandingWorkshop] = useState<LandWorkshop[]>([])
  const [category, setCategory] = useState('ALL')
  const [loading, setLoading] = useState(false)

  const fetchLandingWorkshop = async () => {
    setLoading(true)
    try {
      const { data } = await axiosInstance.get(
        `${ROUTES.LANDING_WORKSHOP}?sort=acs&type=${category}&month=7&page=1`
      )
      setLandingWorkshop(data.docs)
    } catch (error) {
      console.log('error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLandingWorkshop()
  }, [category])

  return { landingWorkshop, setCategory, loading }
}

export default useFetchLandingWorkshop
