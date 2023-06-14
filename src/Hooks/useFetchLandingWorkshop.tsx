import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'

const useFetchLandingWorkshop = () => {
  const [landingWorkshop, setLandingWorkshop] = useState(false)

  const fetchLandingWorkshop = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${ROUTES.LANDING_WORKSHOP}?sort=acs&type=ALL&month=6&page=1`
      )
      setLandingWorkshop(data.docs)
    } catch (error) {
      console.log('error')
    }
  }

  useEffect(() => {
    fetchLandingWorkshop()
  }, [])

  return { landingWorkshop }
}

export default useFetchLandingWorkshop
