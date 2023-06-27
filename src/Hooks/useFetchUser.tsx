import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import { User } from '@/types'
import ROUTES from '@/helpers/routes'

const useFetchUser = (id: any) => {
  const [userGuest, setUserGuest] = useState<User | null>(null)

  const fetchUser = async () => {
    try {
      const { data } = await axiosInstance.get(`${ROUTES.USERS}/${id}`)
      setUserGuest(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [userGuest])

  return { userGuest }
}

export default useFetchUser
