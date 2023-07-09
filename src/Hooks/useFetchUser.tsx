import { useEffect, useState } from 'react'
import { axiosInstance } from '@/axios/axiosInstance'
import { User } from '@/types'
import ROUTES from '@/helpers/routes'

const useFetchUser = (id: string | undefined) => {
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
    if (!id) return
    fetchUser()
  }, [id])

  return { userGuest, fetchUser }
}

export default useFetchUser
