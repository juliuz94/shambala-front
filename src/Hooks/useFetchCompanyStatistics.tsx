import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'

const useFetchCompanyStatistics = (id: any) => {
  const [companyStatistics, setCompanyStatistics] = useState<any>(null)

  const fetchCompanyStatistics = async () => {
    try {
      const { data } = await axiosInstance.get(`${ROUTES.COMPANY_STATISTICS}`, {
        params: { id },
      })
      setCompanyStatistics(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCompanyStatistics()
  }, [id])

  return { companyStatistics }
}

export default useFetchCompanyStatistics
