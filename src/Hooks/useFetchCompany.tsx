import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import ROUTES from '@/helpers/routes'

const useFetchCompanyData = (id: string | string[] | undefined) => {
  const [companyData, setCompanyData] = useState<any>(null)
  const [updateCompany, setUpdateCompany] = useState(false)

  const fetchCompanyData = async (companyId: string | string[]) => {
    try {
      const { data } = await axiosInstance.get(`${ROUTES.COMPANY}/${companyId}`)
      setCompanyData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (id) {
      fetchCompanyData(id)
    }
  }, [id, updateCompany])

  // const refreshCompanyData = (id: string) => {
  //   fetchCompanyData(id)
  // }

  return { companyData, setUpdateCompany }
}

export default useFetchCompanyData
