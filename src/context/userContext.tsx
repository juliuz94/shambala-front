import React, {
  FC,
  createContext,
  useState,
  PropsWithChildren,
  useContext,
  useEffect,
} from 'react'
import { getAuth, signOut, User } from 'firebase/auth'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'sonner'
import { AuthStoreType, User as LocalUser } from '@/types'

type UserContextType = {
  user: LocalUser | null
  userPoints: number
  fetchPoints: (userId: string) => void
  setUser: (user: LocalUser | null) => void
  handleLogin: (user: LocalUser) => void
  handleLoginModal: (user: LocalUser) => void
  logOut: (user: LocalUser | null) => void
}

const UserContext = createContext<UserContextType | null>(null)
const { Provider } = UserContext

export const UserContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const auth = getAuth()

  const userInfo = process.browser && localStorage.getItem('sha_user')
  const [user, setUser] = useState<LocalUser | null>(
    userInfo ? JSON.parse(userInfo) : null
  )
  const [userPoints, setUserPoints] = useState(0)

  const setAuthInfo = (user: LocalUser | null) => {
    localStorage.setItem('sha_user', JSON.stringify(user))
    setUser(user)
  }

  const handleLoginLog = async (user: User | null | any, token: string) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/logger/loginLog`,
      {
        userId: user._id,
        companyId: user.company?._id || ''
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } 

  const handleLogin = async (user: User | null | any) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/findSession`,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
      localStorage.setItem('sha_user_token', user.accessToken)

      setAuthInfo(data)
      fetchPoints(data._id)
      toast.success('¡Qué bueno tenerte acá!')
      handleLoginLog(data, user?.accessToken)
      router.push('/community')
    } catch (error) {
      console.log(error)
    }
  }

  const handleLoginModal = async (user: User | null | any) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/findSession`,
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
      localStorage.setItem('sha_user_token', user.accessToken)
      setAuthInfo(data)
      toast.success('¡Qué bueno tenerte acá!')
    } catch (error) {
      console.log(error)
    }
  }

  const logOut = async () => {
    await signOut(auth)
    router.push('/')
    setTimeout(() => {
      localStorage.removeItem('sha_user')
      localStorage.removeItem('sha_user_token')
      setUser(null)
    }, 1000)
  }

  const fetchPoints = async (userId: string) => {
    try {
      const token = localStorage.getItem('sha_user_token')
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/points/by-user?_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (data?.length > 0) {
        const totalPoints = data.reduce((accumulator: number, current: any) => {
          return accumulator + current.point
        }, 0)
        setUserPoints(totalPoints)
      }

    } catch (error) {
      console.log('[fetchPoints]', error)
    }
  }

  useEffect(() => {
    if (user) {
      fetchPoints(user._id)
    }
  }, [])

  return (
    <Provider
      value={{
        user: user,
        userPoints: userPoints,
        fetchPoints: (userId) => fetchPoints(userId),
        setUser: (data) => setAuthInfo(data),
        handleLogin: (user) => handleLogin(user),
        handleLoginModal: (user) => handleLoginModal(user),
        logOut: logOut,
      }}
    >
      {children}
    </Provider>
  )
}

export const useUserContext = (): any => {
  return useContext<AuthStoreType | null>(UserContext as any)
}
